import axios from "axios";
import { AuthResponse } from "../model/auth.tsx";

export const login = (loginCode: string) => {
  return axios.post<AuthResponse>("/api/authenticate", { username: loginCode, password: loginCode }).then((response) => {
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("role", response.data.role);
    window.dispatchEvent(new Event('storage'));
  });
}
