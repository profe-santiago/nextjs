'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Mi App</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/users"   className="hover:underline">Usuarios</Link>
          <Link href="/docs"    className="hover:underline">API Docs</Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4">
        DSD-2303 · Instituto Tecnológico de Oaxaca
      </footer>
    </div>
  );
}