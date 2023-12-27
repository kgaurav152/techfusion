'use client'

import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import {columns} from '@/app/admin/manageevent/columns'
import { DataTable } from '@/app/admin/manageevent/data-table'
import { CreateEventButton } from '@/app/admin/manageevent/buttonBar'

export const EventManagement = () => {

    const [loading, setLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    const [eventData, setEventData] = useState([]);

    const fetchEventData = async () => {
        
        setLoading(true);
        try {
            const { data } = await axios.get("/api/event");
            setLoading(false);
            if (data.success) {
            toast.success("Data Fetched Successfully!");
            setEventData(data.data);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
      fetchEventData();
    }, []);

    // if(actionSuccess){ 
    //     fetchEventData();
    //     setActionSuccess(false);
    // }
    

  return (
        <div className="flex flex-col items-center mt-2 text-center">
            <CreateEventButton className="flex items-center"/>
            <h1 className='text-3xl text-white font-bold mt-8'>List of All Events</h1>
            <div className='container mt-4 mb-20 w-4/5'>
                <DataTable columns={columns(setEventData)} data={eventData} />
            </div>
        </div>
  )
};

export default EventManagement;