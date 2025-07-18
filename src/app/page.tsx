import Hero from "@/components/landing_page/hero/page";
import Navbar from "@/components/landing_page/navbar/page";
import PerangkatDesa from "@/components/landing_page/perangkat_desa/page";
import SelayangPandang from "@/components/landing_page/selayang_pandang/page";
import VideoSection from "@/components/landing_page/video/page";
import VisiMisi from "@/components/landing_page/visi_misi/page";
import Sejarah from "@/components/landing_page/sejarah/page";
import React from "react";
import Galeri from "@/components/landing_page/galeri/page";
import Footer from "@/components/footer/footer";
import AuthComponent from "./auth/login/page";

const Home = () => {
  return (
    <div>
      <Navbar />
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
