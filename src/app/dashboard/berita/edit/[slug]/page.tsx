'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { updateNews } from '@/service/berita/newsService';
import { NewsArticle } from '@/types/berita';

const BASE_PATH = '/dashboard/berita';

export default function EditNewsPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [oldImageUrl, setOldImageUrl] = useState('');
  const [newsId, setNewsId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug) {
      fetchNewsBySlug(slug);
    }
  }, [slug]);

  const fetchNewsBySlug = async (slug: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'berita'));
      const match = querySnapshot.docs.find(doc => (doc.data() as NewsArticle).slug === slug);

      if (match) {
        const data = match.data() as NewsArticle;
        setTitle(data.title);
        setContent(data.content);
        setOldImageUrl(data.imageUrl);
        setNewsId(match.id);
      } else {
        setStatusMessage('Berita tidak ditemukan.');
        setIsSuccess(false);
      }
    } catch (error: any) {
      setStatusMessage(`Gagal memuat berita: ${error.message}`);
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    if (!title || !content) {
      setStatusMessage('Judul dan konten wajib diisi.');
      return;
    }

    try {
await updateNews(newsId, {
  title,
  content,
  imageFile: imageFile ?? undefined,
  imageUrl: imageFile ? undefined : oldImageUrl,
});

      setIsSuccess(true);
      setStatusMessage('Berita berhasil diperbarui!');
      setTimeout(() => router.push(BASE_PATH), 800);
    } catch (err: any) {
      setIsSuccess(false);
      setStatusMessage(`Gagal memperbarui berita: ${err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Edit Berita</h1>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Berita (Opsional)</label>
          {oldImageUrl && !imageFile && (
            <div className="mb-2">
              <img src={oldImageUrl} alt="Preview Gambar" className="h-32 rounded-xl" />
            </div>
          )}
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
            Simpan Perubahan
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
