'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Navbar from '@/components/landing_page/navbar/page'
import Footer from '@/components/landing_page/footer/page'
import Breadcrumb from '@/components/content_list/Breadcrumb'
import TabSwitch from '@/components/content_list/TabSwitch'
import SearchBar from '@/components/content_list/SearchBar'
import LoadingSpinner from '@/components/content_list/LoadingSpinner'
import ArticleList from '@/components/content_list/ArticleList'
import { useArticles } from '@/components/content_list/useArticles'
import { filterArticles } from '@/components/content_list/filterArticles'
import { TabType } from '@/types/articles'

export default function ContentPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>('berita')
  const [searchTerm, setSearchTerm] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  const { articles, loading } = useArticles(selectedTab)
  const filteredArticles = filterArticles(articles, searchTerm)

  useEffect(() => {
    const currentPath = pathname ?? ''
    if (currentPath.startsWith('/berita')) {
      setSelectedTab('berita')
    } else if (currentPath.startsWith('/pengumuman')) {
      setSelectedTab('pengumuman')
    }
  }, [pathname])

  const handleTabSwitch = (tab: TabType) => {
    setSelectedTab(tab)
    setSearchTerm('') 
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-6">
        <Breadcrumb selectedTab={selectedTab} />
        <TabSwitch selectedTab={selectedTab} onTabSwitch={handleTabSwitch} />
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

        {loading && <LoadingSpinner />}

        <ArticleList
          articles={filteredArticles}
          selectedTab={selectedTab}
          searchTerm={searchTerm}
          loading={loading}
        />
      </main>

      <Footer />
    </div>
  )
}