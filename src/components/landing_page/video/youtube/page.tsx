const YoutubeVideo = ({ videoId }: { videoId: string }) => {
  return (
    <div className="flex justify-center aspect-video w-full ">
      <iframe
        className="w-3/4 h-3/4 rounded-4xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeVideo;
