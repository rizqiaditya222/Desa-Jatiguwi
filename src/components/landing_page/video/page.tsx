import React from 'react';
import YoutubeVideo from './youtube/page';
const VideoSection = () => {
  return (
    <div className='relative h-[100vh] w-full overflow-hidden'> 
      <div className='h-1/2 w-full '> 
      </div>

      <div className='bg-[#0E4D45] h-1/2 w-full'></div>

      <div className='w-full h-full absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <YoutubeVideo videoId='eRlp5hKOQZ4?si=szBe7kFFXcAqM0x7' />
      </div>
    </div>
  );
};

export default VideoSection;