"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import GetStartedButton from "@/app/(routes)/(landing)/getStartedButton";
import StarsCanvas from "@/components/StarCanvas";
import BottomBar from "@/components/bottom-bar";

const DashboardLayout = ({ children }) => {
  const [isGetStarted, setIsGetStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hovered) => {
    setIsHovered(hovered);
  };

  const toggleIsGetStarted = () => {
    setIsGetStarted(false);
    sessionStorage.setItem("hasSeenGetStarted", "true");
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      toggleIsGetStarted();
    }, 1000);
  };

  useEffect(() => {
    const hasSeenGetStarted = sessionStorage.getItem("hasSeenGetStarted");
    if (!hasSeenGetStarted) {
      setIsGetStarted(true);
    }
  }, []);

  return (
    <div className=" min-h-[100vh] bg-[#00040F] relative">
      <NavBar />
      {children}
      <Footer />
      <BottomBar />
    </div>
  );
};

export default DashboardLayout;
