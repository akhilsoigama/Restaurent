'use client';
import React, { useEffect, useState } from 'react';
import DarkMode from './DarkMode';
import ShineBorder from '@/components/ui/shine-border';

const DashboardHeader = () => {
  const [image, setImage] = useState('');
  const [initial, setInitial] = useState('');

  useEffect(() => {
      const data = localStorage.getItem("restaurantUser");
      if (data) {
        const parsedData = JSON.parse(data);
        const firstname = parsedData.firstname || '';
        setImage(parsedData.profilePicture || ''); 
        setInitial(firstname.charAt(0).toUpperCase());
      }
  }, []);

  return (
    <div className="w-full dark:bg-slate-950">
      <main className="w-full overflow-hidden p-4 md:p-6">
        <ShineBorder
          className="flex w-full overflow-hidden rounded-lg border bg-background md:shadow-xl p-0"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <span className="w-full whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl md:text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            <header className="flex flex-wrap justify-between items-center gap-4 p-4 transition duration-300">
              <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200">
                Dashboard
              </h1>

              <div className="flex items-center gap-4">
                <DarkMode />
                <div
                  className={`size-10  rounded-full flex items-center justify-center dark:bg-gray-700 bg-green-700 cursor-pointer text-white font-bold text-xl`}
                  style={{
                    backgroundImage: image ? `url(${image})` : 'none',
                    backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                  }}
                >
                  {!image && initial} 
                </div>
              </div>
            </header>
          </span>
        </ShineBorder>
      </main>
    </div>
  );
};

export default DashboardHeader;
