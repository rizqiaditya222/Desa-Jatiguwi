// app/penduduk/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const sidebarItems = [
  { name: 'Semua Penduduk', href: '/penduduk/all' },
];

export default function PendudukLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#0E4D45] text-white">
        <div className="p-6 font-bold text-xl border-b border-[#145C53]">Dashboard</div>
        <nav className="flex flex-col p-4 gap-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-2 px-4 rounded hover:bg-[#145C53] ${
                pathname === item.href ? 'bg-[#145C53]' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
