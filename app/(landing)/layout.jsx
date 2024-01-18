"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import NavBar from "@/components/navbar";
import Footer from '@/components/footer';
import GetStartedButton from "@/app/(landing)/getStartedButton";
import StarsCanvas from "@/components/StarCanvas";

const DashboardLayout = ({ children }) => {

  const [isGetStarted, setIsGetStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hovered) => {
    setIsHovered(hovered);
  };
  
  const toggleIsGetStarted = () => {
    setIsGetStarted(false);
    sessionStorage.setItem('hasSeenGetStarted', 'true');
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      toggleIsGetStarted();
    }, 1000);
  };

  useEffect(() => {
    const hasSeenGetStarted = sessionStorage.getItem('hasSeenGetStarted');
    if (!hasSeenGetStarted) {
      setIsGetStarted(true);
    }
  },[]);

  return (      
    <div>
      {isGetStarted ? (
      <div
        className={clsx(
          "flex justify-center items-center min-h-screen font-hnd text-white transition-all duration-300 w-full h-full",
          isHovered
            ? "bg-[#ff4802] bg-[linear-gradient(#ffffff3f_2px,transparent_2px),linear-gradient(90deg,#ffffff3f_2px,transparent_2px),linear-gradient(#ffffff3f_1px,transparent_1px),linear-gradient(90deg,#ffffff3f_1px,rgba(0,0,0,0)_1px)] bg-[250px_250px,250px_250px,50px_50px,50px_50px]"
            : "bg-black"
        )}
        style={{
          backgroundBlendMode: "overlay",
        }}
        onClick={handleButtonClick}
      >
        <GetStartedButton text={"Get started →"} onHover={handleHover}/>
      </div>
      ) : ( 
      <div className=" min-h-[100vh] bg-[#00040F] relative" >
        <StarsCanvas/>
        <NavBar />
        <div className="w-full p-2 text-white text-center bg-blue-950">
        <span className="text-yellow-200">Registration deadline</span>: January 21, 2024, by 10:00 PM
        </div>
        {children}
        <Footer />
      </div>
      )}
    </div>
  );
};

export default DashboardLayout;