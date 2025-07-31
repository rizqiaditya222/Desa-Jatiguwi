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
    <div className="w-full bg-gradient-to-b border-[#0E4D45]  to-[#0E4D45] pb-16 pt-8 px-4 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        {/* Loading */}
        {loading && (
          <div className="aspect-video rounded-xl flex items-center justify-center w-full bg-gray-500 shadow-lg">
            <span className="text-white">Memuat video...</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="aspect-video rounded-xl flex items-center justify-center w-full text-red-600 bg-gray-100">
            <p>{error}</p>
          </div>
        )}

        {/* Video */}
        {ytVideoId && !loading && (
          <div className="aspect-video rounded-xl flex items-center justify-center w-full shadow-lg">
            <YoutubeVideo videoId={ytVideoId} />
          </div>
        )}

        {/* No video */}
        {!ytVideoId && !loading && !error && (
          <div className="aspect-video rounded-xl flex items-center justify-center w-full bg-gray-100">
            <p>No video available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
