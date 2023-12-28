"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { setUserDetails } from "@/redux/slices/profileSlice";
import { apiConnector } from "@/helpers/apiConnector";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logoutHandler = async() =>{
    const {data} = await apiConnector("GET",'/api/logout');
    if(data.success) {
      toast.success("Logout Successful");
      dispatch(setUserDetails(null));

    }
  }
  
  useEffect(()=>{
    const fetchUserDetails = async()=>{
      const {data} = await apiConnector("POST","/api/userDetails");
      // console.log(data)
       dispatch(setUserDetails(data?.data)) 
    }
    fetchUserDetails();

  },[])

  return (
    <nav className="bg-gray-900 p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-white font-bold text-lg">
            Logo
          </Link>
        </div>

        {/* Menu for large screens */}
        <div className="hidden md:flex md:space-x-8 mr-4">
          <Link href="/admin/dashboard" className="text-white hover:text-[#e11d48]">
            Dashboard
          </Link>
          <Link href="/admin/hospitality" className="text-white hover:text-[#e11d48]">
            Hospitality
          </Link>
          <Link href="/admin/manageevent" className="text-white hover:text-[#e11d48]">
            Manage Event
          </Link>
          <Link href="/admin/participant/pending" className="text-white hover:text-[#e11d48]">
            View Pending
          </Link>
          <Link href="/admin/participant/all" className="text-white hover:text-[#e11d48]">
            All Participants
          </Link>
          <Link href="/admin/participant/events" className="text-white hover:text-[#e11d48]">
            Event Participants
          </Link>
          {user ? (
            <Popover>
              <PopoverTrigger>
                {" "}
                <Avatar>
                  <AvatarFallback className="bg-slate-800">
                    {user.name[0]} 
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit text-white bg-black/50 border-primary">
                {/* <Button variant="ghost" onClick={handleRedirect}>Profile</Button> */}
                <Button variant="ghost" onClick={logoutHandler}>Logout</Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/sign-in" className="text-white hover:text-[#e11d48]">
              Login
            </Link>
          )}
        </div>

        {/* Menu icon for mobile screens */}
        <div className="md:hidden mr-1">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Responsive menu for mobile screens */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4">
            <Link href="/admin/dashboard" className="text-white hover:text-[#e11d48]">
            Dashboard
            </Link>
            <Link href="/admin/hospitality" className="text-white hover:text-[#e11d48]">
              Hospitality
            </Link>
            <Link href="/admin/manageevent" className="text-white hover:text-[#e11d48]">
              Manage Event
            </Link>
            <Link href="/admin/participant/pending" className="text-white hover:text-[#e11d48]">
              View Pending
            </Link>
            <Link href="/admin/participant/all" className="text-white hover:text-[#e11d48]">
              All Participants
            </Link>
            <Link href="/admin/participant/events" className="text-white hover:text-[#e11d48]">
              Event Participants
            </Link>
            {user ? (
                <Popover>
                <PopoverTrigger>
                    {" "}
                    <Avatar>
                    <AvatarFallback className="bg-slate-800 text-white">
                        {user.name[0]} 
                    </AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit text-white bg-black/50 border-primary">
                    {/* <Button variant="ghost" onClick={handleRedirect}>Profile</Button> */}
                    <Button variant="ghost" onClick={logoutHandler}>Logout</Button>
                </PopoverContent>
                </Popover>
            ) : (
                <Link href="/sign-in" className="text-white hover:text-[#e11d48]">
                Login
                </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
