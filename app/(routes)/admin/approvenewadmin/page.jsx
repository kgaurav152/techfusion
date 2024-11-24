'use client'

import React, { useEffect, useState } from 'react'
// import Network from "@/components/network";
// import axios from "axios";
import {toast} from 'sonner'
import {columns} from './columns'
import { DataTable } from './data-table'
import { apiConnector } from '@/helpers/apiConnector';

export const PendingParticipants = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [pendingParticipantsData, setPendingParticipantsData] = useState([]);

    const fetchPendingParticipants = async () => {
        
        setLoading(true);
        try {
            const { data } = await apiConnector("POST","/api/getPendingParticipants"); 
            setLoading(false);
            if (data.success) {  
                const tempData = data.data;
                if (tempData.length > 0) {
                    setPendingParticipantsData(tempData.find((e) => e.college === 'Katihar Engineering College, Katihar'));
                }
            // setPendingParticipantsData(data.data);
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
        <div className="flex flex-col w-11/12 mx-auto items-center mt-2 text-center">
            <h1 className='text-3xl text-white font-bold'>Pending Participants of KEC</h1>
            <div className='w-full'>
                <DataTable columns={columns(setPendingParticipantsData)} data={pendingParticipantsData} />
            </div>
        </div>
  )
};

export default PendingParticipants;