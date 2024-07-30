import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import logo from './logo.svg';
import './App.css';
import PfpMaker from './PfpMaker';

function App() {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage % 16) + 1);
    }, 7000 / 16); // 5 seconds divided by 16 images

    return () => clearInterval(interval);
  }, []);

  const createMarqueeImages = (start, end) => {
    return [...Array(end - start + 1)].map((_, index) => (
      <img
        key={start + index}
        src={`i${start + index}.png`}
        className="h-32 w-32 md:h-40 md:w-40 mx-4 rounded-full"
        alt={`Marquee ${start + index}`}
      />
    ));
  };

  const topMarqueeImages = createMarqueeImages(1, 8);
  const bottomMarqueeImages = createMarqueeImages(9, 16);

  return (
    <div className=''>
      <div className="h-screen w-screen flex flex-col justify-between bg-[#0a192f] overflow-clip text-white">
          <div className='absolute top-5 left-5 flex justify-center items-center z-10'>
            <a href="https://x.com/" className=''>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#FFFFFF" viewBox="0 0 50 50">
                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
              </svg>
            </a>
            <a href="https://t.me/" className=''>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#FFFFFF" viewBox="0 0 50 50">
                <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
              </svg>
            </a>
          </div>
        <div className='w-[120%] rotate-[30deg]'>
          <Marquee gradientWidth={100} speed={120}>
            {topMarqueeImages}
            {topMarqueeImages} {/* Duplicate for seamless loop */}
          </Marquee>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[45%] md:w-[25%] aspect-square relative">
            {[...Array(16)].map((_, index) => (
              <img
                key={index + 1}
                src={`i${index + 1}.png`}
                className={`absolute top-0 left-0 rounded-full border-4 border-slate-800 transition-opacity duration-0 ${
                  currentImage === index + 1 ? 'opacity-100' : 'opacity-0'
                }`}
                alt={`Profile ${index + 1}`}
              />
            ))}
          </div>
          <span className="mt-4 text-4xl md:text-6xl font-custom">pfp</span>
        </div>

        <div className='w-[120%] rotate-[30deg] -translate-x-[15%] -translate-y-[10%]'>
          <Marquee gradientWidth={100} speed={120} direction="right">
            {bottomMarqueeImages}
            {bottomMarqueeImages} {/* Duplicate for seamless loop */}
          </Marquee>
        </div>
      </div>
      <div className='h-screen w-screen flex-col justify-center items-center gap-12 hidden md:flex border-t-2 bg-[#0a192f] text-white'>
        <div className='text-4xl md:text-5xl font-custom text-center'>pfp maker</div>
        <PfpMaker />
      </div>
    </div>
  );
}

export default App;