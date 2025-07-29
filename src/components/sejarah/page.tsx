import React from 'react';

const Sejarah = () => {
  return (
    <div className="bg-[#f5fdfc] px-24 py-16">
      {/* Header */}
      <div className="w-full flex justify-between items-start">
        <p className="font-bold text-4xl text-[#0E4D45]">Sejarah</p>
        <p className="w-2/5 text-end text-[#0E4D45] text-base">
          Pelajari asal-usul dan perjalanan panjang Desa Jatiguwi dari masa ke masa.
          Semua dimulai dari sini — kisah yang membentuk identitas kami hari ini.
        </p>
      </div>

      {/* Divider */}
      <div className="my-5 w-full h-[1px] bg-[#0E4D45] opacity-30"></div>

      {/* Konten utama */}
      <div className="text-[#333] text-xl leading-relaxed text-justify">
        {/* Gambar dengan float */}
        <img
          src="/img/sejarah-jatiguwi.jpg"
          alt="Balai Desa Jatiguwi"
          className="float-right w-[450px] max-w-full ml-6 mb-4 rounded-lg shadow-lg object-cover"
        />

        {/* Teks langsung tanpa div pembungkus */}
        <p>
          Pada jaman dahulu kala ada suatu kawasan yang banyak ditumbuhi <b>pohon jati</b>, diantara pohon jati yang tumbuh tersebut ada sebuah pohon Jati yang sangat besar tumbuh di suatu tempat yang letaknya sangat strategis di mana tempat tersebut menjadi tempat melintasnya lalu lalang penduduk antar kawasan. Pohon jati tersebut tergolong sangat langka dan istimewa. Langka karena ukurannya yang besar dan istimewa karena batang pohon jati tersebut berlobang cukup besar, dalam istilah Jawa biasa disebut <b>Growong</b>. pada suatu ketika pemerintah hindia Belanda membangun penjara (Bui) dan membutuhkan bahan kayu Jati. Kayu Jati di kawasan itu kemudian ditebangi untuk memasok bangunan Bui, karena sangat terkenalnya bahwa kayu Jati untuk Bui itu, lama-kelamaan kawasan itu biasa disebut ”Jatibui” dan si kawasan itu sebutannya menjadi <b>JATIGUWI</b>. Sudah menjadi kebiasaan masyarakat Jawa bahwa untuk memberi nama sesuatu tempat selalu diambilkan dari hal yang luar biasa. Demikian juga nama yang terjadi pada kawasan sekitar jati Growang tersebut dinamai <b>JATIGUWI</b>. Karena letaknya yang strategis berada pada daerah perlintasan warga antar kawasan yang ada, maka lama kelamaan kawasan tersebut menjadi suatu kawasan yang banyak ditinggali penduduk dan menjadi kawasan yang cukup ramai. Wilayah Jatiguwi meliputi : Krajan, Mentaraman, Jatimulyo (Kebon Klopo), Singodrono.
        </p>
      </div>
    </div>
  );
};

export default Sejarah;
