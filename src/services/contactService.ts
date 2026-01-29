import api from "@/lib/axios";
import { Contact } from "@/lib/types";

export const contactService = {
  getContacts: async () => {
    const response = await api.get<Contact[]>("/contacts");
    return response.data;
  },

  createContact: async (data: Omit<Contact, "id" | "createdAt">) => {
    const response = await api.post<Contact>("/contacts", data);
    return response.data;
  },
};
