'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Toaster position="top-center" />
      {children}
    </div>
  );
}
