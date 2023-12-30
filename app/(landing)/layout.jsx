"use client";
import NavBar from "@/components/navbar";
import Footer from '@/components/footer';
import Hero from "@/components/main/Hero";

import { useEffect } from "react";
import Network from "@/components/network";

const DashboardLayout = ({ children }) => {

  return (      
    <div>
      <div className=" min-h-[100vh] bg-[#00040F] relative" >
        {/* <Hero /> */}
        <NavBar/>
        {children}
        <Footer/>
      </div>
    </div>
  );
};

export default DashboardLayout;
