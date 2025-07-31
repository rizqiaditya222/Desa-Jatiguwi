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
    lpmd: profilData?.lpmdUrl || "/img/lpmd.png", // Assuming 'lpmd' corresponds to PKK image
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
        <div className="md:flex-row md:items-start md:text-left flex flex-col items-center justify-between w-full text-center">
          <p className="md:text-4xl md:mb-0 mb-4 text-2xl font-bold">
            Profil Desa Jatiguwi
          </p>
          <p className="md:text-lg md:w-2/5 md:text-end w-full text-base text-center">
            Mengenal lebih dekat Desa Jatiguwi dengan sejarah, visi, dan misi
            dalam berkomitmen untuk melayani masyarakat dengan baik.
          </p>
        </div>

        <div className="my-5 w-full h-[1px] bg-[#0E4D45]" />
        <div className="md:px-24 md:py-12 grid w-full px-4 py-8 mx-auto">
          <div className="md:grid-cols-12 grid items-center w-full grid-cols-1 gap-8">
            <section className="md:items-end md:col-span-5 md:p-12 flex flex-col items-center col-span-1 p-4">
              <img
                src="/img/logo_desa.png"
                alt="Logo Desa Jatiguwi"
                className="md:max-w-80 max-h-xs md:max-h-80 max-w-xs mx-auto"
              />
            </section>
            <section className="md:col-span-6 md:col-start-6 md:text-left flex flex-col col-span-1 py-4 text-center">
              <div className="flex flex-col">
                <p className="md:pt-12 md:pb-8 md:text-3xl pt-4 pb-4 text-2xl font-semibold">
                  Visi & Misi
                </p>
                <p className="md:pb-8 md:text-2xl pb-4 text-lg">
                  Terwujudnya masyarakat Desa Jatiguwi yang:{" "}
                  <span className="font-bold">KARTINI</span>
                </p>
              </div>

              <div className="md:grid-cols-3 md:gap-8 grid grid-cols-2 gap-4">
                {kataKata.map((kata) => (
                  <div
                    key={kata.id}
                    className="md:text-lg text-base font-semibold"
                  >
                    {kata.id}. {kata.text}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* Struktur Organisasi */}
        <div className="md:flex-row md:mt-16 md:items-start md:text-left flex flex-col items-center justify-between w-full mt-8 text-center">
          <p className="md:text-4xl md:mb-0 mb-4 text-2xl font-bold">
            Struktur Organisasi
          </p>
          <p className="md:text-lg md:w-2/5 md:text-end w-full text-base text-center">
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
                  text="LPMD"
                  href="#"
                  isSelected={selectedProfil === "lpmd"}
                />
              </button>
            </div>

            {/* Gambar Berdasarkan Pilihan */}
            <div className="md:max-w-3xl max-w-full px-4 mx-auto">
              {profilData ? (
                <img
                  src={gambarMap[selectedProfil]}
                  alt={`gambar ${selectedProfil}`}
                  className="w-full h-auto"
                />
              ) : (
                <p className="text-center">
                  No image available for {selectedProfil}.
                </p>
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
