import React from "react";

const Sejarah = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0E4D45] text-center md:text-left">
          Sejarah
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#0E4D45] text-center md:text-right md:w-2/5 lg:w-1/2 xl:w-2/5 leading-relaxed">
          Pelajari asal-usul dan perjalanan panjang Desa Jatiguwi dari masa ke
          masa. Semua dimulai dari sini — kisah yang membentuk identitas kami
          hari ini.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#0E4D45] mb-6 sm:mb-8 md:mb-12"></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Mobile Layout - Stacked */}
        <div className="block lg:hidden">
          {/* Image Section - Mobile */}
          <div className="mb-6 sm:mb-8 text-center"> {/* Added text-center here */}
            <img
              src="/img/sejarah-jatiguwi.jpg"
              alt="Balai Desa Jatiguwi"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Text Content - Mobile */}
          <div className="text-[#333] text-sm sm:text-base md:text-lg leading-relaxed text-justify space-y-4 sm:space-y-6">
            <p>
              Pada jaman dahulu kala ada suatu kawasan yang banyak ditumbuhi{" "}
              <span className="font-semibold text-[#0E4D45]">pohon jati</span>, diantara pohon jati yang tumbuh tersebut ada sebuah
              pohon Jati yang sangat besar tumbuh di suatu tempat yang letaknya
              sangat strategis di mana tempat tersebut menjadi tempat melintasnya
              lalu lalang penduduk antar kawasan.
            </p>
            <p>
              Pohon jati tersebut tergolong sangat langka dan istimewa. Langka karena ukurannya yang besar dan
              istimewa karena batang pohon jati tersebut berlobang cukup besar,
              dalam istilah Jawa biasa disebut <span className="font-semibold text-[#0E4D45]">Growong</span>.
            </p>
            <p>
              Pada suatu ketika pemerintah hindia Belanda membangun penjara (Bui) dan membutuhkan
              bahan kayu Jati. Kayu Jati di kawasan itu kemudian ditebangi untuk
              memasok bangunan Bui, karena sangat terkenalnya bahwa kayu Jati untuk
              Bui itu, lama-kelamaan kawasan itu biasa disebut "Jatibui" dan si
              kawasan itu sebutannya menjadi <span className="font-semibold text-[#0E4D45]">JATIGUWI</span>.
            </p>
            <p>
              Sudah menjadi kebiasaan masyarakat Jawa bahwa untuk memberi nama sesuatu tempat
              selalu diambilkan dari hal yang luar biasa. Demikian juga nama yang
              terjadi pada kawasan sekitar jati Growang tersebut dinamai{" "}
              <span className="font-semibold text-[#0E4D45]">JATIGUWI</span>.
            </p>
            <p>
              Karena letaknya yang strategis berada pada daerah
              perlintasan warga antar kawasan yang ada, maka lama kelamaan kawasan
              tersebut menjadi suatu kawasan yang banyak ditinggali penduduk dan
              menjadi kawasan yang cukup ramai.
            </p>
            <div className="bg-[#0E4D45]/5 p-4 sm:p-6 rounded-lg border-l-4 border-[#0E4D45]">
              <p className="font-semibold text-[#0E4D45] mb-2">Wilayah Jatiguwi meliputi:</p>
              <ul className="list-disc list-inside text-[#333] space-y-1">
                <li>Krajan</li>
                <li>Mentaraman</li>
                <li>Jatimulyo (Kebon Klopo)</li>
                <li>Singodrono</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Text with Floating Image */}
        <div className="hidden lg:block">
          <div className="text-[#333] text-lg xl:text-xl leading-relaxed text-justify">
            {/* Floating Image - Desktop */}
            <img
              src="/img/sejarah-jatiguwi.jpg"
              alt="Balai Desa Jatiguwi"
              className="float-right w-80 xl:w-96 2xl:w-[450px] ml-6 xl:ml-8 mb-6 rounded-lg shadow-lg object-cover"
            />

            {/* Main Text Content - Desktop */}
            <p className="mb-6">
              Pada jaman dahulu kala ada suatu kawasan yang banyak ditumbuhi{" "}
              <span className="font-semibold text-[#0E4D45]">pohon jati</span>, diantara pohon jati yang tumbuh tersebut ada sebuah
              pohon Jati yang sangat besar tumbuh di suatu tempat yang letaknya
              sangat strategis di mana tempat tersebut menjadi tempat melintasnya
              lalu lalang penduduk antar kawasan. Pohon jati tersebut tergolong
              sangat langka dan istimewa. Langka karena ukurannya yang besar dan
              istimewa karena batang pohon jati tersebut berlobang cukup besar,
              dalam istilah Jawa biasa disebut <span className="font-semibold text-[#0E4D45]">Growong</span>.
            </p>
            <p className="mb-6">
              Pada suatu ketika pemerintah hindia Belanda membangun penjara (Bui) dan membutuhkan
              bahan kayu Jati. Kayu Jati di kawasan itu kemudian ditebangi untuk
              memasok bangunan Bui, karena sangat terkenalnya bahwa kayu Jati untuk
              Bui itu, lama-kelamaan kawasan itu biasa disebut "Jatibui" dan si
              kawasan itu sebutannya menjadi <span className="font-semibold text-[#0E4D45]">JATIGUWI</span>.
            </p>
            <p className="mb-6">
              Sudah menjadi kebiasaan masyarakat Jawa bahwa untuk memberi nama sesuatu tempat
              selalu diambilkan dari hal yang luar biasa. Demikian juga nama yang
              terjadi pada kawasan sekitar jati Growang tersebut dinamai{" "}
              <span className="font-semibold text-[#0E4D45]">JATIGUWI</span>.
            </p>
            <p className="mb-6">
              Karena letaknya yang strategis berada pada daerah
              perlintasan warga antar kawasan yang ada, maka lama kelamaan kawasan
              tersebut menjadi suatu kawasan yang banyak ditinggali penduduk dan
              menjadi kawasan yang cukup ramai.
            </p>
            {/* Clear float and add highlighted section */}
            <div className="clear-both mt-8">
              <div className="bg-[#0E4D45]/5 p-6 xl:p-8 rounded-lg border-l-4 border-[#0E4D45]">
                <p className="font-semibold text-[#0E4D45] text-xl xl:text-2xl mb-4">Wilayah Jatiguwi meliputi:</p>
                <ul className="list-disc list-inside text-[#333] text-lg xl:text-xl space-y-2 ml-4">
                  <li>Krajan</li>
                  <li>Mentaraman</li>
                  <li>Jatimulyo (Kebon Klopo)</li>
                  <li>Singodrono</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sejarah;