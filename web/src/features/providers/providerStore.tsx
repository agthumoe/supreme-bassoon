import { create } from "zustand";
import api from "../../app/api";
import { ProviderDto, ProviderState } from "./types";
import filter from "lodash/filter";

const useProviderStore = create<ProviderState>((set, get) => {
  return {
    data: [],
    create: async (dto: Omit<ProviderDto, "id">) => {
      const response = await api.post('/providers', dto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        const data = [...get().data, response.data as ProviderDto];
        set({ data });
      }
      return response.data as ProviderDto;
    },
    find: async (filter?: string) => {
      let url = '/providers';
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response);
      const data = response.data.data as ProviderDto[];
      set({ data });
      return data;
    },
    delete: async (id: number) => {
      await api.delete(`/providers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      set({ data: filter(get().data, { id }) })
    }
  }
});

export default useProviderStore;