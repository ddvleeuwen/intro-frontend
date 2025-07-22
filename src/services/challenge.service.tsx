import axios, { AxiosRequestConfig } from "axios";
import { Challenge } from "../model/challenge.tsx";
import { db } from "../utils/DexieDB.ts";

export const getChallenges = () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  return axios.get<Challenge[]>("/api/challenges", config);
}

export const uploadChallenge = async (
    challenge: Challenge,
    formData: FormData,
    setUploadPercentage: (percentage: number) => void
) => {
  const config: AxiosRequestConfig = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  const chunkSize = 1024 * 1024; // 1MB
  

  const result = await axios.post<string>(`/api/challenges/${challenge.id}/attempt`,
    Object.fromEntries((formData.getAll("files") as File[]).map((file: File) => [ file.name, Math.ceil(file.size / chunkSize) ]))
  , { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

  const attemptId = result.data

  await uploadFilesInChunks(
      formData,
      challenge.id,
      attemptId,
      config,
      setUploadPercentage
  )
};

async function uploadFilesInChunks(formData: FormData, challengeId: number, attemptId: string, config: AxiosRequestConfig, setUploadPercentage: (percentage: number) => void) {
  const uploads: Promise<void>[] = []
  const files = formData.getAll('files') as File[];  // Get all files from the 'files' input

  // Bereken totaal aantal chunks
  const chunkSize = 1024 * 1024; // 1MB
  const totalChunks = files.reduce((total, file) => {
    return total + Math.ceil(file.size / chunkSize);
  }, 0);

  let completedChunks = 0;

  if (files.length > 0) {
    files.forEach(file => {
      const fileName = file.name;
      const fileType = file.type
      const chunkSize = 1024 * 1024; // 1MB
      const amountOfChunks = Math.ceil(file.size / chunkSize);

      let start = 0;
      let end = chunkSize;

      for (let chunkIndex = 0; chunkIndex < amountOfChunks; chunkIndex++) {
        const chunk = file.slice(start, end);
        const upload = uploadChunk(challengeId, attemptId, config, chunk, fileName, fileType, chunkIndex)
            .then(() => {
              completedChunks++;
              const percentage = Math.round((completedChunks / totalChunks) * 100);
              setUploadPercentage(percentage);
            });
        uploads.push(upload);

        start = end;
        end = Math.min(start + chunkSize, file.size);
      }
    });
  } else {
    console.error('No files found in FormData');
  }
  await Promise.all(uploads)
}

async function uploadChunk(challengeId: number, attemptId: string, config: AxiosRequestConfig, chunk: Blob, fileName: string, fileType: string, chunkIndex: number) {
  const chunkFormData = new FormData();
  chunkFormData.append('chunk', chunk);
  chunkFormData.append('fileName', fileName);  // Send the file name for reference
  chunkFormData.append('fileType', fileType);  // Send the file name for reference
  chunkFormData.append('chunkIndex', String(chunkIndex));

  try {
    const response = await axios.post(`/api/challenges/${challengeId}/attempt/${attemptId}`, chunkFormData, config)
    return response

  } catch (err) {
    console.warn('Upload failed, saving to IndexedDB for retry later');


    await db.uploads.add({
      challengeId,
      attemptId,
      chunkIndex: String(chunkIndex),
      fileName,
      fileType,
      data: await chunk.arrayBuffer(),
    });

    // Check if sync is supported
    const registration = await navigator.serviceWorker.ready;

    if ('sync' in registration) {
      // https://developer.mozilla.org/en-US/docs/Web/API/SyncManager
      const syncManager = registration.sync as { register: (tag: string) => Promise<undefined> };
      await syncManager.register('sync-uploads');
      return;
    } else {
      console.info('No background uploading detected')
      throw err;
    }
  }
}


