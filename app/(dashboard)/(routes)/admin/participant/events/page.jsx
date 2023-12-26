'use client'

import React, { useEffect, useState } from 'react'
import Network from "@/components/network";
import axios from "axios";
import toast from "react-hot-toast";
import {columns} from '@/app/(dashboard)/(routes)/admin/participant/all/columns'
import { DataTable } from '@/app/(dashboard)/(routes)/admin/participant/all/data-table'

export const AllEventParticipants = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [allEventParticipantsData, setAllEventParticipantsData] = useState([]);

    const fetchAllEventParticipants = async () => {
        // new Network().hit("employee", "all", {}, (responseData) => {
        //   if (responseData) {
        //     setPendingParticipantsData(responseData);
        //   }
        // });
        setLoading(true);
        try {
            const { data } = await axios.post("/api/participant/all",{});
            setLoading(false);
            if (data.success) {
            toast.success("Data Fetched Successfully!");
            setAllEventParticipantsData(data.data);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
      fetchAllEventParticipants();
    }, []);

    // if(actionSuccess){ 
    //     fetchAllEventParticipants();
    //     setActionSuccess(false);
    // }
    

  return (
        <div className="flex flex-col items-center mt-2 text-center">
            <h1 className='text-3xl text-white font-bold'>Participants by Event</h1>
            <div className='container mt-4 mb-20 w-4/5'>
                <DataTable columns={columns(setActionSuccess)} data={allEventParticipantsData} />
            </div>
        </div>
  )
};

export default AllEventParticipants;