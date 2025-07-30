import React from 'react'
import { TabType } from '@/types/articles'

interface TabSwitchProps {
  selectedTab: TabType
  onTabSwitch: (tab: TabType) => void
}

export default function TabSwitch({ selectedTab, onTabSwitch }: TabSwitchProps) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex rounded-full border border-gray-300 overflow-hidden">
        <button
          onClick={() => onTabSwitch('berita')}
          className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
            selectedTab === 'berita'
              ? 'bg-[#0E4D45] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Berita
        </button>
        <button
          onClick={() => onTabSwitch('pengumuman')}
          className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
            selectedTab === 'pengumuman'
              ? 'bg-[#0E4D45] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Pengumuman
        </button>
      </div>
    </div>
  )
}