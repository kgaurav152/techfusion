import React from "react";
import {
  FaTelegram,
  FaInstagram,
  FaChrome,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#aboutus" },
    { label: "Events", href: "/events" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "About Developer", href: "/torchbearers/developer" },
  ];

  const socialLinks = [
    {
      href: "https://linkedin.com/company/tpo-keckatihar",
      icon: <FaLinkedin className="text-white hover:text-sky-300" size={24} />,
    },
    {
      href: "https://t.me/techfusion24",
      icon: <FaTelegram className="text-white hover:text-blue-300" size={24} />,
    },
    {
      href: "https://www.instagram.com/techfusion_kec",
      icon: <FaInstagram className="text-white hover:text-red-500" size={24} />,
    },
    {
      href: "http://keck.ac.in",
      icon: <FaChrome className="text-white hover:text-yellow-200" size={24} />,
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/icon-512x512.png" alt="Logo" className="h-14 w-14" />
        </div>

        {/* Navigation */}
        <nav className="mb-6">
          <ul className="flex flex-wrap justify-center space-x-6 text-center md:space-x-10">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-[#e11d48]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <div className="flex justify-center items-center">
          <a
            href="/torchbearers/developer"
            className="flex items-center hover:text-[#e11d48]"
          >
            Made with
            <FaHeart className="text-[#ff8787] mx-2" />
            by C.S.E Dept., KEC, Katihar
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
