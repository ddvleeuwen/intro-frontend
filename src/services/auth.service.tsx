import axios from "axios";
import { AuthResponse } from "../model/auth.tsx";

export const login = (loginCode: string) => {
  return axios.post<AuthResponse>("/api/authenticate", { username: loginCode, password: loginCode }).then((response) => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SET_TOKEN', token: response.data.accessToken });
    }
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("role", response.data.role);
    window.dispatchEvent(new Event('storage'));
  });
}
