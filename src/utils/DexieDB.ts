import Dexie from 'dexie';

interface UploadEntry {
    id?: number;
    challengeId: string;
    files: { fileName: string; fileType: string; fileData: ArrayBuffer }[]; // Store multiple files
    additionalData: { [key: string]: string }; // Store other FormData fields
}

class UploadDatabase extends Dexie {
    uploads: Dexie.Table<UploadEntry, number>;

    constructor() {
        super('UploadDB');
        this.version(1).stores({
            uploads: '++id, challengeId'
        });

        this.uploads = this.table('uploads');
    }
}

export const db = new UploadDatabase();
