"use client";

export const dynamic = 'force-dynamic';
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard/all");
    } catch (err: any) {
      const message =
        err.code === "auth/user-not-found"
          ? "Pengguna tidak ditemukan."
          : err.code === "auth/wrong-password"
          ? "Password salah."
          : err.code === "auth/invalid-email"
          ? "Format email tidak valid."
          : err.code === "auth/invalid-credential"
          ? "Email atau password salah."
          : err.message;

      setError(message);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    try {
      await signOut(auth);
      router.push("/auth/login"); // Redirect ke halaman login setelah logout
    } catch (err: any) {
      setError("Gagal keluar: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E4D45]"></div>
        <p className="text-xl text-[#0E4D45] ml-4">Memuat...</p>
      </div>
    );
  }

  // Jika user sudah login, redirect ke dashboard
  if (user) {
    router.push("/dashboard/all");
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E4D45]"></div>
        <p className="text-xl text-[#0E4D45] ml-4">Mengalihkan...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center pb-16 px-8 sm:px-16 md:px-24 py-12">
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

        <div className="mb-8 mt-8">
          <h2 className="text-3xl font-bold text-[#0E4D45] mb-2">
            Selamat Datang Kembali
          </h2>
          <p className="text-gray-600 text-xl">
            Masukkan email dan password Anda
          </p>
        </div>

        <form onSubmit={handleSignIn} className="flex flex-col space-y-4 mt-8">
          {error && (
            <div className="text-red-600 text-sm bg-red-100 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label className="block text-lg font-medium text-[#0E4D45] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-[#0E4D45] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45] focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0E4D45] text-white font-semibold py-3 rounded-lg hover:bg-[#0A3B35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>

      <div className="hidden lg:flex w-1/2 items-center justify-center p-16">
        <img 
          className="w-full h-full bg-gray-300 rounded-bl-3xl rounded-tr-3xl object-cover" 
          src="/img/login_img.JPG" 
          alt="Login illustration" 
        />
      </div>
    </div>
  );
};

export default AuthComponent;