'use client'

import React, { useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User, 
} from 'firebase/auth';
import app from '@/lib/firebase/clientApps';
import { useRouter } from 'next/navigation';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null); 
  const [error, setError] = useState<string | null>(null); // State untuk pesan error
  const [loading, setLoading] = useState(true); // State untuk indikator loading

  const auth = getAuth(app);
  const router = useRouter(); // Inisialisasi router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]); // Dependensi auth agar listener diperbarui jika instance auth berubah

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-[#0E4D45]">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#0E4D45] mb-6 text-center">
          Masuk
        </h2>

        {user ? (
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">
              Selamat datang, <span className="font-semibold">{user.email}</span>!
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Keluar
            </button>
          </div>
        ) : (
          <form className="flex flex-col space-y-4">
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md border border-red-200">
                {error}
              </p>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
            />
            <button
              type="submit"
              onClick={handleSignIn}
              className="bg-[#0E4D45] hover:bg-[#0A3B35] text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Masuk
            </button>
            {/* <button
              type="submit"
              onClick={handleSignUp}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Daftar
            </button> */}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;