'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { deletePengumuman } from '@/service/pengumuman/pengumumanService'; // sesuaikan path servicemu
import { PengumumanArticle } from '@/types/pengumuman';

const BASE_PATH = '/dashboard/pengumuman';

export default function PengumumanListPage() {
  const [items, setItems] = React.useState<(PengumumanArticle)[]>([]);
  const [statusMessage, setStatusMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, 'pengumuman'), orderBy('date', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<PengumumanArticle, 'id'>),
        })) as PengumumanArticle[];
        setItems(data);
      } catch (e: any) {
        setStatusMessage(`Gagal memuat pengumuman: ${e.message}`);
        setIsSuccess(false);
      }
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus pengumuman ini?')) return;
    try {
      await deletePengumuman(id); // service lama: by id
      setItems((prev) => prev.filter((it) => it.id !== id));
      setStatusMessage('Pengumuman berhasil dihapus!');
      setIsSuccess(true);
    } catch (e: any) {
      setStatusMessage(`Gagal menghapus: ${e.message}`);
      setIsSuccess(false);
    }
  };

  return (
    <div className="px-24 mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E4D45]">
          Edit Pengumuman
        </h1>

        <Link
          href={`${BASE_PATH}/add`}
          className="inline-flex items-center justify-center w-11 h-11 rounded-2xl shadow-md bg-[#0E4D45] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4D45]"
          aria-label="Tambah Pengumuman"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* List */}
      <div className="space-y-6">
        {items.length === 0 ? (
          <p className="text-gray-600">Belum ada pengumuman.</p>
        ) : (
          items.map((it) => (
            <article key={it.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex">
                {/* Konten */}
                <div className="flex-1 px-5 py-5">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#0E4D45] leading-snug">
                      {it.title}
                    </h3>
                    {it.category && (
                      <span className="inline-block text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {it.category}
                      </span>
                    )}
                  </div>

                  {it.content && (
                    <p
                      className="mt-2 text-gray-700"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {it.content}
                    </p>
                  )}

                  <div className="mt-3">
                    <ClientSideFormattedDate timestamp={(it.date?.seconds || 0) * 1000} />
                  </div>
                </div>

                {/* Panel aksi */}
                <div className="w-24 flex flex-col items-center justify-center gap-3 bg-[#0E4D45] px-4">
                  <button
                    onClick={() => router.push(`${BASE_PATH}/edit/${it.slug}`)} // routing by slug
                    className="p-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus:ring-2 focus:ring-white/50"
                    title="Edit"
                  >
                    <PencilIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(it.id)} // service delete by id
                    className="p-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition focus:outline-none focus:ring-2 focus:ring-white/50"
                    title="Hapus"
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

/* Helpers */
function ClientSideFormattedDate({ timestamp }: { timestamp: number }) {
  const [formattedDate, setFormattedDate] = React.useState('');
  React.useEffect(() => {
    if (!timestamp) return;
    const d = new Date(timestamp);
    setFormattedDate(
      d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    );
  }, [timestamp]);
  return (
    <p className="text-sm text-gray-600 inline-flex items-center gap-2">
      <CalendarIcon className="w-4 h-4 text-gray-500" />
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
