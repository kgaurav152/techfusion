const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    // Added "imgur.com" to the list
    domains: ["imgur.com", "i.imgur.com", "images.app.goo.gl", "flic.kr"]
  },
};

module.exports = withPWA(nextConfig);