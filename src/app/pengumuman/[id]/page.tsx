'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/landing_page/navbar/page';
import Footer from '@/components/landing_page/footer/page';

const dummyData = [
  {
    id: '1',
    judul: 'Acara Bersih Desa Jatiguwi yang Ke - 85 di Makam Mbah Bodho',
    konten: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum et libero in laoreet. Curabitur justo leo, semper eu suscipit et, imperdiet et ipsum. Sed eu lacinia enim, dignissim tincidunt augue. Praesent at massa ut sapien aliquam tincidunt. Aliquam maximus felis eu cursus facilisis. Donec non libero dapibus, cursus purus vel, facilisis urna. Nullam non cursus lacus. Ut sodales suscipit orci, in posuere metus volutpat in. Curabitur rhoncus, ante eget vulputate finibus, quam nibh efficitur libero, non ultrices dui felis non est. Phasellus cursus luctus nibh, in fermentum metus convallis nec. Nullam hendrerit ligula nec neque fermentum vestibulum. Mauris eget arcu mauris. Vivamus mi erat, eleifend et diam non, gravida imperdiet risus. Curabitur auctor commodo diam id posuere. Pellentesque sit amet mauris vitae libero vehicula fermentum. Cras sem dui, dignissim eget felis et, dapibus tristique nunc.

Quisque maximus felis et accumsan tincidunt. Phasellus non risus sed ipsum interdum malesuada. Duis euismod vel est non mattis. Phasellus nec neque viverra, semper odio ac, posuere purus. Quisque ex neque, feugiat non facilisis vel, posuere at mi. Nullam at felis non dui interdum luctus. Proin vitae pellentesque nulla. Cras aliquet nisl a purus egestas tincidunt ut non urna. Sed ultrices ullamcorper consectetur. Nulla sem urna, condimentum nec ante in, egestas auctor eros.

Etiam nec vehicula mauris, at euismod dui. Morbi dapibus gravida ante id consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent pulvinar ullamcorper leo, et malesuada felis fermentum eu. Sed suscipit malesuada mauris ut sodales. Cras porttitor lacus in lorem dignissim, imperdiet sodales metus euismod. Nullam id consequat nibh. Quisque ut leo consequat lacus luctus sagittis. Praesent porttitor iaculis lectus sed lacinia. Nam condimentum sem in fermentum imperdiet.`,
    gambar: '/img/makam.JPG',
    createdAt: new Date('2025-07-03'),
    penulis: 'MMD Jatiguwi',
    category: 'Acara Bersih Desa Jatiguwi'
  },
  {
    id: '2',
    judul: 'Pengumuman Uji Coba',
    konten: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    gambar: 'https://via.placeholder.com/600x300',
    createdAt: new Date('2025-07-14'),
    penulis: 'Admin Desa',
    category: 'Pengumuman'
  },
  {
    id: '3',
    judul: 'Pengumuman Uji Coba',
    konten: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    gambar: 'https://via.placeholder.com/600x300',
    createdAt: new Date('2025-07-14'),
    penulis: 'Bidang Kesehatan',
    category: 'Pengumuman'
  },
];

const PengumumanDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const currentId = Array.isArray(id) ? id[0] : id;
  const announcement = dummyData.find((item) => item.id === currentId);
  const otherAnnouncements = dummyData.filter((item) => item.id !== currentId).slice(0, 2);

  if (!announcement) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pengumuman tidak ditemukan
          </h1>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: announcement.judul,
        text: announcement.konten.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin ke clipboard!');
    }
  };

  return (
    
    <div className="bg-gray-50 min-h-screen">
        <Navbar isLoggedIn={false}/>
      

      {/* Breadcrumb */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/dashboard" className="hover:text-teal-600">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/dashboard/pengumuman" className="hover:text-teal-600">Pengumuman</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{announcement.category}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {announcement.judul}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base">👤</span>
                    <span>{announcement.penulis}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">📅</span>
                    <span>
                      {announcement.createdAt.toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    <span className="text-base">📤</span>
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="px-6">
                <img 
                  src={announcement.gambar} 
                  alt={announcement.judul}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  {announcement.konten.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Footer Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Dibuat pada {announcement.createdAt.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} | Diperbaharui pada {announcement.createdAt.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Pengumuman Lainnya</h2>
              <hr className="border-[#0E4D45] border-t-2 mb-6" />
              <div className="space-y-4">
                {otherAnnouncements.map((item) => (
                  <Link 
                    key={item.id}
                    href={`/dashboard/pengumuman/${item.id}`}
                    className="block group"
                  >
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-teal-600 mb-2">
                            {item.judul}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                            {item.konten}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>📅</span>
                            <span>
                              {item.createdAt.toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <span className="text-gray-400 group-hover:text-teal-600 ml-2 flex-shrink-0 text-lg">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PengumumanDetail;