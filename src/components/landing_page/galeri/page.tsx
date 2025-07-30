"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { listGallery } from "@/service/gallery/galleryService";
import { Gallery } from "@/types/gallery";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const CustomArrow = ({
  onClick,
  direction,
}: {
  onClick?: () => void;
  direction: "left" | "right";
}) => (
  <button
    onClick={onClick}
    className="hover:scale-110 z-20 transition-transform"
  >
    <img
      src={`/img/arrow-${direction}.png`}
      alt={direction === "left" ? "Sebelumnya" : "Berikutnya"}
      className="h-15 w-15"
    />
  </button>
);
const Galeri = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [images, setImages] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const fetchedImages = await listGallery();
        setImages(fetchedImages);
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
        setError("Failed to load gallery images. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
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
          arrows: false,
        },
      },
    ],
  };

  const handleImageClick = (image: Gallery) => {
    setSelectedImage({ src: image.imageUrl, title: image.title });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#0E4D45] text-xl">Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#0E4D45] text-xl">
          No gallery images available yet.
        </p>
      </div>
    );
  }

  return (
    <section className="md:px-24 px-6 py-16 " id="gallery-section">
      {/* Header */}
      <div className="md:flex-row flex flex-col items-start justify-between mb-6">
        <p className="text-3xl font-bold text-[#0E4D45] mb-4 md:mb-0">
          Galeri Jatiguwi
        </p>
        <p className="text-base text-end text-[#0E4D45] md:w-4/12">
          Intip Cerita Desa Jatiguwi di Galeri! Kumpulan momen dan potret
          kehidupan desa yang penuh makna, semua tersaji di sini.
        </p>
      </div>
      <hr className="border-[#0E4D45] border-t-2 mb-6" />

      <div className="relative">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={image.id} className="px-2">
              <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredSlide(index)}
                onMouseLeave={() => setHoveredSlide(null)}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className={`rounded-lg shadow-lg object-cover h-[250px] w-full transition-all duration-300 ${
                    index === activeSlide
                      ? "scale-110 z-10"
                      : "scale-90 opacity-60"
                  } ${
                    hoveredSlide === index && index === activeSlide
                      ? "blur-sm brightness-70"
                      : ""
                  }`}
                />

                {hoveredSlide === index && index === activeSlide && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 mb-2 text-white"
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
                      {/* Changed from static "Preview" to dynamic image.title */}
                      <span className="px-2 text-xl font-semibold text-center text-white">
                        {image.title}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="bg-black/60 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              className="-top-12 hover:text-gray-500 absolute right-0 text-gray-400 transition-colors"
              onClick={closeModal}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Konten Gambar */}
            <div className="bg-transparent rounded-lg">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
              />
              <p
                className="mt-4 text-2xl font-semibold text-center text-white"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.7)" }}
              >
                {selectedImage.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeri;
