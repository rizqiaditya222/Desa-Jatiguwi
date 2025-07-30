"use client";

import React, { useState, useEffect } from "react";
import YoutubeVideo from "./youtube/page";
import { fetchProfil } from "@/service/profile/profileService";

const VideoSection = () => {
  const [ytVideoId, setYtVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVideoId = async () => {
      try {
        const data = await fetchProfil();
        if (data && data.length > 0 && data[0].ytUrl) {
          const youtubeUrl = data[0].ytUrl;
          const regExp =
            /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/;
          const match = youtubeUrl.match(regExp);

          if (match && match[1]) {
            setYtVideoId(match[1]);
          } else {
            setError("Invalid YouTube URL format");
          }
        } else {
          setError("No YouTube URL found");
        }
      } catch (err) {
        console.error("Failed to fetch YouTube URL:", err);
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    getVideoId();
  }, []);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {/* Background yang langsung muncul */}
      <div className="h-1/2 w-full"></div>
      <div className="bg-[#0E4D45] h-1/2 w-full"></div>

      {/* Kontainer video */}
      <div className="w-full h-full absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Placeholder kotak loading */}
        {loading && (
          <div className="w-3/4 h-3/4 mx-auto rounded-4xl aspect-video flex items-center justify-center bg-gray-500 shadow-lg">
            <span className="text-white">Memuat video...</span>
          </div>
        )}

        {/* Tampilkan error jika ada */}
        {error && !loading && (
          <div className="flex justify-center items-center h-full text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Tampilkan video jika tersedia */}
        {ytVideoId && !loading && <YoutubeVideo videoId={ytVideoId} />}

        {/* Tampilkan pesan jika tidak ada video */}
        {!ytVideoId && !loading && !error && (
          <div className="flex justify-center items-center h-full">
            <p>No video available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
