'use client'

import React, { useEffect, useState } from 'react'
import Network from "@/components/network";
import axios from "axios";
import toast from "react-hot-toast";
import {columns} from '@/app/admin/participant/all/columns'
import { DataTable } from '@/app/admin/participant/all/data-table'
import { apiConnector } from '@/helpers/apiConnector';

export const AllParticipants = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

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
            <h1 className='text-3xl text-white font-bold'>All Participants</h1>
            <div className='container mt-4 mb-20 w-4/5'>
                <DataTable columns={columns(setAllParticipantsData)} data={allParticipantsData} />
            </div>
        </div>
  )
};

export default AllParticipants;