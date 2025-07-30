'use client';

import React from 'react';
import { PengumumanArticle } from '@/types/pengumuman';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share'; // Import necessary components and icons from react-share

interface ContentProps {
  announcement: PengumumanArticle;
}

const PengumumanContent = ({ announcement }: ContentProps) => {
  const formattedDate = announcement.date?.toDate().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''; // Get the current URL for sharing
  const title = announcement.title;
  const contentExcerpt = (announcement.content ?? '').substring(0, 100) + '...';

  return (
    <div className="lg:w-2/3">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#07433C] mb-4 leading-tight">
            {announcement.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base">📅</span>
              <span>{formattedDate}</span>
            </div>
            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-base">📤</span>
              <span className="text-teal-600">Bagikan:</span>
              {/* Removed 'quote' prop for FacebookShareButton */}
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <EmailShareButton url={shareUrl} subject={title} body={contentExcerpt}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="mt-6 text-base leading-7 whitespace-pre-line">
            {announcement.content}
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

export default PengumumanContent;