// Client Component del dominio User.
// 'use client' es obligatorio para usar hooks de estado y TanStack Query.

'use client';

import { useUsers, useCreateUser } from './users.queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, type CreateUserInput } from './users.schema';
import { Button } from '@/components/Button';
import { formatDate } from '@/utils/formatDate';

export function UserList() {
  const { data: users, isLoading, isError } = useUsers();
  const { mutate: createUser, isPending } = useCreateUser();

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = (values: CreateUserInput) => {
    createUser(values, { onSuccess: () => reset() });
  };

  if (isLoading) return <p className="p-4">Cargando...</p>;
  if (isError)   return <p className="p-4 text-red-500">Error al cargar usuarios.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-2">
        <input
          {...register('name')}
          placeholder="Nombre"
          className="border rounded px-3 py-2"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

        <input
          {...register('email')}
          placeholder="Email"
          className="border rounded px-3 py-2"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creando...' : 'Crear usuario'}
        </Button>
      </form>

      <ul className="flex flex-col gap-2">
        {users?.map((u) => (
          <li key={u.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs text-gray-400">{formatDate(u.createdAt)}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              u.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {u.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}