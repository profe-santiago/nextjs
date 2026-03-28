// Funciones HTTP del dominio User para el frontend.
// Solo esta capa conoce Axios — los componentes nunca lo importan directamente.

import { api } from '@/lib/axios';
import type { User, CreateUserPayload } from './users.types';

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await api.post<User>('/users', payload);
    return data;
  },

  deactivate: async (id: number): Promise<User> => {
    const { data } = await api.post<User>(`/users/${id}/deactivate`);
    return data;
  },
};