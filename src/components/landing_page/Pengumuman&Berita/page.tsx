// app/components/PengumumanBerita.tsx (Tidak Ada Perubahan yang diperlukan di sini untuk masalah gambar)
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
      <div className="grid w-full grid-cols-12 px-24 py-12 mx-auto bg-white">
        <div className="col-span-12 text-lg text-center text-gray-600">
          Loading data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid w-full grid-cols-12 px-24 py-12 mx-auto bg-white">
        <div className="col-span-12 text-lg text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className=" max-w-360 grid w-full grid-cols-12 px-24 py-12 mx-auto">
      <section className="w-full col-span-5 pr-12">
        <h1 className="text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4">
          Pengumuman
        </h1>
        <div className="max-w-xl pt-12 space-y-6">
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
          className=" mt-6"
        />
      </section>
      <section className="w-full col-span-7 pl-12">
        <h1 className="text-4xl font-bold text-[#0E4D45] inline-block border-b-2 border-[#0E4D45] pb-4">
          Berita
        </h1>
        <div className="max-w-4xl pt-12 space-y-6">
          {news.length > 0 ? (
            news.map((berita) => (
              <SecondaryCard
                key={berita.id}
                Judul={berita.title}
                date={formatDate(berita.date)}
                deskripsi={berita.content}
                // imageUrl={berita.imageUrl} // imageUrl tetap diambil dari Firestore, tapi SecondaryCard tidak merendernya
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
          className=" mt-6"
        />
      </section>
    </div>
  );
};

export default PengumumanBerita;
