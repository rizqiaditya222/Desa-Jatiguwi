'use client';

import React from 'react';
import { NewsArticle } from '@/types/berita';

interface ContentProps {
  news: NewsArticle;
}

const BeritaContent = ({ news }: ContentProps) => {
  const formattedDate = news.date?.toDate().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: (news.content ?? '').substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin ke clipboard!');
    }
  };

  return (
    <div className="lg:w-2/3">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#07433C] mb-4 leading-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base">📅</span>
              <span>{formattedDate}</span>
            </div>
            <button onClick={handleShare} className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
              <span className="text-base">📤</span>
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <img
            className='mb-6 h-128 w-full object-cover rounded-md'
            src={news.imageUrl}
            alt={news.title}
          />
                <div className="mt-6 text-base leading-7 whitespace-pre-line">
        {news.content}
      </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dibuat pada {formattedDate} | Diperbaharui pada {formattedDate}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaContent;