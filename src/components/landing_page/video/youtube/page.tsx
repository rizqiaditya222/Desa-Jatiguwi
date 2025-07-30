const YoutubeVideo = ({ videoId }: { videoId: string }) => {
  return (
    <div className="aspect-video flex items-center justify-center w-full">
      <iframe
        className="rounded-4xl w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeVideo;
