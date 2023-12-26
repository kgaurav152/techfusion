'use client'

import React, { useEffect, useState } from 'react'
// import Network from "@/components/network";
import axios from "axios";
import toast from "react-hot-toast";
// import {columns} from '@/app/profile/columns'
// import { DataTable } from '@/app/profile/data-table'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export const ProfilePage = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [userData, setUserData] = useState([]);
    const [eventsData, setEventsData] = useState([]);

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
    }

    useEffect(() => {
      fetchUserData();
    }, []);

    if(actionSuccess){ 
        fetchUserData();
        setActionSuccess(false);
    }
    

  return (
        <div className="flex flex-col items-center mt-2 text-center">
            {/* <h1 className='text-3xl text-white font-bold'>Pending Participants</h1> */}
            <Card className="mx-auto max-w-xl mb-4 text-left shadow-lg bg-white/20 backdrop-blur-md ring-1 ring-black/5">
                <CardContent>
                    <div className="flex flex-col items-center pt-4">
                        <h1 className="font-extrabold">Hello!</h1>
                      <p className="font-semibold font-mono">{`${userData.name} || 'mera Naam'`}</p>
                      <p className="font-semibold font-mono">{`${userData.email} || 'meraemail@email.com'`}</p>
                      <p className="font-semibold font-mono">{userData.phone}</p>
                      <p className="font-semibold font-mono">{userData.college}</p>
                    </div>
                </CardContent>
              </Card>
            {/* <div className='container mt-4 mb-20 w-4/5'>
                <DataTable columns={columns(setActionSuccess)} data={pendingParticipantsData} />
            </div> */}
        </div>
  )
};

export default ProfilePage;