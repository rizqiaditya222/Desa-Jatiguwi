'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { updatePengumuman } from '@/service/pengumuman/pengumumanService'; // sesuaikan path servicemu
import { PengumumanArticle } from '@/types/pengumuman';

const BASE_PATH = '/dashboard/pengumuman';

export default function EditPengumumanPage() {
const params = useParams() as Readonly<Record<string, string | string[]>> | null;
const slug = (Array.isArray(params?.slug) ? params?.slug[0] : params?.slug) as string | undefined;

if (!slug) {
  return <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">Slug tidak ditemukan.</div>;
}
  const router = useRouter();

  const [docId, setDocId] = React.useState<string>('');
  const [initial, setInitial] = React.useState<(PengumumanArticle | null)>(null);
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [content, setContent] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, 'pengumuman'),
          where('slug', '==', slug),
          limit(1)
        );
        const snap = await getDocs(q);
        if (snap.empty) {
          setStatusMessage('Pengumuman tidak ditemukan.');
          setInitial(null);
        } else {
          const d = snap.docs[0];
          const data = { id: d.id, ...(d.data() as Omit<PengumumanArticle, 'id'>) } as PengumumanArticle;
          setDocId(d.id);
          setInitial(data);
          setTitle(data.title);
          setCategory(data.category || '');
          setContent(data.content);
        }
      } catch (e: any) {
        setStatusMessage(`Gagal memuat data: ${e.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docId) return;

    setStatusMessage('');
    setIsSuccess(false);

    try {
      await updatePengumuman(docId, {
        title,
        category,
        content,
      });
      setIsSuccess(true);
      setStatusMessage('Pengumuman berhasil diperbarui!');
      setTimeout(() => router.push(BASE_PATH), 600);
    } catch (e: any) {
      setStatusMessage(`Gagal memperbarui pengumuman: ${e.message}`);
      setIsSuccess(false);
    }
  };

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">Memuat…</div>;
  }

  if (!initial) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">Edit Pengumuman</h1>
          <Link href={BASE_PATH} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">Kembali</Link>
        </div>
        <p className="text-red-600">{statusMessage || 'Data tidak ditemukan.'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Edit Pengumuman</h1>
        <Link href={BASE_PATH} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Contoh: Umum, Akademik, dll."
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
