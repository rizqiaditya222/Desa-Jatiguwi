'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '@/lib/firebase/clientApps';

const sidebarItems = [
  { name: 'Semua Penduduk', href: '/dashboard/all' },
  { name: 'Profile', href: '/dashboard/profile' },
  { name: 'Berita', href: '/dashboard/berita' },
  { name: 'Pengumuman', href: '/dashboard/pengumuman' },
  { name: 'Galeri', href: '/dashboard/galeri' },
  { name: 'Selayang Pandang', href: '/dashboard/selayang-pandang' },
];

export default function PendudukLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = getAuth(app);

  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state untuk hamburger

  // Tutup sidebar saat route berubah (agar auto-close setelah klik menu di mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Proteksi auth: redirect ke "/" jika belum login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace('/');
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleSignOut = async () => {
    setError(null);
    try {
      await signOut(auth);
      router.replace('/');
    } catch (err: any) {
      console.error('Error signing out:', err);
      setError('Gagal keluar: ' + err.message);
    }
  };

  // Toggle sidebar (dipisah agar bisa dipakai di onClick & onKeyDown)
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay gelap saat sidebar terbuka di mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/25 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: off-canvas di mobile, fixed; normal (static) di md+ */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#FAFAFA] text-white flex flex-col h-screen
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
        aria-hidden={!isSidebarOpen && typeof window !== 'undefined' && window.innerWidth < 768}
      >
        <Link href="/" className="flex p-4 items-center hover:bg-gray-200">
          <div className="w-20">
            <img src="/img/logo_desa.png" alt="Logo Desa" />
          </div>
          <div>
            <p className="text-[#0E4D45] text-xs font-bold">Desa Jatiguwi</p>
            <p className="text-[#0E4D45] text-xs">Kecamatan Sumberpucung</p>
          </div>
        </Link>

        <nav className="flex flex-col p-4 gap-2 flex-grow">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-2 px-4 text-[#0E4D45] font-medium ${
                pathname === item.href ? 'bg-[#0E4D45] rounded text-white' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Topbar untuk mobile: tampilkan hamburger */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white border-b md:hidden">
        <div className="flex items-center gap-2 p-4">
          <button
            onClick={toggleSidebar}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleSidebar();
            }}
            aria-label="Buka menu"
            aria-controls="sidebar"
            aria-expanded={isSidebarOpen}
            className="p-2 rounded focus:outline-none focus:ring"
          >
            {/* Ikon hamburger sederhana (tanpa lib tambahan) */}
            <div className="w-6 h-0.5 bg-black mb-1" />
            <div className="w-6 h-0.5 bg-black mb-1" />
            <div className="w-6 h-0.5 bg-black" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <img src="/img/logo_desa.png" alt="Logo Desa" className="w-8 h-8" />
            <span className="text-sm font-semibold text-[#0E4D45]">Desa Jatiguwi</span>
          </Link>
        </div>
        {/* Ruang kanan bila ingin tambahkan aksi lain */}
        <div className="p-4" />
      </header>

      {/* Main content:
          - Beri top padding di mobile untuk ruang topbar
          - Offset dengan ml-64 hanya di md+ */}
      <main className="flex-1 p-6 pt-16 md:pt-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}