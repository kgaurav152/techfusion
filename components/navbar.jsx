"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setUserDetails } from "@/redux/slices/profileSlice";
import { apiConnector } from "@/helpers/apiConnector";
import { setEvent } from "@/redux/slices/eventSlice";
import { LogOutIcon } from "lucide-react";
import { navbarData } from "@/data/navbarData";
import MobileNavbar from "./mobileNavbar";
import UserAvatar from "./user-avatar";

const NavBar = () => {
  const { user } = useSelector((state) => state.profile);
  const router = useRouter();
  const dispatch = useDispatch();

  const userType = Cookies.get("userType") || 'public';

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data } = await apiConnector("POST", "/api/userDetails");
      dispatch(setUserDetails(data?.data));
    };

    const token = Cookies.get("token");
    if (token) {
      fetchUserDetails();
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await apiConnector("POST", "/api/event/getAllEvent");
      // console.log(data?.data)
      dispatch(setEvent(data?.data));
    };
    fetchEvents();
  }, [dispatch]);

  return (
    <nav className="bg-gray-900 p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link href="/" className="text-white font-bold text-lg">
            <Image
              src="/TechFusionLogo.svg"
              width={30}
              height={30}
              alt="TechFusion'24 Logo"
            />
          </Link>
        </div>

        {/* Menu for large screens */}
        <div className="hidden md:flex items-center justify-center md:space-x-8 mr-4">
          {navbarData.map(
            (nav) => 
              ((nav.userType === "public" && userType === 'participant') || nav.userType === userType) && (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className="text-white hover:text-[#e11d48]"
                >
                  {nav.label}
                </Link>
              )
          )}
          {user ? (
            <UserAvatar />
          ) : (
            <Link href="/sign-in" className="text-white hover:text-[#e11d48]">
              Login
            </Link>
          )}
        </div>
      </div>
      <MobileNavbar />
    </nav>
  );
};

export default NavBar;
