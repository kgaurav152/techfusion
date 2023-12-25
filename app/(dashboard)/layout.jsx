"use client";
import NavBar from "@/components/Navbar";
import Footer from '@/components/footer';
// import Sidebar from "@/components/Sidebar";

import { useEffect } from "react";
import Network from "@/components/network";

const DashboardLayout = ({ children }) => {

  return (      
    <div>
      <div className=" min-h-[100vh] bg-[#00040F] relative" >
        <NavBar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
