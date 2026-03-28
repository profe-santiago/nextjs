// Singleton de PrismaClient para Next.js.
// En desarrollo, Next.js recarga módulos en hot-reload. Sin el singleton,
// cada recarga crearía una nueva conexión a la BD hasta agotar el pool.
// La variable global persiste entre recargas en desarrollo.

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const createPrismaClient = () => {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}