import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Емтихан Генератор',
  description: 'Емтихан',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}<Analytics/></body>
    </html>
  )
}
