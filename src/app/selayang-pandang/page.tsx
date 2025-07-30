"use client";
import React from "react";
import Navbar from "@/components/landing_page/navbar/page";
import { useAuth } from "@/app/auth/context/AuthContext";
import PetaDesa from "@/components/Map/PetaDesa";
import Footer from "@/components/landing_page/footer/page";
import InfoCardGroup from "./infocardgroup";
import ListStatCard from "./liststatcard";
import WilayahLahanCard from "./wilayahlahancard";
const SelayangPandangPage = () => {
  const { user } = useAuth();
  const dukuhData = [
    {
      name: "Dukuh Jatimulyo",
      stats: [
        { title: "RW", value: 1, bg: true },
        { title: "RT", value: 5 },
        { title: "KK", value: 306 },
        { title: "JIWA", value: 1150, bg: true },
      ],
    },
    {
      name: "Dukuh Mentaraman",
      stats: [
        { title: "RW", value: 6, bg: true },
        { title: "RT", value: 25 },
        { title: "KK", value: 1365 },
        { title: "JIWA", value: 6303, bg: true },
      ],
    },
    {
      name: "Dukuh Krajan",
      stats: [
        { title: "RW", value: 2, bg: true },
        { title: "RT", value: 10 },
        { title: "KK", value: 455 },
        { title: "JIWA", value: 1256, bg: true },
      ],
    },
  ];

  const agamaData = [
    { label: "Islam", value: 6000 },
    { label: "Kristen", value: 300 },
    { label: "Katolik", value: 150 },
    { label: "Hindu", value: 120 },
    { label: "Buddha", value: 80 },
  ];

  const profesiData = [
    { label: "Petani", value: 6000 },
    { label: "Buruh Tani", value: 300 },
    { label: "Wiraswasta/dagang", value: 150 },
    { label: "Pegawai Negeri Sipil", value: 120 },
    { label: "ABRI/TNI/POLRI", value: 80 },
    { label: "Lainnya", value: 80 },
  ];

  const wilayahLahanData = [
    { label: "Sawah", value: 144, satuan: "Ha" },
    { label: "Tegalan", value: 43, satuan: "Ha" },
    { label: "Kebun", value: 12, satuan: "Ha" },
    { label: "Pemukiman", value: 27, satuan: "Ha" },
    { label: "Fasilitas umum", value: 8, satuan: "Ha" },
  ];
  return (
    <div>
      <Navbar isLoggedIn={!!user} />
      <div className="flex flex-col w-full px-24 py-6  text-[#0E4D45]">
        <div className=" flex justify-between">
          <p className=" text-4xl font-bold">Selayang Pandang</p>
          <p className="text-end w-2/5">
            Kenali Desa Jatiguwi di Sela yang Pandang! Temukan sekilas info
            menarik tentang sejarah dan potensi desa kami. Yuk, kenali lebih
            dekat!{" "}
          </p>
        </div>
        <div className="my-5 w-full h-[1px] bg-[#0E4D45]"></div>
        <div className="flex flex-col w-full py-8">
          <PetaDesa />
        </div>
        <div className="bg-rounded rounded-xl flex flex-col p-6 py-8 space-y-6 bg-gray-200">
          <p className=" w-full text-4xl font-semibold">Kondisi Geografis</p>
          <p className=" w-full text-xl">
            Desa Jatiguwi terletak sekitar ± 30 km di sebelah selatan Kabupaten
            Malang. Desa Jatiguwi memiliki luas wilayah seluruhnya 459,763 ha.
            Dengan luas sawah 260,502 ha, luas Tanah Tegalan   49.293 ha, Luas
            Tanah Pemukiman 20,966 ha, Luas Tanah Setengah Teknis 16,195 ha dan
            lain-Lain 112,807 ha.
          </p>
          <ul className="pl-6 space-y-1 text-lg list-disc list-inside">
            <li>
              <span className="w-44 inline-block font-semibold">
                Sebelah Utara
              </span>
              : Desa Ngadirejo, Kec. Kromengan
            </li>
            <li>
              <span className="w-44 inline-block font-semibold">
                Sebelah Timur
              </span>
              : Desa Sambigede, Kec. Sumberpucung
            </li>
            <li>
              <span className="w-44 inline-block font-semibold">
                Sebelah Selatan
              </span>
              : Desa Kalipare, Kec. Kalipare
            </li>
            <li>
              <span className="w-44 inline-block font-semibold">
                Sebelah Barat
              </span>
              : Desa Sumberpucung, Kec. Sumberpucung
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <WilayahLahanCard
            title="Wilayah Pertanian & Pemukiman"
            data={wilayahLahanData}
          />
        </div>
        <div className="bg-rounded rounded-xl flex flex-col p-6 my-6 space-y-6 bg-gray-200">
          <p className=" w-full text-4xl font-semibold">Kondisi Topografis</p>
          <p className=" w-full text-xl">
            Desa Jatiguwi dengan ketinggian tanah rata- rata 295 M diatas
            permukaan laut, merupakan daerah dataran rendah, dengan curah hujan
            rata – rata 22 mm/th. Bentuk permukaan tanah di Desa Jatiguwi 
            secara umum adalah datar dengan produktifitas tanah adalah baik /
            sedang dan keadaan wilayah bukan pantai.
          </p>
        </div>
        <div className="rounded-xl flex flex-col items-center w-full p-6 mx-auto my-6 space-y-6 bg-gray-200">
          <p className="w-full text-4xl font-semibold">Kondisi Demografis</p>

          {/* Container Dukuh */}
          <section className="md:grid-cols-3 grid w-full max-w-6xl grid-cols-1 gap-6 my-8">
            {dukuhData.map((dukuh, i) => (
              <InfoCardGroup key={i} name={dukuh.name} stats={dukuh.stats} />
            ))}
          </section>
        </div>
        {/* Section Persebaran */}
        <div className="grid w-full grid-cols-2 gap-8 mt-8">
          <ListStatCard title="Persebaran Agama" items={agamaData} />
          <ListStatCard title="Persebaran Profesi" items={profesiData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelayangPandangPage;
