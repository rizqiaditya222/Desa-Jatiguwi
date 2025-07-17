import React from "react";

const SelayangPandang = () => {
  return (
    <div className="bg-[#0E4D45]  p-12 space-y-10 w-full flex flex-col ">
      <div className="flex justify-between ">
        <p className="text-4xl font-bold text-white">Selayang Pandang</p>
        <p className="w-2/5 text-end text-[#fafafa]">
          Kenali Desa Jatiguwi di Selayang Pandang! Temukan sekilas info menarik
          tentang sejarah dan potensi desa kami. Yuk, kenali lebih dekat!{" "}
        </p>
      </div>
      <div className="my-5 w-full h-[1px] bg-[#fafafa]"></div>
      <div className="flex flex-col items-center w-full py-12">
        <img className="" src="img/perangkat_desa.png" alt="" />
      </div>
      <div className="flex flex-col space-y-6">
        <p className="w-full text-4xl font-semibold text-white ">
          Kondisi Geografis
        </p>
        <p className="w-full text-xl text-white ">
          Desa Jatiguwi terletak sekitar ± 30 km di sebelah selatan Kabupaten
          Malang. Desa Jatiguwi memiliki luas wilayah seluruhnya 459,763 ha.
          Dengan luas sawah 260,502 ha, luas Tanah Tegalan   49.293 ha, Luas
          Tanah Pemukiman 20,966 ha, Luas Tanah Setengah Teknis 16,195 ha dan
          lain-Lain 112,807 ha.
        </p>
        <ul className="pl-6 space-y-1 text-lg text-white list-disc list-inside">
          <li>
            <span className="inline-block font-semibold w-44">
              Sebelah Utara
            </span>
            : Desa Ngadirejo, Kec. Kromengan
          </li>
          <li>
            <span className="inline-block font-semibold w-44">
              Sebelah Timur
            </span>
            : Desa Sambigede, Kec. Sumberpucung
          </li>
          <li>
            <span className="inline-block font-semibold w-44">
              Sebelah Selatan
            </span>
            : Desa Kalipare, Kec. Kalipare
          </li>
          <li>
            <span className="inline-block font-semibold w-44">
              Sebelah Barat
            </span>
            : Desa Sumberpucung, Kec. Sumberpucung
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-6">
        <p className="w-full text-4xl font-semibold text-white ">
          Kondisi Topografis
        </p>
        <p className="w-full text-xl text-white ">
          Desa Jatiguwi dengan ketinggian tanah rata- rata 295 M diatas
          permukaan laut, merupakan daerah dataran rendah, dengan curah hujan
          rata – rata 22 mm/th. Bentuk permukaan tanah di Desa Jatiguwi  secara
          umum adalah datar dengan produktifitas tanah adalah baik / sedang dan
          keadaan wilayah bukan pantai.
        </p>
      </div>
      <div className="flex flex-col space-y-12">
        <p className="w-full text-4xl font-semibold text-white ">
          Kondisi Demografis
        </p>
        <div className="relative w-full pb-40 ">
          <img
            className="absolute bottom-0 left-0 z-0 md:size-12"
            src="img/bulat2.png"
            alt="Decoration"
          />
          <img
            className="absolute top-0 right-0 rotate-180 md:size-12"
            src="img/bulat2.png"
            alt="Decoration"
          />
          <div className="grid grid-cols-4 gap-4 mx-auto 2xl:w-360 place-items-center ">
            <div className="content-center p-4 text-center transform rotate-45 bg-white rounded-4xl size-36 2xl:size-48 ">
              <div className="flex flex-col -rotate-45 ">
                <p className="text-4xl font-bold text-[#0E4D45]">3</p>
                <p className="text-2xl text-[#0E4D45]">Dusun</p>
              </div>
            </div>
            <div className="content-center p-4 text-center transform rotate-45 translate-y-24 bg-white rounded-4xl size-36 2xl:size-48 ">
              <div className="flex flex-col -rotate-45 ">
                <p className="text-4xl font-bold text-[#0E4D45]">9</p>
                <p className="text-[#0E4D45] text-2xl">RW</p>
              </div>
            </div>
            <div className="content-center p-4 text-center transform rotate-45 bg-white rounded-4xl size-36 2xl:size-48">
              <div className="flex flex-col -rotate-45">
                <p className="text-4xl font-bold text-[#0E4D45]">40</p>
                <p className="text-[#0E4D45] text-2xl ">RT</p>
              </div>
            </div>
            <div className="content-center p-4 text-center transform rotate-45 translate-y-24 bg-white rounded-4xl size-36 2xl:size-48 ">
              <div className="flex flex-col -rotate-45">
                <p className="text-4xl font-bold text-[#0E4D45]">2126</p>
                <p className="text-[#0E4D45] text-2xl">KK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelayangPandang;
