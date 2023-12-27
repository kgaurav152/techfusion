'use client'

import React, { useEffect, useState } from 'react'
import Network from "@/components/network";
import axios from "axios";
import toast from "react-hot-toast";
import {columns} from '@/app/admin/participant/pending/columns'
import { DataTable } from '@/app/admin/participant/pending/data-table'

export const PendingParticipants = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [pendingParticipantsData, setPendingParticipantsData] = useState([]);

    const fetchPendingParticipants = async () => {
        
        setLoading(true);
        try {
            const { data } = await axios.get("/api/getPendingParticipants");
            setLoading(false);
            if (data.success) {
            toast.success("Data Fetched Successfully!");
            setPendingParticipantsData(data.data);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
      fetchPendingParticipants();
    }, []);

    // if(actionSuccess){ 
    //     fetchPendingParticipants();
    //     setActionSuccess(false);
    // }
    

  return (
        <div className="flex flex-col items-center mt-2 text-center">
            <h1 className='text-3xl text-white font-bold'>Pending Participants</h1>
            <div className='container mt-4 mb-20 w-4/5'>
                <DataTable columns={columns(setPendingParticipantsData)} data={pendingParticipantsData} />
            </div>
        </div>
  )
};

export default PendingParticipants;