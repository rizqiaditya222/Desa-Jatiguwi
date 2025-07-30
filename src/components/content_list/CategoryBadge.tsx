import React from 'react'

interface CategoryBadgeProps {
  category: string
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
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

  return (
    <span className={`text-sm font-medium px-2 py-0.5 rounded ${getKategoriStyle(category)}`}>
      {category}
    </span>
  )
}