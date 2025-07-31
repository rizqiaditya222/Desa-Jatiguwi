"use client";

import React, { useEffect, useState } from "react";
import PrimaryCard from "@/components/card/PrimaryCard";
import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryCard from "@/components/card/SecondaryCard";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/clientApps";
import { NewsArticle } from "@/types/berita";
import { PengumumanArticle } from "@/types/pengumuman";

const PengumumanBerita = () => {
  const [announcements, setAnnouncements] = useState<PengumumanArticle[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Announcements (Pengumuman)
        const pengumumanRef = collection(db, "pengumuman");
        const qPengumuman = query(
          pengumumanRef,
          orderBy("date", "desc"),
          limit(2)
        ); // Get latest 2
        const pengumumanSnapshot = await getDocs(qPengumuman);
        const fetchedAnnouncements: PengumumanArticle[] =
          pengumumanSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<PengumumanArticle, "id">),
          }));
        setAnnouncements(fetchedAnnouncements);

        // Fetch News (Berita)
        const beritaRef = collection(db, "berita");
        const qBerita = query(beritaRef, orderBy("date", "desc"), limit(2)); // Get latest 2
        const beritaSnapshot = await getDocs(qBerita);
        const fetchedNews: NewsArticle[] = beritaSnapshot.docs.map((doc) => ({
          id: doc.id,
          // imageUrl tetap diambil, tetapi SecondaryCard tidak akan merendernya
          ...(doc.data() as Omit<NewsArticle, "id">),
        }));
        setNews(fetchedNews);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to format Firestore Timestamp to readable date
  const formatDate = (timestamp: Timestamp | Date) => {
    if (timestamp instanceof Timestamp) {
      return new Date(timestamp.seconds * 1000)
        .toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/\./g, "");
    }
    return new Date(timestamp)
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/\./g, "");
  };

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 mx-auto bg-white">
        <div className="text-lg text-center text-gray-600">
          Loading data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 mx-auto bg-white">
        <div className="text-lg text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 mx-auto">
      
      {/* Mobile Layout - Stacked */}
      <div className="block lg:hidden space-y-8 md:space-y-12">
        
        {/* Pengumuman Section - Mobile */}
        <section className="w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-2 sm:pb-4 mb-6 sm:mb-8 md:mb-12">
            Pengumuman
          </h1>
          <div className="space-y-4 sm:space-y-6">
            {announcements.length > 0 ? (
              announcements.map((pengumuman) => (
                <PrimaryCard
                  key={pengumuman.id}
                  Judul={pengumuman.title}
                  deskripsi={pengumuman.content}
                  date={formatDate(pengumuman.date)}
                  href={`/pengumuman/${pengumuman.slug || pengumuman.id}`}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Tidak ada pengumuman terbaru.</p>
            )}
          </div>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <PrimaryLinkButton
              href="/pengumuman"
              text="Lihat Semua Pengumuman"
              className="w-full sm:w-auto"
            />
          </div>
        </section>

        {/* Berita Section - Mobile */}
        <section className="w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-2 sm:pb-4 mb-6 sm:mb-8 md:mb-12">
            Berita
          </h1>
          <div className="space-y-4 sm:space-y-6">
            {news.length > 0 ? (
              news.map((berita) => (
                <SecondaryCard
                  key={berita.id}
                  Judul={berita.title}
                  date={formatDate(berita.date)}
                  deskripsi={berita.content}
                  href={`/berita/${berita.slug || berita.id}`}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Tidak ada berita terbaru.</p>
            )}
          </div>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <PrimaryLinkButton
              href="/berita"
              text="Lihat Semua Berita"
              className="w-full sm:w-auto"
            />
          </div>
        </section>
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
        
        {/* Pengumuman Section - Desktop */}
        <section className="w-full col-span-5">
          <h1 className="text-3xl xl:text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4 mb-12">
            Pengumuman
          </h1>
          <div className="space-y-6">
            {announcements.length > 0 ? (
              announcements.map((pengumuman) => (
                <PrimaryCard
                  key={pengumuman.id}
                  Judul={pengumuman.title}
                  deskripsi={pengumuman.content}
                  date={formatDate(pengumuman.date)}
                  href={`/pengumuman/${pengumuman.slug || pengumuman.id}`}
                />
              ))
            ) : (
              <p className="text-gray-500">Tidak ada pengumuman terbaru.</p>
            )}
          </div>
          <PrimaryLinkButton
            href="/pengumuman"
            text="Lihat Semua Pengumuman"
            className="mt-6"
          />
        </section>

        {/* Berita Section - Desktop */}
        <section className="w-full col-span-7">
          <h1 className="text-3xl xl:text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4 mb-12">
            Berita
          </h1>
          <div className="space-y-6">
            {news.length > 0 ? (
              news.map((berita) => (
                <SecondaryCard
                  key={berita.id}
                  Judul={berita.title}
                  date={formatDate(berita.date)}
                  deskripsi={berita.content}
                  href={`/berita/${berita.slug || berita.id}`}
                />
              ))
            ) : (
              <p className="text-gray-500">Tidak ada berita terbaru.</p>
            )}
          </div>
          <PrimaryLinkButton
            href="/berita"
            text="Lihat Semua Berita"
            className="mt-6"
          />
        </section>
      </div>
    </div>
  );
};

export default PengumumanBerita;