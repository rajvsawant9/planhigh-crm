import api from "@/lib/axios";
import { Property } from "@/lib/types";

export const propertyService = {
  getProperties: async (filters?: any) => {
    const response = await api.get<Property[]>("/properties", {
      params: filters,
    });
    return response.data;
  },

  getProperty: async (id: string) => {
    const response = await api.get<Property>(`/properties/${id}`);
    return response.data;
  },

  createProperty: async (data: Omit<Property, "id" | "createdAt">) => {
    const response = await api.post<Property>("/properties", data);
    return response.data;
  },
};
