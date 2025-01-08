'use client'
import React, { useEffect, useState } from 'react';
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

const DarkMode = () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(savedTheme);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeMode = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="transition duration-500 ">
            <div className='size-10 bg-slate-600  dark:bg-gray-200 rounded-full flex items-center justify-center'>
                
                <button
                    className="text-slate-200 dark:text-slate-600 p-3 rounded-md  transition-all duration-500"
                    onClick={handleThemeMode}
                >
                    {theme === "dark" ? <IoSunny className='text-2xl transition duration-500'/>: <IoMdMoon className=' text-2xl transition duration-500'/>  }
                </button>
            </div>
        </div>
    )
};

export default DarkMode;
