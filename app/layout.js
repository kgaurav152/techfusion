import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/redux/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechFusion'26 - Katihar Engineering College, Katihar",
  viewport: "width=device-width, initial-scale=1.0",
  description:
    "TechFusion'26 - Join Katihar Engineering College, Katihar's annual extravaganza! Four days of innovation, cultural vibrancy, and technical brilliance from Jan 10-13, 2026. Participate in diverse engineering competitions, workshops, and enjoy captivating cultural performances. Total prizes worth Rs 2 Lakhs await!",
  keywords:
    "TechFusion, TechFusion 2026, Katihar Engineering College, Engineering Competitions, Cultural Fest, Innovation, Prizes, Workshops",
  author: "TechFusion'26 Team",
  robots: "index, follow",
  charset: "UTF-8",
  themeColor: "#00040F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <title>TechFusion&apos;26</title>
      </head>
      <body className={inter.className}>
        <Providers>
          <main className="min-h-[100vh]">{children}</main>
        </Providers>
        <Analytics />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
