// Repositorio: única capa que accede a Prisma directamente.
// El servicio nunca importa prisma — solo llama métodos de este módulo.

import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { CreateUserInput } from './users.schema';

export const userRepository = {
  findAll: (): Promise<User[]> =>
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),

  findById: (id: number): Promise<User | null> =>
    prisma.user.findUnique({ where: { id } }),

  findByEmail: (email: string): Promise<User | null> =>
    prisma.user.findUnique({ where: { email } }),

  create: (data: CreateUserInput): Promise<User> =>
    prisma.user.create({ data }),

  deactivate: (id: number): Promise<User> =>
    prisma.user.update({
      where: { id },
      data:  { isActive: false },
    }),
};