"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/landing_page/navbar/page";
import { useAuth } from "@/app/auth/context/AuthContext";
import PetaDesa from "@/components/Map/PetaDesa";
import Footer from "@/components/landing_page/footer/page";
import InfoCardGroup from "../../components/selayang-pandang/infocardgroup";
import ListStatCard from "../../components/selayang-pandang/liststatcard";
import WilayahLahanCard from "../../components/selayang-pandang/wilayahlahancard";
import {
  fetchDemografis,
  fetchAgama,
  fetchProfesi,
  fetchLahan,
} from "@/service/selayang-pandang/selayangPandandService";

// Types
interface DukuhStats {
  title: string;
  value: number;
  bg?: boolean;
}

interface DukuhData {
  name: string;
  stats: DukuhStats[];
}

interface StatItem {
  label: string;
  value: number;
}

interface WilayahLahanItem {
  label: string;
  value: number;
  satuan: string;
}

const SelayangPandangPage = () => {
  const { user } = useAuth();

  // State untuk data dari Firebase
  const [dukuhData, setDukuhData] = useState<DukuhData[]>([]);
  const [agamaData, setAgamaData] = useState<StatItem[]>([]);
  const [profesiData, setProfesiData] = useState<StatItem[]>([]);
  const [wilayahLahanData, setWilayahLahanData] = useState<WilayahLahanItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch semua data secara paralel
        const [demografisData, agamaFetch, profesiFetch, lahanFetch] =
          await Promise.all([
            fetchDemografis(),
            fetchAgama(),
            fetchProfesi(),
            fetchLahan(),
          ]);

        // Transform demografis data ke format dukuhData
        const transformedDukuhData: DukuhData[] = demografisData.map(
          (item) => ({
            name: item.nama,
            stats: [
              { title: "RW", value: item.rw, bg: true },
              { title: "RT", value: item.rt },
              { title: "KK", value: item.kk },
              { title: "JIWA", value: item.jiwa, bg: true },
            ],
          })
        );

        // Transform agama data
        const transformedAgamaData: StatItem[] = agamaFetch.map((item) => ({
          label: item.agama,
          value: item.jumlah,
        }));

        // Transform profesi data
        const transformedProfesiData: StatItem[] = profesiFetch.map((item) => ({
          label: item.nama,
          value: item.jumlah,
        }));

        // Transform lahan data
        const transformedLahanData: WilayahLahanItem[] = lahanFetch.map(
          (item) => ({
            label: item.nama,
            value: item.luas,
            satuan: "Ha", // Asumsi satuan selalu Ha, bisa disesuaikan jika ada field satuan di database
          })
        );

        // Update state
        setDukuhData(transformedDukuhData);
        setAgamaData(transformedAgamaData);
        setProfesiData(transformedProfesiData);
        setWilayahLahanData(transformedLahanData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading data...</p>
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
    <div>
      <Navbar isLoggedIn={!!user} />
      <div className="flex flex-col w-full px-4 md:px-8 lg:px-24 py-6 text-[#0E4D45]">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          <p className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Selayang Pandang
          </p>
          {/* Changed text size to md:text-base for consistency with main body text */}
          <p className="text-base md:text-lg w-full md:w-2/5 text-center md:text-end">
            Kenali Desa Jatiguwi di Sela yang Pandang! Temukan sekilas info
            menarik tentang sejarah dan potensi desa kami. Yuk, kenali lebih
            dekat!{" "}
          </p>
        </div>
        <div className="my-5 w-full h-[1px] bg-[#0E4D45]"></div>
        <div className="max-w-full mx-auto">
          <div className="flex flex-col w-full py-8">
            <PetaDesa />
          </div>
          <div className="bg-rounded rounded-xl flex flex-col p-4 md:p-6 py-8 space-y-4 md:space-y-6 bg-gray-200">
            <p className="w-full text-2xl md:text-4xl font-semibold">
              Kondisi Geografis
            </p>
            {/* Changed text size to md:text-base for consistency */}
            <p className="w-full text-base md:text-lg">
              Desa Jatiguwi terletak sekitar &plusmn; 30 km di sebelah selatan
              Kabupaten Malang. Desa Jatiguwi memiliki luas wilayah seluruhnya
              459,763 ha. Dengan luas sawah 260,502 ha, luas Tanah Tegalan
              49.293 ha, Luas Tanah Pemukiman 20,966 ha, Luas Tanah Setengah
              Teknis 16,195 ha dan lain-Lain 112,807 ha.
            </p>
            {/* Changed text size to md:text-base for consistency */}
            <ul className="pl-6 space-y-1 text-base md:text-lg list-disc list-inside">
              <li>
                <span className="w-32 md:w-44 inline-block font-semibold">
                  Sebelah Utara
                </span>
                : Desa Ngadirejo, Kec. Kromengan
              </li>
              <li>
                <span className="w-32 md:w-44 inline-block font-semibold">
                  Sebelah Timur
                </span>
                : Desa Sambigede, Kec. Sumberpucung
              </li>
              <li>
                <span className="w-32 md:w-44 inline-block font-semibold">
                  Sebelah Selatan
                </span>
                : Desa Kalipare, Kec. Kalipare
              </li>
              <li>
                <span className="w-32 md:w-44 inline-block font-semibold">
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
          <div className="bg-rounded rounded-xl flex flex-col p-4 md:p-6 my-6 space-y-4 md:space-y-6 bg-gray-200">
            <p className="w-full text-2xl md:text-4xl font-semibold">
              Kondisi Topografis
            </p>
            {/* Changed text size to md:text-base for consistency */}
            <p className="w-full text-base md:text-lg">
              Desa Jatiguwi dengan ketinggian tanah rata- rata 295 M diatas
              permukaan laut, merupakan daerah dataran rendah, dengan curah
              hujan rata – rata 22 mm/th. Bentuk permukaan tanah di Desa
              Jatiguwi secara umum adalah datar dengan produktifitas tanah
              adalah baik / sedang dan keadaan wilayah bukan pantai.
            </p>
          </div>
          <div className="rounded-xl flex flex-col items-center w-full p-4 md:p-6 mx-auto my-6 space-y-4 md:space-y-6 bg-gray-200">
            <p className="w-full text-2xl md:text-4xl font-semibold text-center md:text-left">
              Kondisi Demografis
            </p>

            {/* Container Dukuh */}
            <section className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 md:my-8">
              {dukuhData.map((dukuh, i) => (
                <InfoCardGroup key={i} name={dukuh.name} stats={dukuh.stats} />
              ))}
            </section>
          </div>
          {/* Section Persebaran */}
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <ListStatCard title="Persebaran Agama" items={agamaData} />
            <ListStatCard title="Persebaran Profesi" items={profesiData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelayangPandangPage;