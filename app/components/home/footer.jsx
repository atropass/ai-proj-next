import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className="bg-[#303030] text-white pt-4">
            <div className="container mx-auto px-6 py-[50px]">
                <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-5 md:col-span-2">
                        <div className="mb-4">
                            <Image src="/EXENGPT.png" alt="Footer Logo" width={150} height={50} />
                        </div>
                        <p className="mb-4">ExamGenGPT - это мощный генератор вопросов на основе искусственного интеллекта, разработанный для революционизации процесса создания тестов и экзаменов для учителей. Также он поможет создать практические вопросы для экзаменов SAT, GCSE, A-Level и AP.</p>
                    </div>

                    <div className="col-span-5 md:col-span-1"></div>

                    <div className="col-span-5 md:col-span-1">
                        <h3 className="text-lg mb-3">My Account</h3>
                        <ul className="space-y-2">
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/signup">Register</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-5 md:col-span-1">
                        <h3 className="text-lg mb-3">Helpful Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/feedback">Feedback</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-5 md:col-span-1">
                        <h3 className="text-lg mb-3">Information</h3>
                        <ul className="space-y-2">
                            <li><Link href="/testimonials">Testimonials</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/cookie-policy">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-[#232323] text-gray-400 py-[25px]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <span>2023 ExamGenGPT - Made in Kazakhstan</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
