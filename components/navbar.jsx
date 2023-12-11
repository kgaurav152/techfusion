import React from 'react';
import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/events">Events</a></li>
        <li><Link href="/kec_techfest_brochure.pdf" download={`kec_techfest_brochure.pdf`} target='blank'>Brochure</Link></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/sign-in">Login</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;