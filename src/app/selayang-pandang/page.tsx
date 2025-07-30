"use client";
import React from "react";
import Navbar from "@/components/landing_page/navbar/page";
import { useAuth } from "@/app/auth/context/AuthContext";
import PetaDesa from "@/components/Map/PetaDesa";
import Footer from "@/components/landing_page/footer/page";
import PrimaryLinkButton from "@/components/button/primary_button";
const SelayangPandangPage = () => {
  const { user } = useAuth();
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
        <div className="py-8 space-y-6">
          <h1 className="font-bold text-[#0E4D45] text-2xl justify-center text-center">
            Penggunaan Lahan
          </h1>
          <div className="grid grid-cols-4 gap-4 content-evenly mx-auto  max-w-6xl text-[#0E4D45]">
            <div className="flex flex-col items-center text-center w-full p-4 space-y-4 bg-[#1f4a0525] border-2 rounded-2xl">
              <h1 className="text-2xl font-semibold">sawah</h1>
              <p className="text-3xl font-bold">260,502 ha</p>
            </div>
            <div className="flex flex-col items-center text-center w-full p-4 space-y-4 bg-[#1f4a0525] border-2 rounded-2xl">
              <h1 className="text-2xl font-semibold">Tegalan</h1>
              <p className="text-3xl font-bold">49,293 ha</p>
            </div>
            <div className="flex flex-col items-center text-center w-full p-4 space-y-4 bg-[#1f4a0525] border-2 rounded-2xl">
              <h1 className="text-2xl font-semibold">Setengah Teknik</h1>
              <p className="text-3xl font-bold">16,195 ha</p>
            </div>
            <div className="flex flex-col items-center text-center w-full p-4 space-y-4 bg-[#1f4a0525] border-2 rounded-2xl">
              <h1 className="text-2xl font-semibold">Lain-lain</h1>
              <p className="text-3xl font-bold">49.293 ha</p>
            </div>
          </div>
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
            {/* Dukuh 1 */}
            <div className="rounded-xl flex flex-col w-full p-8  text-center bg-white text-[#0E4D45] shadow-md mx-auto">
              <h1 className="mb-4 text-2xl font-semibold">Dukuh Jatimulyo</h1>
              <div className=" grid w-full grid-cols-2 gap-2">
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45] bg-[#D2E0C6]">
                  <h1 className="text-2xl font-bold">1</h1>
                  <p className="text-lg font-semibold">RW</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45]">
                  <h1 className="text-2xl font-bold">5</h1>
                  <p className="text-lg font-semibold">RT</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45]">
                  <h1 className="text-2xl font-bold">306</h1>
                  <p className="text-lg font-semibold">KK</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45] bg-[#D2E0C6]">
                  <h1 className="text-2xl font-bold">1150</h1>
                  <p className="text-lg font-semibold">JIWA</p>
                </div>
              </div>
            </div>

            {/* Dukuh 2 */}
            <div className="rounded-xl flex flex-col w-full p-8  text-center bg-white text-[#0E4D45] shadow-md mx-auto">
              <h1 className="mb-4 text-2xl font-semibold">Dukuh Mentaraman</h1>
              <div className=" grid w-full grid-cols-2 gap-2">
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45] bg-[#D2E0C6]">
                  <h1 className="text-2xl font-bold">6</h1>
                  <p className="text-lg font-semibold">RW</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45]">
                  <h1 className="text-2xl font-bold">25</h1>
                  <p className="text-lg font-semibold">RT</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45]">
                  <h1 className="text-2xl font-bold">1365</h1>
                  <p className="text-lg font-semibold">KK</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45] bg-[#D2E0C6]">
                  <h1 className="text-2xl font-bold">6303</h1>
                  <p className="text-lg font-semibold">JIWA</p>
                </div>
              </div>
            </div>

            {/* Dukuh 3 */}
            <div className="rounded-xl flex flex-col w-full p-8  text-center bg-white text-[#0E4D45] shadow-md mx-auto">
              <h1 className="mb-4 text-2xl font-semibold">Dukuh Krajan</h1>
              <div className=" grid w-full grid-cols-2 gap-2">
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45] bg-[#D2E0C6]">
                  <h1 className="text-2xl font-bold">2</h1>
                  <p className="text-lg font-semibold">RW</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45]">
                  <h1 className="text-2xl font-bold">10</h1>
                  <p className="text-lg font-semibold">RT</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45]">
                  <h1 className="text-2xl font-bold">455</h1>
                  <p className="text-lg font-semibold">KK</p>
                </div>
                <div className="p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45] bg-[#D2E0C6]">
                  <h1 className="text-2xl font-bold">1256</h1>
                  <p className="text-lg font-semibold">JIWA</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="grid w-full grid-cols-2 gap-8">
          <div className="w-full flex flex-col items-center p-8 border border-[#0E4D45] bg-gray-200 rounded-xl text-[#0E4D45] shadow-md">
            <h1 className="mb-6 text-3xl font-semibold">Persebaran Agama</h1>

            <div className="w-full max-w-2xl space-y-4">
              {/* Islam */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Islam</p>
                <p className="text-xl font-semibold">6.000</p>
              </div>

              {/* Kristen */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Kristen</p>
                <p className="text-xl font-semibold">300</p>
              </div>

              {/* Katolik */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Katolik</p>
                <p className="text-xl font-semibold">150</p>
              </div>

              {/* Hindu */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Hindu</p>
                <p className="text-xl font-semibold">120</p>
              </div>

              {/* Buddha */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Buddha</p>
                <p className="text-xl font-semibold">80</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center p-8 border border-[#0E4D45] bg-gray-200 rounded-xl text-[#0E4D45]  shadow-md">
            <h1 className="mb-6 text-3xl font-semibold">Persebaran Profesi</h1>

            <div className=" w-full max-w-2xl space-y-4">
              {/* Islam */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Petani</p>
                <p className="text-xl font-semibold">6.000</p>
              </div>

              {/* Kristen */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Buruh Tani</p>
                <p className="text-xl font-semibold">300</p>
              </div>

              {/* Katolik */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Wiraswasta/dagang</p>
                <p className="text-xl font-semibold">150</p>
              </div>

              {/* Hindu */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Pegawai Negeri Sipil</p>
                <p className="text-xl font-semibold">120</p>
              </div>

              {/* Buddha */}
              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">ABRI/TNI/POLRI</p>
                <p className="text-xl font-semibold">80</p>
              </div>

              <div className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30">
                <p className="text-xl font-medium">Lainnya</p>
                <p className="text-xl font-semibold">80</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelayangPandangPage;
