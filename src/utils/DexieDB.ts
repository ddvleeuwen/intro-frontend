import Dexie from 'dexie';

interface UploadEntry {
    id?: number;
    challengeId: number;
    attemptId: string;
    chunkIndex: string;
    fileName: string;
    fileType: string;
    data: ArrayBuffer;
}

class UploadDatabase extends Dexie {
    uploads: Dexie.Table<UploadEntry, number>;

    constructor() {
        super('UploadDB');
        this.version(1).stores({
            uploads: '++id, challengeId, attemptId, chunkIndex',
        });

        this.uploads = this.table('uploads');
    }
}

export const db = new UploadDatabase();
