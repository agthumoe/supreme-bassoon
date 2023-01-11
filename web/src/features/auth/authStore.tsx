import { create } from "zustand";
import api from "../../app/api";
import { AuthData, AuthState, LoginDto } from "./types";

const useAuthStore = create<AuthState>((set) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    data: accessToken && refreshToken ? { accessToken, refreshToken } : {},
    login: async (dto: LoginDto) => {
      const response = await api.post('/auth/login', dto);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      set({ data: response.data });
      return response.data as AuthData;
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ data: {} });
    }
  }
});

export default useAuthStore;