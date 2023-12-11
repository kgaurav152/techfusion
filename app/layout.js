import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
// import {Providers} from "@/redux/providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TechFestKEC',
  viewport: "width=device-width, initial-scale=1.0",
  description: 'This webapp is dedicated for Technical Festival of KEC Katihar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link
              rel="manifest"
              href="/manifest.json"
          />
          <title>TechFestKEC</title>
      </head>
      <body className={inter.className}>
        {/* <Providers> */}
            {children}
            <Analytics />
        {/* </Providers> */}
        <Toaster />
      </body>
    </html>
  )
}
