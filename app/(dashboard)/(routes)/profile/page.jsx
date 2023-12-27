'use client'

import React, { useEffect, useState } from 'react'
// import Network from "@/components/network";
import axios from "axios";
import toast from "react-hot-toast";
import {columns} from '@/app/(dashboard)/(routes)/profile/columns';
import { DataTable } from '@/app/(dashboard)/(routes)/profile/data-table'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Building, Mail, Phone, User } from 'lucide-react';

export const ProfilePage = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [userData, setUserData] = useState([]);
    const [participatingEventsData, setparticipatingEventsData] = useState([]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/userDetails");
            setLoading(false);
            if (data.success) {
            toast.success("Data Fetched Successfully!");
            setUserData(data.data);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchParticipatingEventsData = async () => {
        setLoading(true);
        const obj = {
            user_id: userData.id
        }

        try {
            const { data } = await axios.post("/api/userEvents",obj);
            setLoading(false);
            if (data.success) {
            toast.success("Data Fetched Successfully!");
            setparticipatingEventsData(data.data);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
      fetchUserData();
    }, []);

    if(actionSuccess){ 
        fetchUserData();
        setActionSuccess(false);
    }
    

  return (
        <div className="h-[100vh] flex flex-col items-center mt-2 text-center">
            {/* <h1 className='text-3xl text-white font-bold'>Pending Participants</h1> */}
            <Card className="mx-auto max-w-xl mb-4 text-left shadow-lg bg-white/20 backdrop-blur-md ring-1 ring-black/5 text-white">
                <CardContent>
                    <div className="flex flex-col text-left pt-4">
                        <span className="pr-12">
                            <h1 className="font-extrabold text-center text-xl mb-4">Welcome!</h1>
                            <p className="font-semibold font-mono mb-1 flex flex-row"><User className="h-5 w-5 mr-3"/>{userData.name || 'No Name Found'}</p>
                            <p className="font-semibold font-mono mb-1 flex flex-row"><Mail className="h-5 w-5 mr-3"/>{userData.email || 'Not Available'}</p>
                            <p className="font-semibold font-mono mb-1 flex flex-row"><Phone className="h-5 w-5 mr-3"/>{userData.phone || 'Not Available'}</p>
                            <p className="font-semibold font-mono mb-1 flex flex-row"><Building className="h-5 w-5 mr-3"/>{userData.college || 'Not Available'}</p>
                        </span>
                    </div>
                </CardContent>
              </Card>
            <div className='container mt-4 mb-20 w-4/5'>  
                <h1 className='text-3xl text-white font-bold'>List of Events</h1>
                <DataTable columns={columns(setActionSuccess)} data={participatingEventsData} />
            </div>
        </div>
  )
};

export default ProfilePage;