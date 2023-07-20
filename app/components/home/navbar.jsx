"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <div
                className={`fixed top-0 w-full border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all`}
            >
                <div className="flex justify-between mx-5 h-14 max-w-screen-xl items-center xl:mx-auto">
                    <Link href="/" passHref>
                        <div className="flex items-center font-display text-3xl cursor-pointer">
                            <Image
                                src="/n17r.png"
                                alt="N17R logo"
                                width="30"
                                height="30"
                                className="mr-2 rounded-sm"
                            />
                            <p>Емтихан генератор</p>
                        </div>
                    </Link>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className="py-2 px-4 bg-transparent text-blue-700 font-semibold hover:text-white transition-all duration-200 ease-in-out"
                        >
                            Меню
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 w-48 mt-2 py-2 bg-white border rounded shadow-xl">
                                <Link href="/faq" passHref>
                                    <button className="transition-colors duration-200 block px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white">
                                        FAQ
                                    </button>
                                </Link>
                                <Link href="/favorites" passHref>
                                    <button className="transition-colors duration-200 block px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white">
                                        Избранное
                                    </button>
                                </Link>
                                <Link href="/profile" passHref>
                                    <button className="transition-colors duration-200 block px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white">
                                        Мой профиль
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
