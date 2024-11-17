'use client'

import React, { useEffect, useState } from 'react';
import {toast} from 'sonner'
import {columns} from '@/app/admin/hospitality/details/columns'
import { DataTable } from '@/app/admin/hospitality/details/data-table'
import { apiConnector } from '@/helpers/apiConnector';

export const AllParticipants = () => {

    const [loading, setLoading] = useState(false);

    const [allParticipantsData, setAllParticipantsData] = useState([]);

    const fetchAllParticipants = async () => {
       
        setLoading(true);
        try {
            const { data } = await apiConnector("POST","/api/getAllParticipants"); 
            setLoading(false);
            if (data.success) {
            toast.success("Data Fetched Successfully!");
            setAllParticipantsData(data.data);
            } else {
             toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
      fetchAllParticipants();
    }, []);

  return (
        <div className="flex flex-col items-center mt-2 text-center">
            <h1 className='text-3xl text-white font-bold'>All Participants Hospitality Details</h1>
            <div className='w-full'>
                <DataTable columns={columns(setAllParticipantsData)} data={allParticipantsData} />
            </div>
        </div>
  )
};

export default AllParticipants;