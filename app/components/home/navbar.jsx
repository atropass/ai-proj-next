"use client"
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const faqRef = useRef(null);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        faqRef.current = document.getElementById('faq');
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };
    const handleFaqClick = (event) => {
        event.preventDefault();
        if (faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <header
            className={`
                fixed top-0 w-full z-30 transition-all duration-500 ease-in-out
                ${scrollPosition > 50 ? "bg-[#D6D8DD]/80" : "bg-[#1D2432]"}
            `}
        >
            <div className="flex justify-between mx-5 h-14 max-w-screen-xl items-center xl:mx-auto">
                <Link href="/" passHref>
                    <div className="flex items-center font-display text-2xl cursor-pointer">
                        <Image
                            src="/n17r.png"
                            alt="N17R logo"
                            width="30"
                            height="30"
                            className="mr-2 rounded-sm"
                        />
                        <p className={`font-extrabold ${scrollPosition > 50 ? "text-black" : "text-white"}`}>ExamGenBOT</p>
                    </div>
                </Link>

                <nav className="flex space-x-4">
                    <div className="flex justify-center space-x-4 mr-4">
                        <Link href="/main" passHref>
                            <button className={`${scrollPosition > 50 ? "text-black hover:bg-[#EE8365] hover:text-white" : "text-white hover:bg-black hover:text-white"} transition-colors duration-200 py-1 px-2 rounded`}>
                                Домой
                            </button>
                        </Link>

                        <Link href="/favorites" passHref>
                            <button className={`${scrollPosition > 50 ? "text-black hover:bg-[#EE8365] hover:text-white" : "text-white hover:bg-black hover:text-white"} transition-colors duration-200 py-1 px-2 rounded`}>
                                Избранное
                            </button>
                        </Link>

                        <Link href="/main" passHref>
                            <button className={`${scrollPosition > 50 ? "text-black hover:bg-[#EE8365] hover:text-white" : "text-white hover:bg-black hover:text-white"} transition-colors duration-200 py-1 px-2 rounded`}>
                                Мой профиль
                            </button>
                        </Link>

                        <Link href="/faq" onClick={handleFaqClick} passHref>
                            <button className={`${scrollPosition > 50 ? "text-black hover:bg-[#EE8365] hover:text-white" : "text-white hover:bg-black hover:text-white"} transition-colors duration-200 py-1 px-2 rounded`}>
                                FAQs
                            </button>
                        </Link>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className={`${scrollPosition > 50 ? "text-black" : "text-white"} transition-colors duration-200 py-1 px-3 rounded bg-[#EE8365] hover:bg-transparent border border-[#EE8365] hover:border-transparent flex items-center`}
                        >
                            Язык
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl transition-all duration-500 ease-in-out">
                                <button className="transition-colors duration-200 block px-4 py-2 cursor-pointer hover:bg-black hover:text-white w-full text-center text-black">
                                    Русский
                                </button>
                                <button className="transition-colors duration-200 block px-4 py-2 cursor-pointer hover:bg-black hover:text-white w-full text-center text-black">
                                    English
                                </button>
                                <button className="transition-colors duration-200 block px-4 py-2 cursor-pointer hover:bg-black hover:text-white w-full text-center text-black">
                                    Қазақша
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
