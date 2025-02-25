importScripts('https://cdnjs.cloudflare.com/ajax/libs/dexie/4.0.10/dexie.min.js');

class SWDB extends Dexie {
    constructor() {
        super('UploadDB');
        this.version(1).stores({
            uploads: '++id, challengeId',
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

        for (const entry of uploads) {
            const formData = new FormData();

            // Convert ArrayBuffer back to Blob and append each file
            for (const file of entry.files) {
                const blob = new Blob([file.fileData], { type: file.fileType });
                formData.append('files', blob, file.fileName);
            }

            // Append other form fields to FormData
            for (const [key, value] of Object.entries(entry.additionalData)) {
                formData.append(key, value);
            }

            try {
                // Attempt to upload the files again
                const response = await fetch(`/api/challenges/${entry.challengeId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                    body: formData
                });

                if (response.ok) {
                    console.log('Upload successful, removing from IndexedDB');
                    await db.uploads.delete(entry.id);  // Delete the entry from Dexie DB after successful upload
                } else if (response.status === 423) { // currently in review or completed. aka upload no longer needed
                    console.log('resource is locked, removing from IndexedDB');
                    await db.uploads.delete(entry.id);  // Delete the entry from Dexie DB after successful upload
                } else {
                    console.error(`Upload failed for challenge ${entry.challengeId}`);
                }
            } catch (err) {
                console.error('Upload retry failed, will retry later', err);
            }
        }
    } catch (error) {
        console.error('Failed to retrieve uploads from IndexedDB', error);
    }
}
