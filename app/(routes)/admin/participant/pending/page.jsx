'use client'

import React, { useEffect, useState } from 'react' 
import {toast} from 'sonner'
import {columns} from './columns'
import { DataTable } from './data-table'
import { apiConnector } from '@/helpers/apiConnector';

export const PendingParticipants = () => {

    const [loading, setLoading] = useState(false); 

    const [pendingParticipantsData, setPendingParticipantsData] = useState([]);

    const fetchPendingParticipants = async () => {
        
        setLoading(true);
        try {
            const { data } = await apiConnector("POST","/api/getPendingParticipants"); 
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
            <div className='w-full'>
                <DataTable columns={columns(setPendingParticipantsData)} data={pendingParticipantsData} />
            </div>
        </div>
  )
};

export default PendingParticipants;