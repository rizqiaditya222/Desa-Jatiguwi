// PengumumanDetail.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head'; // Import Head
import Navbar from '@/components/landing_page/navbar/page';
import Footer from '@/components/landing_page/footer/page';
import { collection, query, limit, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { PengumumanArticle } from '@/types/pengumuman';
import PengumumanHeader from '@/components/pengumuman/header';
import PengumumanContent from '@/components/pengumuman/content';
import PengumumanSidebar from '@/components/pengumuman/sidebar';

const PengumumanDetail = () => {
  const params = useParams() as Readonly<Record<string, string | string[]>> | null;
  const router = useRouter();
  const rawSlug = params?.['slug'];
  const currentSlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? null;

  const [announcement, setAnnouncement] = useState<PengumumanArticle | null>(null);
  const [otherAnnouncements, setOtherAnnouncements] = useState<PengumumanArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!currentSlug) {
        setLoading(false);
        setError('No announcement slug provided.');
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const qMain = query(collection(db, 'pengumuman'), where('slug', '==', currentSlug), limit(1));
        const querySnapshot = await getDocs(qMain);

        if (querySnapshot.empty) {
          setAnnouncement(null);
          setError('Pengumuman tidak ditemukan.');
          return;
        }

        const docSnap = querySnapshot.docs[0];
        const mainData = docSnap.data() as Omit<PengumumanArticle, 'id'>;
        setAnnouncement({ id: docSnap.id, ...mainData });

        const qOthers = query(collection(db, 'pengumuman'), orderBy('date', 'desc'), limit(3));
        const otherSnap = await getDocs(qOthers);

        const others = otherSnap.docs
          .filter((d) => d.id !== docSnap.id)
          .slice(0, 2)
          .map((d) => ({ id: d.id, ...(d.data() as Omit<PengumumanArticle, 'id'>) }));

        setOtherAnnouncements(others);
      } catch (err) {
        console.error('Error fetching announcement:', err);
        setError('Failed to load announcement. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [currentSlug]);

  // Handle loading, error, and not found states as before

  if (loading) {
    return <div className="bg-gray-50 min-h-screen flex items-center justify-center"><p className="text-gray-700">Loading pengumuman...</p></div>;
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

  if (!announcement) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Pengumuman tidak ditemukan</h1>
        </div>
      </div>
    );
  }

  // Generate the canonical URL for the current announcement
  const canonicalUrl = `https://yourdomain.com/pengumuman/${announcement.slug}`; // **IMPORTANT: Replace with your actual domain**

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Add Head for SEO and Open Graph tags */}
      <Head>
        <title>{announcement.title} | Pengumuman</title>
        <meta name="description" content={announcement.content?.substring(0, 160) || 'Baca pengumuman terbaru dari kami.'} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={announcement.title} />
        <meta property="og:description" content={announcement.content?.substring(0, 160) || 'Baca pengumuman terbaru dari kami.'} />
        {/* You can add an og:image tag here if your announcements have images */}
        {/* <meta property="og:image" content={announcement.imageUrl || 'default_image_url.jpg'} /> */}
        <meta property="og:site_name" content="Your Website Name" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" /> {/* Optional: Your Twitter handle */}
        <meta name="twitter:title" content={announcement.title} />
        <meta name="twitter:description" content={announcement.content?.substring(0, 160) || 'Baca pengumuman terbaru dari kami.'} />
        {/* <meta name="twitter:image" content={announcement.imageUrl || 'default_image_url.jpg'} /> */}
      </Head>

      <Navbar isLoggedIn={false} />
      <PengumumanHeader title={announcement.title} />
      <div className="px-24 mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <PengumumanContent announcement={announcement} />
          <PengumumanSidebar otherAnnouncements={otherAnnouncements} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PengumumanDetail;