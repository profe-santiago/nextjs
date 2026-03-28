// Proveedores globales del cliente.
// Se separa de layout.tsx para mantener layout.tsx como Server Component.

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // useState garantiza que cada instancia del servidor tenga su propio QueryClient
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}