"use client";
import React from "react";
import { useAnimatedNumber } from "@/components/AnimatedNumber/useAnimatedNumber";
import { useIsInViewport } from "@/components/AnimatedNumber/useIsInViewport";
import PetaDesa from "@/components/Map/PetaDesa";
import PrimaryLinkButton from "@/components/button/primary_button";
const SelayangPandang = () => {
  const { ref, isIntersecting } = useIsInViewport({
    threshold: 0.2, // Trigger ketika 10% element terlihat
  });

  // Gunakan hook untuk masing-masing nilai
  const dusunCount = useAnimatedNumber(3, 2000, isIntersecting);
  const rwCount = useAnimatedNumber(9, 2000, isIntersecting);
  const rtCount = useAnimatedNumber(40, 2000, isIntersecting);
  const kkCount = useAnimatedNumber(2126, 2000, isIntersecting);
  return (
    <div className="bg-[#0E4D45]  py-12 px-24 w-full flex flex-col">
      <div className=" flex justify-between">
        <p className="text-4xl font-bold text-white">Selayang Pandang</p>
        <p className="w-2/5 text-end text-[#fafafa]">
          Kenali Desa Jatiguwi di Selayang Pandang! Temukan sekilas info menarik
          tentang sejarah dan potensi desa kami. Yuk, kenali lebih dekat!{" "}
        </p>
      </div>
      <div className="my-5 w-full h-[1px] bg-[#fafafa]"></div>
      <div className="max-w-360 flex flex-col gap-8 mx-auto">
        <div className="flex flex-col w-full py-8 space-y-8">
          <PetaDesa />
          <div className="w-full max-w-6xl mx-auto">
            <PrimaryLinkButton
              text="Lihat Detail Selayang Pandang"
              href="/selayang-pandang"
              key={"Button Profil Desa"}
              className="w-full border-2 border-[#fafafa] hover:bg-[#fafafa] hover:text-[#0E4D45] hover:ease-in-out hover:duration-300"
            />
          </div>
        </div>
        <div className="flex flex-col py-8 space-y-6">
          <p className=" w-full text-4xl font-semibold text-white">
            Kondisi Geografis
          </p>
          <p className=" w-full text-xl text-white">
            Desa Jatiguwi terletak sekitar ± 30 km di sebelah selatan Kabupaten
            Malang. Desa Jatiguwi memiliki luas wilayah seluruhnya 459,763 ha.
            Dengan luas sawah 260,502 ha, luas Tanah Tegalan   49.293 ha, Luas
            Tanah Pemukiman 20,966 ha, Luas Tanah Setengah Teknis 16,195 ha dan
            lain-Lain 112,807 ha.
          </p>
          <ul className="pl-6 space-y-1 text-lg text-white list-disc list-inside">
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
        <div className="flex flex-col py-8 space-y-6">
          <p className=" w-full text-4xl font-semibold text-white">
            Kondisi Topografis
          </p>
          <p className=" w-full text-xl text-white">
            Desa Jatiguwi dengan ketinggian tanah rata- rata 295 M diatas
            permukaan laut, merupakan daerah dataran rendah, dengan curah hujan
            rata – rata 22 mm/th. Bentuk permukaan tanah di Desa Jatiguwi 
            secara umum adalah datar dengan produktifitas tanah adalah baik /
            sedang dan keadaan wilayah bukan pantai.
          </p>
        </div>
        <div className="flex flex-col space-y-12">
          <p className="w-full text-4xl font-semibold text-white">
            Kondisi Demografis
          </p>
          <div ref={ref} className="relative w-full pb-40">
            <img
              className="md:size-12 absolute bottom-0 left-0 z-0"
              src="img/bulat2.png"
              alt="Decoration"
            />
            <img
              className="md:size-12 absolute top-0 right-0 rotate-180"
              src="img/bulat2.png"
              alt="Decoration"
            />
            <div className="2xl:w-auto max-w-360 place-items-center grid grid-cols-4 gap-4 mx-auto">
              <div className="rounded-4xl size-30 2xl:size-36 content-center p-4 text-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45">
                  <p className="text-4xl font-bold text-[#0E4D45]">
                    {dusunCount}
                  </p>
                  <p className="text-2xl text-[#0E4D45]">Dusun</p>
                </div>
              </div>
              <div className="rounded-4xl size-30 2xl:size-36 content-center p-4 text-center transform rotate-45 translate-y-24 bg-white">
                <div className="flex flex-col -rotate-45">
                  <p className="text-4xl font-bold text-[#0E4D45]">{rwCount}</p>
                  <p className="text-[#0E4D45] text-2xl">RW</p>
                </div>
              </div>
              <div className="rounded-4xl size-30 2xl:size-36 content-center p-4 text-center transform rotate-45 bg-white">
                <div className="flex flex-col -rotate-45">
                  <p className="text-4xl font-bold text-[#0E4D45]">{rtCount}</p>
                  <p className="text-[#0E4D45] text-2xl">RT</p>
                </div>
              </div>
              <div className="rounded-4xl size-30 2xl:size-36 content-center p-4 text-center transform rotate-45 translate-y-24 bg-white">
                <div className="flex flex-col -rotate-45">
                  <p className="text-4xl font-bold text-[#0E4D45]">{kkCount}</p>
                  <p className="text-[#0E4D45] text-2xl">KK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelayangPandang;
