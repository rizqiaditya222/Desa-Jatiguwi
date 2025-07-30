"use client";

import React, { useState, useEffect } from 'react';
import YoutubeVideo from './youtube/page';
import { fetchProfil } from '@/service/profile/profileService';

const VideoSection = () => {
  const [ytVideoId, setYtVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVideoId = async () => {
      try {
        setLoading(true);
        const data = await fetchProfil();
        if (data && data.length > 0 && data[0].ytUrl) {
          const youtubeUrl = data[0].ytUrl;
          let videoId = null;

          // Regex to extract video ID from various YouTube URL formats
          const regExp = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/;
          const match = youtubeUrl.match(regExp);

          if (match && match[1]) {
            videoId = match[1];
          }

          if (videoId) {
            setYtVideoId(videoId);
          } else {
            setError("Invalid YouTube URL format found in database.");
          }
        } else {
          setError("YouTube URL not found in profile data.");
        }
      } catch (err) {
        console.error("Failed to fetch YouTube URL:", err);
        setError("Failed to load YouTube video. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getVideoId();
  }, []);

  if (loading) {
    return (
      <div className='relative h-[100vh] w-full overflow-hidden flex justify-center items-center'>
        <p>Loading video...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='relative h-[100vh] w-full overflow-hidden flex justify-center items-center text-red-600'>
        <p>{error}</p>
      </div>
    );
  }

  if (!ytVideoId) {
    return (
      <div className='relative h-[100vh] w-full overflow-hidden flex justify-center items-center'>
        <p>No YouTube video available.</p>
      </div>
    );
  }

  return (
    <div className='relative h-[100vh] w-full overflow-hidden'>
      <div className='h-1/2 w-full'></div>

      <div className='bg-[#0E4D45] h-1/2 w-full'></div>

      <div className='w-full h-full absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <YoutubeVideo videoId={ytVideoId} />
      </div>
    </div>
  );
};

export default VideoSection;