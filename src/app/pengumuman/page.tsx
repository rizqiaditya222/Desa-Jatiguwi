'use client'

import React, { useState } from 'react'
import Navbar from '@/components/landing_page/navbar/page'
import Footer from '@/components/landing_page/footer/page'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Dummy data pengumuman
const dummyPengumuman = [
  {
    id: 1,
    kategori: 'Penting',
    judul: 'Acara Bersih Desa Jatiguwi yang Ke - 85 di Makam Mbah Bodho',
    isi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    tanggal: 'Selasa, 29 Juli 2025',
  },
  {
    id: 2,
    kategori: 'Sedang',
    judul: 'Pengumuman Lomba Kebersihan Antar RT',
    isi: 'Lomba kebersihan akan diadakan minggu depan. Pastikan setiap RT mempersiapkan dengan baik.',
    tanggal: 'Rabu, 30 Juli 2025',
  },
  {
    id: 3,
    kategori: 'Ringan',
    judul: 'Himbauan Menjaga Kebersihan Lingkungan',
    isi: 'Mari bersama menjaga lingkungan tetap bersih dan sehat.',
    tanggal: 'Kamis, 31 Juli 2025',
  },
]

// Fungsi untuk menentukan warna kategori
function getKategoriStyle(kategori: string) {
  switch (kategori.toLowerCase()) {
    case 'penting':
      return 'bg-red-100 text-red-700'
    case 'sedang':
      return 'bg-yellow-100 text-yellow-700'
    case 'ringan':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function PengumumanContent() {
  const [selectedTab, setSelectedTab] = useState<'berita' | 'pengumuman'>('pengumuman')
  const [searchTerm, setSearchTerm] = useState('')
  const pathname = usePathname()

  const filteredData = dummyPengumuman.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.isi.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar isLoggedIn={false} />

      {/* Konten utama */}
      <main className="flex-grow max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="text-sm text-gray-600">
                <Link href="/dashboard" className="hover:text-teal-600">Beranda</Link>
                <span className="mx-2">/</span>
                <Link href="/pengumuman" className="hover:text-teal-600">Pengumuman</Link>
            </nav>
            </div>
        </div>

        {/* Tab */}
        <div className="flex justify-center mb-4">
            <Link href="/berita">
                <button
                className={`px-4 py-1 border rounded-l-full ${
                    pathname === '/berita'
                    ? 'bg-green-900 text-white'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
                >
                Berita
                </button>
            </Link>

            <Link href="/pengumuman">
                <button
                className={`px-4 py-1 border rounded-r-full ${
                    pathname === '/pengumuman'
                    ? 'bg-green-900 text-white'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
                >
                Pengumuman
                </button>
            </Link>
        </div>

        {/* Search bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍  Baca apa hari ini?"
            className="w-full md:w-1/2 px-4 py-2 border rounded-full bg-gray-100"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Daftar pengumuman */}
        <div className="space-y-4">
          {filteredData.map(item => (
            <Link
              key={item.id}
              href={`/pengumuman/${item.id}`}
              className="block border rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium px-2 py-0.5 rounded ${getKategoriStyle(item.kategori)}`}>
                  {item.kategori}
                </span>
                <span className="text-green-900 font-bold text-lg">{'>'}</span>
              </div>

              <h2 className="text-lg font-semibold">{item.judul}</h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-3">{item.isi}</p>
              <div className="mt-3 text-sm text-gray-500">{item.tanggal}</div>
            </Link>
          ))}
          {filteredData.length === 0 && (
            <p className="text-center text-gray-500">Tidak ada pengumuman ditemukan.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
