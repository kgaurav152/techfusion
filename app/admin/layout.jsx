"use client";
import AdminNavBar from "@/components/adminNavbar";
import Footer from '@/components/footer';

// import { useEffect } from "react";
// import Network from "@/components/network";

const DashboardLayout = ({ children }) => {

  return (      
    <div>
      <div className=" min-h-[100vh] bg-[#00040F] relative" >
        <AdminNavBar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
