'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { type CustomArrowProps } from 'react-slick';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const CustomPrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-400 rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <span className="text-3xl text-gray-700">{'<'}</span>
    </div>
  );
};

const CustomNextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-400 rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <span className="text-3xl text-gray-700">{'>'}</span>
    </div>
  );
};

const Galeri = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_current: number, next: number) => setActiveSlide(next),
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

  const images = [
    '/img/gambar1.jpeg',
    '/img/gambar2.jpeg',
    '/img/gambar3.jpeg',
    '/img/gambar4.jpeg',
    '/img/gambar5.jpeg',
  ];

  return (
    <div className="bg-white px-24 py-16">
      <div className="flex justify-between items-start mb-6">
        <p className="text-3xl font-bold text-[#0E4D45]">Galeri Jatiguwi</p>
        <p className="text-base text-end text-[#0E4D45] w-4/12">
          Intip Cerita Desa Jatiguwi di Galeri! Kumpulan momen dan potret kehidupan desa yang penuh makna, semua tersaji di sini.
        </p>
      </div>
      <hr className="border-[#0E4D45] border-t-2 mb-6" />

      <div className="relative">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="px-2">
              <img
                src={src}
                alt={`Foto Galeri ${index + 1}`}
                className={`rounded-lg shadow-lg object-cover h-[250px] w-full transition-transform duration-300
                  ${index === activeSlide ? 'scale-110 z-10' : 'scale-90 opacity-60'}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Galeri;
