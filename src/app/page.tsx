'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Assuming '@/lib/firebase/clientApps' correctly initializes and exports the Firebase app instance
import app from '@/lib/firebase/clientApps';

import Hero from "@/components/landing_page/hero/page";
import Navbar from "@/components/landing_page/navbar/page";
import PerangkatDesa from "@/components/landing_page/perangkat_desa/page";
import SelayangPandang from "@/components/landing_page/selayang_pandang/page";
import VideoSection from "@/components/landing_page/video/page";
import VisiMisi from "@/components/landing_page/visi_misi/page";
import Sejarah from "@/components/landing_page/sejarah/page";
import Galeri from "@/components/landing_page/galeri/page";
import Footer from "@/components/landing_page/footer/page";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get the Firebase Auth instance
    const auth = getAuth(app);

    // Set up an observer to listen for changes in the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If a user object exists, they are logged in
      if (user) {
        setIsLoggedIn(true);
      } else {
        // No user is logged in
        setIsLoggedIn(false);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* Pass the isLoggedIn state as a prop to the Navbar component */}
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />
      <VideoSection />
      <VisiMisi />
      <PerangkatDesa />
      <SelayangPandang />
      <Sejarah />
      <Galeri />
      <Footer />
    </div>
  );
};

export default Home;