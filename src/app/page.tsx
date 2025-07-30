"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase/clientApps";

import Hero from "@/components/landing_page/hero/page";
import Navbar from "@/components/landing_page/navbar/page";
import PerangkatDesa from "@/components/landing_page/perangkat_desa/page";
import SelayangPandang from "@/components/landing_page/selayang_pandang/page";
import VideoSection from "@/components/landing_page/video/page";
import VisiMisi from "@/components/landing_page/visi_misi/page";
import Galeri from "@/components/landing_page/galeri/page";
import Footer from "@/components/landing_page/footer/page";
import PengumumanBerita from "@/components/landing_page/Pengumuman&Berita/page";
import AuthComponent from "./auth/login/page";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />
      <VideoSection />
      <VisiMisi />
      <PengumumanBerita />
      <SelayangPandang />
      <Galeri />
      <Footer />
    </div>
  );
};

export default Home;
