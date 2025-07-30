import React from 'react'
import Link from 'next/link'
import { Article, TabType } from '@/types/articles'
import CategoryBadge from './CategoryBadge'
import { Timestamp } from 'firebase/firestore'

interface ArticleCardProps {
  article: Article
  selectedTab: TabType
}

export default function ArticleCard({ article, selectedTab }: ArticleCardProps) {
  function formatDate(timestamp: Timestamp) {
    const date = timestamp.toDate()
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link
      href={`/${selectedTab}/${article.slug}`}
      className="block border border-gray-100 rounded-xl shadow-md p-4 hover:shadow-md transition-shadow duration-200"
    >
      {article.category && selectedTab === 'pengumuman' && (
        <div className="flex items-center justify-between mb-2">
          <CategoryBadge category={article.category} />
          <span className="text-[#0E4D45] font-bold text-lg">{'>'}</span>
        </div>
      )}

      <h2 className="text-lg font-semibold text-[#07433C] mb-2">{article.title}</h2>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">{article.content}</p>
      <div className="mt-3 text-sm text-gray-500">{formatDate(article.date)}</div>

      {article.imageUrl && selectedTab === 'berita' && (
        <div className="mt-3">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
    </Link>
  )
}