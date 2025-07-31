import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryLinkButton from "@/components/button/secondary_button";
import React, { useEffect, useState } from "react";
import YoutubeVideo from "../video/youtube/page";
import { fetchProfilById } from "@/service/profile/profileService";
import { Profil } from "@/types/profil";

const Hero = () => {
  const [profileData, setProfileData] = useState<Profil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const data = await fetchProfilById("1");
        if (data) {
          setProfileData(data);
        } else {
          setError("Profile tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal memuat data profile");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden">
      {/* Decorative Images */}
      <img
        src="/img/Brutalist 76.png"
        alt="Dekorasi Kiri"
        className="absolute bottom-0 left-0 z-0 w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40 2xl:w-48 opacity-80"
      />

      <img
        src="/img/Brutalist 75.png"
        alt="Dekorasi Kanan"
        className="absolute top-0 right-0 z-0 w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40 2xl:w-48 opacity-80"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16">
        
        {/* Welcome Text */}
        <p className="text-sm sm:text-base md:text-md lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-2 md:mb-4">
          Selamat Datang di Website Resmi
        </p>
        
        {/* Main Title Section */}
        <div className="mb-4 sm:mb-4 md:mb-6 lg:mb-8">
          <h1 className="font-bold text-[#0E4D45] mb-2 sm:mb-3 md:mb-4 lg:mb-5">
            <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight">
              Desa Jatiguwi
            </span>
          </h1>
          <h2 className="font-bold text-[#0E4D45] text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-tight">
            Kecamatan Sumberpucung,<br className="md:hidden" />
            Kabupaten Malang
          </h2>
        </div>
        
        {/* Description Text - Now Dynamic */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl md:mb-12">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0E4D45]"></div>
            </div>
          ) : error ? (
            <p className="text-balance text-sm sm:text-base md:text-md lg:text-lg xl:text-xl text-red-500 leading-relaxed">
              {error}
            </p>
          ) : (
            <p className="text-balance text-sm sm:text-base md:text-md lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
              {profileData?.deskripsi || "Deskripsi tidak tersedia"}
            </p>
          )}
        </div>

        {/* Action Buttons (Optional - uncomment if needed) */}
        {/* <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-sm sm:max-w-md justify-center">
          <div className="flex-1 sm:flex-none">
            <PrimaryLinkButton text="Jelajahi Desa" href="/profil" />
          </div>
          <div className="flex-1 sm:flex-none">
            <SecondaryLinkButton text="Lihat Berita" href="/content" />
          </div>
        </div> */}

        {/* YouTube Video Section (Optional - uncomment if needed) */}
        {/* <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <YoutubeVideo />
        </div> */}
      </div>
    </div>
  );
};

export default Hero;