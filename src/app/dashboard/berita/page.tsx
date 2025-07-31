'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { deleteNews } from '@/service/berita/newsService';
import { NewsArticle } from '@/types/berita';

const BASE_PATH = '/dashboard/berita';

export default function ManageNewsPage() {
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'berita'));
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];

      newsData.sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0));
      setNewsList(newsData);
    } catch (error: any) {
      setStatusMessage(`Gagal memuat daftar berita: ${error.message}`);
      setIsSuccess(false);
    }
  };

  const handleDelete = async (newsId: string, imageUrl: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await deleteNews(newsId, imageUrl);
        setStatusMessage('Berita berhasil dihapus!');
        setIsSuccess(true);
        fetchNews();
      } catch (error: any) {
        setStatusMessage(`Gagal menghapus berita: ${error.message}`);
        setIsSuccess(false);
      }
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 py-8 lg:px-8"> {/* Adjusted padding */}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0E4D45]"> {/* Adjusted text size */}
          Edit Berita
        </h1>

        <Link
          href={`${BASE_PATH}/add`}
          className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl shadow-md bg-[#0E4D45] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4D45]"
          title="Tambah Berita"
          aria-label="Tambah Berita"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {statusMessage && (
        <div
          className={`mb-8 rounded-xl px-4 py-3 text-sm border ${
            isSuccess
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* List Berita */}
      <div className="space-y-6">
        {newsList.length === 0 ? (
          <p className="text-gray-600">Tidak ada berita yang tersedia.</p>
        ) : (
          newsList.map((news) => (
            <article
              key={news.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row"> {/* Changed to flex-col by default, flex-row on sm screens and up */}
                {/* Thumbnail */}
                <div className="p-4 sm:p-5 sm:w-72 flex-shrink-0"> {/* Added flex-shrink-0 and adjusted padding */}
                  <div className="h-44 w-full overflow-hidden rounded-xl">
                    <img
                      src={news.imageUrl || '/placeholder.jpg'}
                      alt={news.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Konten */}
                <div className="flex-1 px-4 py-4 sm:px-6 sm:py-5"> {/* Adjusted padding */}
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0E4D45] leading-snug">
                    {news.title}
                  </h3>
                  {news.content && (
                    <p
                      className="mt-2 text-gray-700 text-sm sm:text-base" // Adjusted text size
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {news.content}
                    </p>
                  )}
                  <div className="mt-3">
                    <ClientSideFormattedDate timestamp={(news.date?.seconds || 0) * 1000} />
                  </div>
                </div>

                {/* Panel aksi */}
                {/* Changed to flex-row by default, sm:flex-col, justify-end on small screens, items-center on larger */}
                <div className="flex flex-row sm:flex-col items-center justify-end sm:justify-center gap-3 bg-[#0E4D45] px-4 py-3 sm:py-4"> {/* Adjusted padding and alignment */}
                  <button
                    onClick={() => router.push(`${BASE_PATH}/edit/${news.slug}`)}
                    className="p-2 sm:p-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus:ring-2 focus:ring-white/50"
                    title="Edit"
                    aria-label="Edit"
                  >
                    <PencilIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(news.id, news.imageUrl)}
                    className="p-2 sm:p-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus:ring-2 focus:ring-white/50"
                    title="Hapus"
                    aria-label="Hapus"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

function ClientSideFormattedDate({ timestamp }: { timestamp: number }) {
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    if (!timestamp) return;
    const d = new Date(timestamp);
    setFormattedDate(
      d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    );
  }, [timestamp]);
  return (
    <p className="text-xs sm:text-sm text-gray-600 inline-flex items-center gap-2"> {/* Adjusted text size */}
      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" /> {/* Adjusted icon size */}
      {formattedDate || ''}
    </p>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" {...props}>
      <path d="M3 21l3.6-.6L19 8l-2.9-2.9L3.7 17.5 3 21z" />
      <path d="M14.5 4.5l5 5" strokeLinecap="round" />
    </svg>
  );
}
function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" {...props}>
      <path d="M4 7h16" strokeLinecap="round" />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}