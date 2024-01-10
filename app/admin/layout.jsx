"use client";
import AdminNavBar from "@/components/adminNavbar";
import Footer from '@/components/footer';
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// import { useEffect } from "react";
// import Network from "@/components/network";

const DashboardLayout = ({ children }) => {

  const {user} = useSelector((state)=>state.profile);

  useEffect(()=>{

    if(user?.userType !=="admin"){
      redirect("/");
    }
  },[user]);
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
