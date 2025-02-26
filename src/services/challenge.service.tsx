import axios, { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from "axios";
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
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      setUploadPercentage(Math.round((progressEvent.loaded / (progressEvent.total ?? 1) * 100)));
    }
  };

  const chunkSize = 1024 * 1024; // 1MB
  

  const result = await axios.post(`/api/challenges/${challenge.id}/attempt`,
    Object.fromEntries((formData.getAll("files") as File[]).map((file: File) => [ file.name, Math.ceil(file.size / chunkSize) ]))
  , { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

  const attemptId = result.data
  console.log(result.data);

  uploadFilesInChunks(formData, (temp) => axios.post(`/api/challenges/${challenge.id}/attempt/${attemptId}`, temp, config))

  // try {
  //   const response = await axios.post(`/api/challenges/${challenge.id}`, formData, config);
  //   return response;
  // } catch (error) {
  //   console.warn('Upload failed, saving to IndexedDB for retry later');
  //
  //   // Extract multiple files and additional fields
  //   const filesArray: { fileName: string; fileType: string; fileData: ArrayBuffer }[] = [];
  //   const additionalData: { [key: string]: string } = {};
  //
  //   const files = formData.getAll('files') as File[];
  //   for (const file of files) {
  //     const fileData = await file.arrayBuffer();
  //     filesArray.push({ fileName: file.name, fileType: file.type, fileData });
  //   }
  //
  //   formData.forEach((value, key) => {
  //     if (key !== 'files') additionalData[key] = value as string;
  //   });
  //
  //   await db.uploads.add({
  //     challengeId: challenge.id,
  //     files: filesArray,
  //     additionalData
  //   });
  //
  //   // Check if sync is supported
  //
  //   const registration = await navigator.serviceWorker.ready;
  //
  //   if ('sync' in registration) {
  //     registration.sync.register('sync-uploads');
  //   } else {
  //     console.info('No background uploading detected')
  //   }
  //
  //   throw error;
  // }
};

function uploadFilesInChunks(formData: FormData, uploadMethod: (data: FormData) => Promise<AxiosResponse<any, any>>) {
  const files = formData.getAll('files') as File[];  // Get all files from the 'files' input

  if (files.length > 0) {
    files.forEach(file => {
      const fileName = file.name;
      const fileType = file.type
      const chunkSize = 1024 * 1024; // 1MB
      const totalChunks = Math.ceil(file.size / chunkSize);

      let start = 0;
      let end = chunkSize;

      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const chunk = file.slice(start, end);
        uploadChunk(chunk, fileName, fileType, chunkIndex, uploadMethod);

        start = end;
        end = Math.min(start + chunkSize, file.size);
      }
    });
  } else {
    console.error('No files found in FormData');
  }
}

async function uploadChunk(chunk: Blob, fileName: string, fileType: string, chunkIndex: number, uploadMethod: (data: FormData) => Promise<AxiosResponse<any, any>>) {
  const chunkFormData = new FormData();
  chunkFormData.append('chunk', chunk);
  chunkFormData.append('fileName', fileName);  // Send the file name for reference
  chunkFormData.append('fileType', fileType);  // Send the file name for reference
  chunkFormData.append('chunkIndex', String(chunkIndex));

  try {
    const response = await uploadMethod(chunkFormData)
    return response

  } catch (err) {
    console.error(err)
  }
  // uploadMethod(chunkFormData)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Chunk upload failed');
  //       }
  //       console.log(`Chunk ${chunkIndex + 1} of ${totalChunks} for ${fileName} uploaded successfully.`);
  //     })
  //     .catch(error => {
  //       console.error('Error uploading chunk:', error);
  //     });
}


