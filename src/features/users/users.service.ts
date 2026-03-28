// Servicio: lógica de negocio del dominio User.
// Orquesta el repositorio y lanza errores que los Route Handlers convierten en HTTP.

import { userRepository } from './users.repository';
import { CreateUserInput } from './users.schema';
import { User } from '@prisma/client';

export class ServiceError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

export const userService = {
  getAll: (): Promise<User[]> =>
    userRepository.findAll(),

  getById: async (id: number): Promise<User> => {
    const user = await userRepository.findById(id);
    if (!user) throw new ServiceError('Usuario no encontrado', 404);
    return user;
  },

  create: async (data: CreateUserInput): Promise<User> => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new ServiceError('El email ya está registrado', 400);
    return userRepository.create(data);
  },

  deactivate: async (id: number): Promise<User> => {
    const user = await userRepository.findById(id);
    if (!user) throw new ServiceError('Usuario no encontrado', 404);
    return userRepository.deactivate(id);
  },
};