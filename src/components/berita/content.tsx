'use client';

import React from 'react';
import { NewsArticle } from '@/types/berita';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share';

interface ContentProps {
  news: NewsArticle;
}

const BeritaContent = ({ news }: ContentProps) => {
  const formattedDate = news.date?.toDate().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // URL yang akan dibagikan, ambil dari window.location.href saat ini
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = news.title;
  const shareText = (news.content ?? '').substring(0, 150) + '...'; // Potongan konten untuk berbagi

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
            {/* Tombol Bagikan dengan ikon dari react-share */}
            <div className="flex items-center gap-2">
              <span className="text-base">📤</span>
              <span className="font-semibold text-gray-700">Bagikan:</span>
              <div className="flex gap-2 ml-2">
                <FacebookShareButton url={shareUrl} hashtag="#berita #infoterkini">
                  {/* Removed the 'quote' prop from FacebookShareButton */}
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton url={shareUrl} title={shareTitle}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TwitterShareButton url={shareUrl} title={shareTitle} hashtags={['berita', 'infoterkini']}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <EmailShareButton url={shareUrl} subject={shareTitle} body={shareText + '\n\nBaca selengkapnya di: ' + shareUrl}>
                  <EmailIcon size={32} round />
                </EmailShareButton>
                {/* Anda bisa menambahkan tombol lain di sini sesuai kebutuhan */}
              </div>
            </div>
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