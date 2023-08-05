import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className="bg-[#303030] text-white pt-4">
            <div className="container mx-auto px-6 py-[50px]">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                    <div className="col-span-3 md:col-span-2">
                        <div className="mb-2">
                            <Image src="/logo1.png" alt="Footer Logo" width={150} height={150} className='rounded-full' />
                        </div>
                        <p className="mb-4">EmtihanGPT - это мощный генератор вопросов на основе искусственного интеллекта, разработанный для революционизации процесса создания тестов и экзаменов для учителей. Также он поможет создать практические вопросы для экзаменов SAT, GCSE, A-Level и AP.</p>
                    </div>

                    <div className="col-span-3 md:col-span-1"></div>
                    <div className="col-span-3 md:col-span-1"></div>


                    <div className="col-span-3 md:col-span-1 ">
                        <h3 className="text-lg mb-3">Helpful Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/feedback">Feedback</Link></li>
                            <li><a href="https://www.linkedin.com/in/aibar-berekeyev-794250250/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="https://github.com/atropass" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="https://www.instagram.com/berekeyev_" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-[#232323] text-gray-400 py-[25px]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <span>&copy; 2023 EmtihanGPT. Все права защищены.</span>
                            <p> Created by Aibar Berekeyev</p>
                        </div>
                        <div className="text-right text-xl">
                            <span>Сделано с ❤️ в Казахстане</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
