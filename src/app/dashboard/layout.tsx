// app/penduduk/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase Auth functions
import app from '@/lib/firebase/clientApps'; // Import your Firebase app instance

const sidebarItems = [
  { name: 'Semua Penduduk', href: '/penduduk/all' },
];

export default function PendudukLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const auth = getAuth(app); // Get Firebase Auth instance

  // State for handling potential sign-out errors
  const [error, setError] = useState<string | null>(null);

  // Authentication check: Redirect if user is not logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If user does NOT exist, redirect to the root path (/)
        router.replace('/');
      }
    });

    return () => unsubscribe();
  }, [auth, router]); // Dependencies for useEffect

  const handleSignOut = async () => {
    setError(null); // Clear any previous errors
    try {
      await signOut(auth);
      router.replace('/'); // Redirect to the root path after successful sign out
    } catch (err: any) {
      console.error("Error signing out:", err); // Log the actual error for debugging
      setError("Gagal keluar: " + err.message); // Set error message for display
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#FAFAFA] text-white flex flex-col"> {/* Added flex-col */}
        <Link href="/" className="flex p-4 items-center hover:bg-gray-200">
          <div className="w-20">
            <img src="/img/logo_desa.png" alt="Logo Desa" />
          </div>
          <div>
            <p className="text-[#0E4D45] text-xs font-bold">Desa Jatiguwi</p>
            <p className="text-[#0E4D45] text-xs">Kecamatan Sumberpucung</p>
          </div>
        </Link>

        <nav className="flex flex-col p-4 gap-2 flex-grow"> {/* Added flex-grow */}
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-2 px-4 bg-[#0E4D45] rounded hover:bg-[#145C53] ${pathname === item.href ? 'bg-[#145C53]' : ''
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sign Out Button - Placed at the bottom of the sidebar */}
        <div className="p-4 mt-auto"> {/* Use mt-auto to push to the bottom */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Display sign-out error */}
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}