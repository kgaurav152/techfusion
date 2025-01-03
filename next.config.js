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
    domains: ["i.imgur.com", "images.app.goo.gl"],
  },
};

module.exports = withPWA(nextConfig);
