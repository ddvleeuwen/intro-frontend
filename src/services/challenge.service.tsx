import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { Challenge } from "../model/challenge.tsx";

export const getChallenges = () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  return axios.get<Challenge[]>("/api/challenges", config);
}

export const uploadChallenge = (challenge: Challenge, formData: FormData, setUploadPercentage: (percentage: number) => void) => {
  const config: AxiosRequestConfig = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      setUploadPercentage(Math.round((progressEvent.loaded / (progressEvent.total ?? 1) * 100)))
    }
  }

  return axios.post(`/api/challenges/${challenge.id}`, formData, config);
}
