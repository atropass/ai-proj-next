"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    return (
        <header
            className={`
                fixed top-0 w-full z-30 transition-all duration-500 ease-in-out 
                ${scrollPosition > 50 ? "bg-[#FFFFFF] shadow-lg" : "bg-[#1D2432]"}
            `}
        >
            <div className="flex justify-between mx-3 md:mx-5 h-16 max-w-screen-xl items-center xl:mx-auto">
                <Link href="/" passHref>
                    <div className="flex items-center font-display text-2xl cursor-pointer">
                        <Image
                            src="/n17r.png"
                            alt="N17R logo"
                            width="50"
                            height="50"
                            className="mr-2 rounded-sm"
                        />
                        <p className={`font-extrabold ${scrollPosition > 50 ? "text-black" : "text-white"} transition-colors duration-300`}>ExamGenBOT</p>
                    </div>
                </Link>

                <nav className="flex space-x-4">
                    <div className="flex justify-center space-x-6 mr-4">
                        {[
                            { name: 'Инструкция', path: '/instructions' },
                            { name: 'Избранное', path: '/favorites' },
                            { name: 'Мой профиль', path: '/' },
                        ].map((item) => (
                            <Link href={item.path} passHref key={item.name}>
                                <button className={`${scrollPosition > 50 ? "text-black hover:bg-[#EE8365] hover:text-white" : "text-white hover:bg-black hover:text-white"} transition-colors duration-300 py-2 px-4 rounded-lg font-semibold`}>
                                    {item.name}
                                </button>
                            </Link>
                        ))}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className={`${scrollPosition > 50 ? "text-black" : "text-white"} transition-colors duration-300 py-2 px-3 rounded-lg bg-[#EE8365] hover:bg-transparent border border-[#EE8365] hover:border-transparent flex items-center font-semibold`}
                        >
                            Язык
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded-lg shadow-xl transition-all duration-500 ease-in-out">
                                {['Русский', 'English', 'Қазақша'].map((lang) => (
                                    <button className="transition-colors duration-300 block px-4 py-2 cursor-pointer hover:bg-black hover:text-white w-full text-center text-black font-semibold" key={lang}>
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
