import React, { useState, useEffect } from 'react';
import './App.css';
import PfpMaker from './PfpMaker';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import Marquee from 'react-fast-marquee';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
  </svg>
);

const EmojiRain = () => {
  const emojis = ['🍼', '🎀', '🧸', '🛏️', '🍭'];
  const [emojiElements, setEmojiElements] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const leftPosition = Math.random() * 100;
      const duration = Math.random() * 3 + 2; // Duration between 2s to 5s

      setEmojiElements((prev) => [
        ...prev,
        <span
          key={Date.now() + Math.random()} // Unique key for each emoji
          className="falling-emoji"
          style={{ left: `${leftPosition}vw`, animationDuration: `${duration}s` }}
        >
          {emoji}
        </span>
      ]);
    }, 100); // Adjust the interval to control how frequently emojis fall

    return () => clearInterval(interval);
  }, [emojis]);

  return <div className="emoji-rain">{emojiElements}</div>;
};

const FloatingImageWithChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const fullMessage = "you better take care of my baby...or else!";

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
      className={`z-20 w-[40%] hidden md:flex floating-container ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
        left: '90%', // Center it horizontally
        transform: 'translate(-50%, -20%)', // Adjust position to center on small screens
      }}
    >
      <img
        src="doge.gif"
        alt="Floating Dog"
        className='w-full'
      />
      <div
        className='absolute -top-[70px] -left-[50px] md:top-[10px] md:left-[10px]'
        style={{
          backgroundColor: 'transparent',
          padding: '10px',
          maxWidth: '200px',
          textAlign: 'center',
        }}
      >
        <Window>
          <p className='p-1 font-custom'>{fullMessage}</p>
        </Window>
      </div>
    </div>
  );
};

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const imageSources = [
    'baby.png',
    'baby1.png',
    'baby2.png',
    'baby3.png',
    'baby4.png',
    'baby5.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
    }, 500); // Change the image every 2 seconds

    return () => clearInterval(interval);
  }, [imageSources.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText('CPwdnEwk5oRsFUqD1MQd5SNiG7wtxTRPUEs2nJdnpump');
  };

  return (
    <ThemeProvider theme={original}>
      <div className="h-screen w-screen flex flex-col justify-between bg-[#FD89FF] overflow-clip">
        <EmojiRain /> {/* Add the EmojiRain component here */}

        <div className='absolute top-5 left-5 flex justify-center items-center z-10 space-x-2 font-custom'>
          <a href="https://x.com/bDOGEsol" className='text-2xl underline'>
            X
          </a>
          <a href="https://t.me/bDOGEportal" className='text-2xl underline'>
            TG
          </a>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
          <Window>
            <div className='p-3 flex justify-center'>
              <div className='grid'>
                <div className="w-[200px] md:w-[300px] aspect-square relative">
                  <img
                    src={imageSources[imageIndex]} // Use the image based on the index
                    className='border-2 border-white transition-opacity duration-0'
                    alt='Baby Doge'
                  />
                </div>
                <span className="mt-4 text-2xl md:text-4xl font-custom text-center">baby doge</span>
              </div>
            </div>
          </Window>
        </div>

        <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Window>
            <div className='flex flex-col sm:flex-row justify-center z-10 items-center gap-1 md:gap-3 px-5 py-3 max-w-full'>
              <button
                onClick={handleCopy}
                className="text-sm bg-[#FD89FF] transition duration-150 ease-in-out py-2 px-4 z-10 whitespace-nowrap"
              >
                <CopyIcon />
              </button>
              <div className='text-[7px] md:text-base overflow-x-auto whitespace-nowrap font-custom'>
              CPwdnEwk5oRsFUqD1MQd5SNiG7wtxTRPUEs2nJdnpump
              </div>
            </div>
          </Window>
        </div>

        <FloatingImageWithChat />
      </div>
      <div className='py-2 font-custom bg-[#FD89FF] text-black text-2xl border-y-2 border-black hidden md:block'>
        <Marquee speed={100}>
          bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE bDOGE&nbsp; 
        </Marquee>
      </div>
      <div className='h-screen w-screen flex-col justify-center items-center gap-12 hidden md:flex bg-[#FD89FF]'>
        <div className='text-4xl md:text-5xl font-custom text-center'>meme maker</div>
        <PfpMaker />
      </div>
    </ThemeProvider>
  );
}

export default App;