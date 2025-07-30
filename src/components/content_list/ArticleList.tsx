import React from 'react'
import { Article, TabType } from '@/types/articles'
import ArticleCard from './ArticleCard'

interface ArticleListProps {
  articles: Article[]
  selectedTab: TabType
  searchTerm: string
  loading: boolean
}

export default function ArticleList({ articles, selectedTab, searchTerm, loading }: ArticleListProps) {
  if (loading) {
    return null // Loading handled by parent
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          {searchTerm ? 'Tidak ada hasil ditemukan' : 'Tidak ada data tersedia'}
        </p>
        {searchTerm && (
          <p className="text-gray-400 text-sm mt-2">
            Coba gunakan kata kunci yang berbeda
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          selectedTab={selectedTab}
        />
      ))}
    </div>
  )
}