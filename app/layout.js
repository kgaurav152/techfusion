import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechFusion'24 - Katihar Engineering College, Katihar",
  viewport: "width=device-width, initial-scale=1.0",
  description:
    "TechFusion'24 - Join Katihar Engineering College, Katihar's annual extravaganza! Four days of innovation, cultural vibrancy, and technical brilliance from Jan 25-28, 2024. Participate in diverse engineering competitions, workshops, and enjoy captivating cultural performances. Total prizes worth Rs 2 Lakhs await!",
  keywords:
    "TechFusion, TechFusion 2024, Katihar Engineering College, Engineering Competitions, Cultural Fest, Innovation, Prizes, Workshops",
  author: "TechFusion'24 Team",
  robots: "index, follow",
  charset: "UTF-8",
  themeColor: "#00040F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <title>TechFusion&apos;24</title>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
