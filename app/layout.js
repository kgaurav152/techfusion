import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechFusion",
  viewport: "width=device-width, initial-scale=1.0",
  description:
    "This webapp is dedicated for Technical cum Cultural Festival of KEC Katihar",
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
