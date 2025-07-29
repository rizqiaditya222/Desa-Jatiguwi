'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { fetchGalleryBySlug, updateGalleryBySlug } from '@/service/gallery/galleryService';

const BASE_PATH = '/dashboard/galeri';

export default function EditGalleryPage() {
  // Ambil slug secara aman
  const params = useParams() as Readonly<Record<string, string | string[]>> | null;
  const slug = (Array.isArray(params?.slug) ? params?.slug[0] : params?.slug) as string | undefined;

  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const [statusMessage, setStatusMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const data = await fetchGalleryBySlug(slug);
        setTitle(data.title);
        setImageUrl(data.imageUrl || null);
      } catch (e: any) {
        setStatusMessage(e.message || 'Gagal memuat data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;

    setStatusMessage('');
    setIsSuccess(false);

    try {
      const newSlug = await updateGalleryBySlug(slug, {
        title,
        imageFile: imageFile ?? undefined,
        imageUrl: !imageFile ? imageUrl ?? undefined : undefined,
      });
      setIsSuccess(true);
      setStatusMessage('Item galeri berhasil diperbarui!');
      // Jika slug berubah akibat judul baru → arahkan ke slug baru
      setTimeout(() => router.push(BASE_PATH), 600);
    } catch (e: any) {
      setIsSuccess(false);
      setStatusMessage(`Gagal memperbarui: ${e.message}`);
    }
  };

  if (!slug) {
    return <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">Slug tidak ditemukan.</div>;
  }
  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">Memuat…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Edit Item Galeri</h1>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-gray-700 hover:file:bg-gray-200"
          />
          {imageUrl && !imageFile && (
            <p className="text-sm text-gray-500 mt-2">
              Gambar saat ini:{' '}
              <a className="underline" href={imageUrl} target="_blank" rel="noreferrer">
                Lihat Gambar
              </a>{' '}
              (pilih file baru untuk mengubah)
            </p>
          )}
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
