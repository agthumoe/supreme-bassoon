import { create } from "zustand";
import api from "../../app/api";
import { CustomerDto, CustomerState } from "./types";
import filter from "lodash/filter";

const useCustomerStore = create<CustomerState>((set, get) => {
  return {
    data: [],
    create: async (dto: Omit<CustomerDto, "id">) => {
      const response = await api.post('/customers', dto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        const data = [...get().data, response.data as CustomerDto];
        set({ data });
      }
      return response.data as CustomerDto;
    },
    find: async (filter?: string) => {
      let url = '/customers';
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response);
      const data = response.data.data as CustomerDto[];
      set({ data });
      return data;
    },
    delete: async (id: number) => {
      await api.delete(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      set({ data: filter(get().data, { id }) })
    }
  }
});

export default useCustomerStore;