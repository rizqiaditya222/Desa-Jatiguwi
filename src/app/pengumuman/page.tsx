'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/landing_page/navbar/page';
import Footer from '@/components/landing_page/footer/page';

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