"use client";

import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import app from "@/lib/firebase/clientApps";
import { useRouter } from "next/navigation";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
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
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-start pt-16 px-8 sm:px-16 md:px-24 py-12">
        <div className="flex items-center gap-4 mb-10">
          <img
            src="/img/logo_desa.png"
            alt="Logo Desa Jatiguwi"
            className="h-16"
          />
          <div>
            <p className="text-2xl font-bold text-[#0E4D45]">Desa Jatiguwi</p>
            <p className="text-lg font-semibold text-gray-600">
              Kecamatan Sumberpucung
            </p>
          </div>
        </div>
        {/* Welcome Text */}
        <div className="mb-8 mt-8">
          <h2 className="text-3xl font-bold text-[#0E4D45] mb-2">
            Selamat Datang Kembali
          </h2>
          <p className="text-gray-600 text-xl">
            Masukkan username dan password
          </p>
        </div>

        {user ? (
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">
              Selamat datang,{" "}
              <span className="font-semibold">{user.email}</span>!
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Keluar
            </button>
          </div>
        ) : (
          <form className="flex flex-col space-y-4 mt-8">
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md border border-red-200">
                {error}
              </p>
            )}
            <div>
              <label className="block text-lg font-medium text-[#0E4D45] mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username di sini"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#0E4D45] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password di sini"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                required
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#0E4D45] hover:underline">
                Lupa Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0E4D45] text-white font-semibold py-3 rounded-lg hover:bg-[#0A3B35] transition-colors"
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
      <div className="hidden lg:flex w-1/2 items-center justify-center p-16">
        <div className="w-[640px] h-full bg-gray-300 rounded-bl-3xl rounded-tr-3xl"></div>
      </div>
    </div>
  );
};

export default AuthComponent;
