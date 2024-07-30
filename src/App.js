import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import logo from './logo.svg';
import './App.css';
import PfpMaker from './PfpMaker';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
  </svg>
);

function App() {
  const [copied, setCopied] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);

  const handleCopy = () => {
    navigator.clipboard.writeText('oming soon...');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <a href="https://x.com/pfpdog" className=''>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#facc15" viewBox="0 0 50 50">
                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
              </svg>
            </a>
            <a href="https://t.me/" className=''>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#facc15" viewBox="0 0 50 50">
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

        <div className="flex flex-col items-center text-center">
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
          <span className="mt-4 text-4xl md:text-6xl font-custom text-center">pfp</span>
        </div>

        <div className='w-[120%] rotate-[30deg] -translate-x-[15%] -translate-y-[10%]'>
          <Marquee gradientWidth={100} speed={120} direction="right">
            {bottomMarqueeImages}
            {bottomMarqueeImages} {/* Duplicate for seamless loop */}
          </Marquee>
        </div>
        <div 
          className='absolute bottom-5 right-5 flex justify-center'
        >
          <div className='flex flex-col sm:flex-row justify-center bg-slate-100 rounded-xl md:rounded-full z-10 items-center gap-1 md:gap-3 px-5 py-3 max-w-full border-2 border-yellow-300'>
            <button
              onClick={handleCopy}
              className="text-sm bg-yellow-400 md:hover:bg-yellow-500 transition duration-150 ease-in-out text-black py-2 px-4 rounded-full border-2 border-yellow-300 z-10 whitespace-nowrap"
            >
              {copied ? 'Copied!' : <CopyIcon />}
            </button>
            <div className='text-xs md:text-xl overflow-x-auto whitespace-nowrap font-custom text-black'>
            coming soon...
            </div>
          </div>
        </div>
      </div>
      <div className="h-min py-[15%] w-screen border-y-2 bg-[#0a192f] flex flex-col items-center">
        <h2 className="text-3xl text-white mb-8">Roadmap</h2>
        <div className="w-11/12 md:w-2/3">
          <div className="relative">
            <div className="absolute w-1 bg-gray-300 h-full left-1/2 transform -translate-x-1/2"></div>

            <div className="mb-8 flex justify-between items-center w-full">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">1</h1>
              </div>
              <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-1 font-bold text-white text-lg">20K</h3>
                <p className="leading-snug tracking-wide text-white text-opacity-100 text-sm">
                  Paying Game.com
                </p>
              </div>
            </div>

            <div className="mb-8 flex justify-between items-center w-full">
              <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-1 font-bold text-white text-lg">KOTH</h3>
                <p className="leading-snug tracking-wide text-white text-opacity-100 text-sm">
                  Paying Dex
                </p>
              </div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
              </div>
              <div className="order-1 w-5/12"></div>
            </div>

            <div className="mb-8 flex justify-between items-center w-full">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">3</h1>
              </div>
              <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-1 font-bold text-white text-lg">50k</h3>
                <p className="leading-snug tracking-wide text-white text-opacity-100 text-sm">
                  Burn 3 Million Tokens
                </p>
              </div>
            </div>

            <div className="mb-8 flex justify-between items-center w-full">
              <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-1 font-bold text-white text-lg">Migrating...</h3>
                <p className="leading-snug tracking-wide text-white text-opacity-100 text-sm">
                  Dex ads
                </p>
              </div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
              </div>
              <div className="order-1 w-5/12"></div>
            </div>

            <div className="mb-8 flex justify-between items-center w-full">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">5</h1>
              </div>
              <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-1 font-bold text-white text-lg">Raydium</h3>
                <p className="leading-snug tracking-wide text-white text-opacity-100 text-sm">
                  Fatality Bot
                </p>
              </div>
            </div>

            <div className="mb-8 flex justify-between items-center w-full">
              <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-1 font-bold text-white text-lg">100K+</h3>
                <p className="leading-snug tracking-wide text-white text-opacity-100 text-sm">
                  Finder Trending + KOLs
                </p>
              </div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">6</h1>
              </div>
              <div className="order-1 w-5/12"></div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-screen w-screen flex-col justify-center items-center gap-12 hidden md:flex bg-[#0a192f] text-white'>
        <div className='text-4xl md:text-5xl font-custom text-center'>pfp maker</div>
        <PfpMaker />
      </div>
    </div>
  );
}

export default App;