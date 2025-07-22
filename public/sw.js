importScripts('https://cdnjs.cloudflare.com/ajax/libs/dexie/4.0.10/dexie.min.js');

class SWDB extends Dexie {
    constructor() {
        super('UploadDB');
        this.version(1).stores({
            uploads: '++id, challengeId, attemptId, chunkIndex',
            token: 'id, token'
        });

        this.uploads = this.table('uploads');
        this.token = this.table('token');
    }

    async saveToken(token) {
        await this.token.put({ id: 1, token });
    }

    async getToken() {
        const tokenRecord = await this.token.get(1);
        return tokenRecord ? tokenRecord.token : null;
    }
}

const db = new SWDB();

self.addEventListener('message', (event) => {
    if (event.data.type === 'SET_TOKEN') {
        db.saveToken(event.data.token)
        // const token = event.data.token;
        // // Now you can store the token in the service worker's context or use it
        // // Example: Store it in a variable or send it with network requests
        // self.token = token;
    }
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-uploads') {
        event.waitUntil(retryFailedUploads());
    }
});

// Retry failed uploads using Dexie.js
async function retryFailedUploads() {
    try {
        const authToken = await db.getToken()
        // const db = new UploadDatabase();  // Instantiate your Dexie database class

        // Fetch all failed uploads from the Dexie DB
        const uploads = await db.uploads.toArray();

        for (const chunk of uploads) {
            try {
                // Recreate FormData voor deze chunk
                const formData = new FormData();
                const blob = new Blob([ chunk.data ], { type: chunk.fileType });

                formData.append('chunk', blob);
                formData.append('fileName', chunk.fileName);
                formData.append('fileType', chunk.fileType);
                formData.append('chunkIndex', chunk.chunkIndex);

                // Upload chunk
                const response = await fetch(`/api/challenges/${chunk.challengeId}/attempt/${chunk.attemptId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                    body: formData
                });

                if (response.ok) {
                    console.log('Upload successful, removing from IndexedDB');
                    await db.uploads.delete(chunk.id);  // Delete the entry from Dexie DB after successful upload
                } else if (response.status === 423) { // currently in review or completed. aka upload no longer needed
                    console.log('resource is locked, removing from IndexedDB');
                    await db.uploads.delete(chunk.id);  // Delete the entry from Dexie DB after successful upload
                } else {
                    console.error(`Upload failed for challenge ${chunk.challengeId}`);
                    await db.uploads.delete(chunk.id);
                }
            } catch (err) {
                console.error('Upload retry failed, will retry later', err);
            }
        }
    } catch (error) {
        console.error('Failed to retrieve uploads from IndexedDB', error);
    }
}
