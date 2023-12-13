"use client";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";

import { useEffect } from "react";
import Network from "@/components/network";

const DashboardLayout = ({ children }) => {

  return (
    <div className="h-full relative">
      {/* <div className="hidden h-full md:flex md:w md:fixed md:inset-y-0 z-[80] bg-gray-900 ">
        <div>
          <Sidebar />
        </div>
      </div>
      <main className="md:pl-60">
        <Navbar />
        {children}
      </main> */}
      <p>Hello Dashboard</p>
        {children}
    </div>
  );
};

export default DashboardLayout;
