// PengumumanDetail.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/landing_page/navbar/page';
import Footer from '@/components/landing_page/footer/page';
import { collection, query, limit, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import PengumumanHeader from '@/components/pengumuman/header';
import PengumumanContent from '@/components/pengumuman/content';
import BeritaSidebar from '@/components/berita/sidebar';
import { NewsArticle } from '@/types/berita'; // Assuming NewsArticle is the correct type
import BeritaContent from '@/components/berita/content';

const BeritaDetail = () => {
  const params = useParams() as Readonly<Record<string, string | string[]>> | null;
  const router = useRouter();
  const rawSlug = params?.['slug'];
  const currentSlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? null;

  const [news, setNews] = useState<NewsArticle | null>(null);
  const [otherNews, setOtherNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!currentSlug) {
        setLoading(false);
        setError('No news slug provided.');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const qMain = query(collection(db, 'berita'), where('slug', '==', currentSlug), limit(1));
        const querySnapshot = await getDocs(qMain);

        if (querySnapshot.empty) {
          setNews(null);
          setError('Berita tidak ditemukan.');
          return;
        }

        const docSnap = querySnapshot.docs[0];
        const mainData = docSnap.data() as Omit<NewsArticle, 'id'>;
        setNews({ id: docSnap.id, ...mainData });

        const qOthers = query(collection(db, 'berita'), orderBy('date', 'desc'), limit(3));
        const otherSnap = await getDocs(qOthers);

        const others = otherSnap.docs
          .filter((d) => d.id !== docSnap.id)
          .slice(0, 2)
          .map((d) => ({ id: d.id, ...(d.data() as Omit<NewsArticle, 'id'>) }));

        setOtherNews(others);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentSlug]);

  if (loading) {
    return <div className="bg-gray-50 min-h-screen flex items-center justify-center"><p className="text-gray-700">Loading berita...</p></div>;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita tidak ditemukan</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar isLoggedIn={false} />
      <PengumumanHeader title={news.title} />
      <div className="px-24 mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <BeritaContent news={news} />
          <BeritaSidebar otherAnnouncements={otherNews} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BeritaDetail;