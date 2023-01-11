import { create } from "zustand";
import api from "../../app/api";
import { CreateMailDto, MailDto, MailState } from "./types";

const useMailStore = create<MailState>((set, get) => {
  return {
    data: [],
    create: async (dto: CreateMailDto) => {
      const response = await api.post('/mails', dto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        const data = [...get().data, response.data as MailDto];
        set({ data });
      }
      return response.data as MailDto;
    },
    find: async (filter?: string) => {
      let url = '/mails';
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response);
      const data = response.data.data as MailDto[];
      set({ data });
      return data;
    }
  }
});

export default useMailStore;