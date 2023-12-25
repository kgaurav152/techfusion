'use client'

import React, { useEffect, useState } from 'react'
import Network from "@/components/network";
import axios from "axios";
import toast from "react-hot-toast";
import {user, columns} from '@/app/(dashboard)/(routes)/admin/participant/pending/columns'
import { DataTable } from '@/app/(dashboard)/(routes)/admin/participant/pending/data-table'

export const PendingParticipants = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [pendingParticipantsData, setPendingParticipantsData] = useState([]);

    const fetchPendingParticipants = async () => {
        // new Network().hit("employee", "all", {}, (responseData) => {
        //   if (responseData) {
        //     setPendingParticipantsData(responseData);
        //   }
        // });
        setLoading(true);
        try {
            const { data } = await axios.post("/api/pending",{});
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

    if(actionSuccess){ 
        fetchPendingParticipants();
        setActionSuccess(false);
    }
    

  return (
        <div className="flex flex-col items-center justify-center mt-2 text-center">
            <h1 className='text-3xl font-bold'>Pending Participants</h1>
            <div className='container'>
                <DataTable columns={columns} data={pendingParticipantsData} />
            </div>
        </div>
  )
};

export default PendingParticipants;