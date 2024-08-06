import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { Picture } from "../model/picture.tsx";

export const getPictures = () => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }

    return axios.get<Picture[]>("/api/pictures", config);
}

export const getPictureUrl = (pictureId: number, thumbnail: boolean = false) => {
    return `/api/pictures/${pictureId}/${thumbnail ? 'thumbnail' : 'file'}`
}

export const getPictureSubmissionBlob = (pictureId: number) => {
    return axios.get<Blob>(`/api/pictures/${pictureId}/submission`, {
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export const uploadPicture = (picture: Picture, formData: FormData, setUploadPercentage: (percentage: number) => void) => {
    const config: AxiosRequestConfig = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            setUploadPercentage(Math.round((progressEvent.loaded / (progressEvent.total ?? 1) * 100)))
        }
    }

    return axios.post(`/api/pictures/${picture.id}`, formData, config);
}