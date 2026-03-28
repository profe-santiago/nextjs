// Schemas Zod del dominio User.
// Compartido entre Route Handlers (validación del body) y formularios React
// (resolver de React Hook Form). Una sola fuente de verdad para las reglas.

import { z } from 'zod';

export const createUserSchema = z.object({
  name:  z.string().min(1, 'El nombre es requerido').max(100),
  email: z.string().email('Formato de email inválido'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;