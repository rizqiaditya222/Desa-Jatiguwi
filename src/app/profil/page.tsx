"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/landing_page/navbar/page";
import { useAuth } from "@/app/auth/context/AuthContext";
import NavButtonAll from "@/components/button/nav_button_all";
import Footer from "@/components/landing_page/footer/page";

import { fetchProfil } from "@/service/profile/profileService"; // Import your service

const ProfilPage = () => {
  const { user } = useAuth();
  const [selectedProfil, setSelectedProfil] = useState<"lpmd" | "bpd" | "desa">(
    "lpmd" // Default to 'lpmd' (PKK)
  );

  const [profilData, setProfilData] = useState<any>(null); // State to store fetched profile data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfilData = async () => {
      try {
        setLoading(true);
        const data = await fetchProfil();
        // Assuming you have only one profile entry or you want the first one
        if (data && data.length > 0) {
          setProfilData(data[0]);
        } else {
          setError("No profile data found.");
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    getProfilData();
  }, []);

  const kataKata = [
    { id: 1, text: "Kreatif" },
    { id: 2, text: "Agamis" },
    { id: 3, text: "Responsif" },
    { id: 4, text: "Tertib" },
    { id: 5, text: "Inspiratif" },
    { id: 6, text: "Ngayomi" },
    { id: 7, text: "Inovatif" },
  ];

  // Map selectedProfil to image URLs, with fallbacks
  const gambarMap: Record<typeof selectedProfil, string> = {
    lpmd: profilData?.pkkUrl || "/img/pkk.png", // Assuming 'lpmd' corresponds to PKK image
    bpd: profilData?.bpdUrl || "/img/bpd.png",
    desa: profilData?.desaUrl || "/img/desa.png",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar isLoggedIn={!!user} />

      {/* Profil Desa Jatiguwi */}
      <div className="flex flex-col pt-8 px-8 md:px-24 justify-center items-center text-[#0E4D45] pb-12 md:pb-24">
        <div className="flex flex-col md:flex-row justify-between w-full items-center md:items-start text-center md:text-left">
          <p className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Profil Desa Jatiguwi</p>
          <p className="text-base md:text-lg w-full md:w-2/5 text-center md:text-end">
            Mengenal lebih dekat Desa Jatiguwi dengan sejarah, visi, dan misi
            dalam berkomitmen untuk melayani masyarakat dengan baik.
          </p>
        </div>

        <div className="my-5 w-full h-[1px] bg-[#0E4D45]" />
        <div className="grid w-full px-4 md:px-24 py-8 md:py-12 mx-auto">
          <div className="grid w-full grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <section className="flex flex-col items-center md:items-end col-span-1 md:col-span-5 p-4 md:p-12">
              <img
                src="/img/logo_desa.png"
                alt="Logo Desa Jatiguwi"
                className="max-w-xs md:max-w-80 max-h-xs md:max-h-80 mx-auto"
              />
            </section>
            <section className="flex flex-col col-span-1 md:col-span-6 md:col-start-6 py-4 text-center md:text-left">
              <div className="flex flex-col">
                <p className="pt-4 md:pt-12 pb-4 md:pb-8 text-2xl md:text-3xl font-semibold">
                  Visi & Misi
                </p>
                <p className="pb-4 md:pb-8 text-lg md:text-2xl">
                  Terwujudnya masyarakat Desa Jatiguwi yang:{" "}
                  <span className="font-bold">KARTINI</span>
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {kataKata.map((kata) => (
                  <div key={kata.id} className="text-base md:text-lg font-semibold">
                    {kata.id}. {kata.text}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* Struktur Organisasi */}
        <div className="flex flex-col md:flex-row justify-between w-full mt-8 md:mt-16 items-center md:items-start text-center md:text-left">
          <p className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Struktur Organisasi</p>
          <p className="text-base md:text-lg w-full md:w-2/5 text-center md:text-end">
            Mengenal lebih dekat struktur organisasi kelembagaan desa.
          </p>
        </div>

        <div className="my-5 w-full h-[1px] bg-[#0E4D45]" />
        <div className="grid w-full mx-auto">
          <div className="flex flex-col justify-center mx-auto space-y-8">
            {/* Tombol Pilih - ONLY ONE BLOCK HERE */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-2 border-[#0E4D45] p-4 rounded-2xl">
              <button onClick={() => setSelectedProfil("desa")}>
                <NavButtonAll
                  text="Desa"
                  href="#"
                  isSelected={selectedProfil === "desa"}
                />
              </button>
              <button onClick={() => setSelectedProfil("bpd")}>
                <NavButtonAll
                  text="BPD"
                  href="#"
                  isSelected={selectedProfil === "bpd"}
                />
              </button>
              <button onClick={() => setSelectedProfil("lpmd")}>
                <NavButtonAll
                  text="PKK"
                  href="#"
                  isSelected={selectedProfil === "lpmd"}
                />
              </button>
            </div>

            {/* Gambar Berdasarkan Pilihan */}
            <div className="max-w-full md:max-w-3xl mx-auto px-4">
              {profilData ? (
                <img
                  src={gambarMap[selectedProfil]}
                  alt={`gambar ${selectedProfil}`}
                  className="w-full h-auto"
                />
              ) : (
                <p className="text-center">No image available for {selectedProfil}.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilPage;