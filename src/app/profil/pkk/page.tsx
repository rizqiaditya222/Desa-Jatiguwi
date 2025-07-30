"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/landing_page/navbar/page";
import { useAuth } from "@/app/auth/context/AuthContext";
import NavButtonAll from "@/components/button/nav_button_all";
import Footer from "@/components/landing_page/footer/page";
import { fetchProfil } from "@/service/profile/profileService"; // Import your service

const ProfilPage = () => {
  const { user } = useAuth();
  const [selectedProfil, setSelectedProfil] = useState<"desa" | "bpd" | "lpmd">(
    "desa"
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

  const gambarMap: Record<typeof selectedProfil, string> = {
    lpmd: profilData?.pkkUrl || "/img/default_pkk.png", // Provide a fallback image
    bpd: profilData?.bpdUrl || "/img/default_bpd.png", // Provide a fallback image
    desa: profilData?.desaUrl || "/img/default_desa.png", // Provide a fallback image
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar isLoggedIn={!!user} />

      {/* Profil Desa Jatiguwi */}
      <div className="flex flex-col px-24 justify-center items-center text-[#0E4D45] pb-24">
        <div className=" flex justify-between w-full">
          <p className="text-4xl font-bold">Profil Desa Jatiguwi</p>
          <p className="text-end w-2/5">
            Mengenal lebih dekat Desa Jatiguwi dengan sejarah, visi, dan misi
            dalam berkomitmen untuk melayani masyarakat dengan baik.
          </p>
        </div>

        <div className="my-5 w-full h-[1px] bg-[#0E4D45]" />

        <div className=" grid w-full grid-cols-12 gap-8">
          <section className="flex flex-col items-end col-span-5 p-12">
            <img
              src="/img/logo_desa.png"
              alt="Logo Desa Jatiguwi"
              className="selection:max-w-80 max-h-80 mx-auto"
            />
          </section>
          <section className=" flex flex-col col-span-6 col-start-6 py-4">
            <div className=" flex flex-col">
              <p className="pt-12 pb-8 text-3xl font-semibold">Visi & Misi</p>
              <p className="pb-8 text-2xl">
                Terwujudnya masyarakat Desa Jatiguwi yang:{" "}
                <span className="font-bold">KARTINI</span>
              </p>
            </div>

            <div className=" grid grid-cols-3 gap-8">
              {kataKata.map((kata) => (
                <div key={kata.id} className="text-lg font-semibold">
                  {kata.id}. {kata.text}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Struktur Organisasi */}
        <div className=" flex justify-between w-full mt-16">
          <p className="text-4xl font-bold">Struktur Organisasi</p>
          <p className="text-end w-2/5">
            Mengenal lebih dekat struktur organisasi kelembagaan desa.
          </p>
        </div>

        <div className="my-5 w-full h-[1px] bg-[#0E4D45]" />

        <div className="flex flex-col justify-center mx-auto space-y-8">
          {/* Tombol Pilih */}
          <div className="flex mx-auto gap-8 border-2 border-[#0E4D45] p-4 rounded-2xl">
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
          <div className="max-w-3xl mx-auto">
            {profilData ? (
              <img
                src={gambarMap[selectedProfil]}
                alt={`gambar ${selectedProfil}`}
              />
            ) : (
              <p>No image available for {selectedProfil}.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilPage;