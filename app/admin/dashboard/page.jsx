"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import Footer from '@/components/footer';
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/redux/slices/profileSlice";


const AdminDashboard = () => {


    const dispatch = useDispatch();
    useEffect(()=>{
    const fetchUserDetails = async()=>{
        const {data} = await axios.get('/api/userDetails');
        console.log(data)
        dispatch(setUserDetails(data?.data)) 
    }
    fetchUserDetails();

    },[])

return (
    // <div className="text-white text-center min-h-[100vh] bg-[#00040F] relative" >
    // </div>
    <div className="text-white text-center min-h-[100vh] relative">
        <p className="text-white">Hello Admin</p>
    </div>
  )
}

export default AdminDashboard;
