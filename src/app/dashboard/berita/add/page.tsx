'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addNews } from '@/service/berita/newsService';

const BASE_PATH = '/dashboard/berita';

export default function AddNewsPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    if (!imageFile) {
      setStatusMessage('Gambar harus dipilih untuk berita baru.');
      return;
    }

    try {
      await addNews({ title, content, imageFile });
      setIsSuccess(true);
      setStatusMessage('Berita berhasil ditambahkan!');
      // Redirect kembali ke list
      setTimeout(() => router.push(BASE_PATH), 600);
    } catch (err: any) {
      setIsSuccess(false);
      setStatusMessage(`Gagal menambah berita: ${err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Tambah Berita</h1>
        <Link
          href={BASE_PATH}
          className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Kembali
        </Link>
      </div>

      {statusMessage && (
        <div
          className={`mb-6 rounded-xl px-4 py-3 text-sm border ${
            isSuccess
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-7">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Tulis judul berita…"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Isi Konten</label>
          <textarea
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Tulis isi berita…"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Berita</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#0E4D45] text-white px-4 py-2.5 font-medium shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4D45]"
          >
            Simpan
          </button>
          <Link
            href={BASE_PATH}
            className="flex-1 text-center rounded-xl bg-gray-100 text-gray-800 px-4 py-2.5 font-medium hover:bg-gray-200"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
