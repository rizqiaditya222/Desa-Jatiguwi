'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Galeri = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderRef, setSliderRef] = useState<any>(null);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const images = [
    { src: '/img/gambar1.jpeg', title: 'Upacara Adat Desa Jatiguwi' },
    { src: '/img/gambar2.jpeg', title: 'Kegiatan Kerja Bakti Warga' },
    { src: '/img/gambar3.jpeg', title: 'Festival Budaya Tahunan' },
    { src: '/img/gambar4.jpeg', title: 'Pemandangan Sawah Desa' },
    { src: '/img/gambar5.jpeg', title: 'Gotong Royong Membangun Jalan' },
  ];

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(images[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="bg-white px-6 md:px-24 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <p className="text-3xl font-bold text-[#0E4D45] mb-4 md:mb-0">Galeri Jatiguwi</p>
        <p className="text-base text-end text-[#0E4D45] md:w-4/12">
          Intip Cerita Desa Jatiguwi di Galeri! Kumpulan momen dan potret kehidupan desa yang penuh makna, semua tersaji di sini.
        </p>
      </div>
      <hr className="border-[#0E4D45] border-t-2 mb-6" />

      {/* Slider */}
      <div className="relative">
        <Slider ref={setSliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index} className="px-2">
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredSlide(index)}
                onMouseLeave={() => setHoveredSlide(null)}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className={`rounded-lg shadow-lg object-cover h-[250px] w-full transition-all duration-300 ${
                    index === activeSlide ? 'scale-110 z-10' : 'scale-90 opacity-60'
                  } ${hoveredSlide === index && index === activeSlide ? 'blur-sm' : ''}`}
                />

                {/* Hover Overlay */}
                {hoveredSlide === index && index === activeSlide && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 rounded-lg">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-white mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-white text-xl font-semibold">Preview</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>

        {/* Navigasi Panah */}
        <div className="flex justify-center items-center gap-12 mt-8">
          <button onClick={() => sliderRef?.slickPrev()}>
            <img
              src="/img/arrow-left.png"
              alt="Sebelumnya"
              className="h-15 w-15 hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={() => sliderRef?.slickNext()}>
            <img
              src="/img/arrow-right.png"
              alt="Berikutnya"
              className="h-15 w-15 hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-80 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {/* Tombol Tutup */}
            <button className="absolute -top-12 right-0 text-grey hover:text-gray-500 transition-colors" onClick={closeModal}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Konten Gambar */}
            <div className="bg-transparent rounded-lg overflow-hidden shadow-2xl flex flex-col items-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <p className="mt-4 text-white text-2xl font-semibold text-center"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
                {selectedImage.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeri;
