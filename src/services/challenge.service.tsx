import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
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

  try {
    const response = await axios.post(`/api/challenges/${challenge.id}`, formData, config);
    return response;
  } catch (error) {
    console.warn('Upload failed, saving to IndexedDB for retry later');

    // Extract multiple files and additional fields
    const filesArray: { fileName: string; fileType: string; fileData: ArrayBuffer }[] = [];
    const additionalData: { [key: string]: string } = {};

    const files = formData.getAll('files') as File[];
    for (const file of files) {
      const fileData = await file.arrayBuffer();
      filesArray.push({ fileName: file.name, fileType: file.type, fileData });
    }

    formData.forEach((value, key) => {
      if (key !== 'files') additionalData[key] = value as string;
    });

    await db.uploads.add({
      challengeId: challenge.id,
      files: filesArray,
      additionalData
    });

    // Check if sync is supported

    const registration = await navigator.serviceWorker.ready;

    if ('sync' in registration) {
      registration.sync.register('sync-uploads');
    } else {
      console.info('No background uploading detected')
    }

    throw error;
  }
};
