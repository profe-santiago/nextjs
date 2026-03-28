// Layout raíz de Next.js.
// Registra los proveedores globales: QueryClientProvider para TanStack Query.
// 'use client' no aplica aquí — Next.js permite Providers en Server Components
// envolviendo componentes con la directiva 'use client' en un archivo separado.

import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: process.env.APP_NAME ?? 'Next.js App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}