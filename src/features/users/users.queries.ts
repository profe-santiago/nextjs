// Hooks TanStack Query del dominio User.
// Envuelven usersApi con caché, estados de carga y sincronización automática.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from './users.api';
import type { CreateUserPayload } from './users.types';

export const userKeys = {
  all:    ['users']               as const,
  detail: (id: number) => ['users', id] as const,
};

export const useUsers = () =>
  useQuery({ queryKey: userKeys.all, queryFn: usersApi.getAll });

export const useUser = (id: number) =>
  useQuery({ queryKey: userKeys.detail(id), queryFn: () => usersApi.getById(id) });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => usersApi.create(payload),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usersApi.deactivate(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};