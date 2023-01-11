import { create } from "zustand";
import api from "../../app/api";
import { PasswordDto, UserDto, UserState } from "./types";
import filter from "lodash/filter";

const useUserStore = create<UserState>((set, get) => {
  return {
    data: [],
    create: async (dto: Omit<UserDto, "id"> & PasswordDto) => {
      const response = await api.post('/users', dto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        const data = [...get().data, response.data as UserDto];
        set({ data });
      }
      return response.data as UserDto;
    },
    find: async (filter?: string) => {
      let url = '/users';
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response);
      const data = response.data.data as UserDto[];
      set({ data });
      return data;
    },
    delete: async (id: number) => {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      set({ data: filter(get().data, { id }) })
    }
  }
});

export default useUserStore;