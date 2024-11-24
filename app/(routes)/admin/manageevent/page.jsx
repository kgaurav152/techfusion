'use client'

import React, { useEffect, useState } from 'react' 
import {toast} from 'sonner'
import {columns} from './columns'
import { DataTable } from './data-table'
import { CreateEventButton } from './buttonBar'
import { apiConnector } from '@/helpers/apiConnector';

export const EventManagement = () => {

    const [loading, setLoading] = useState(false); 

    const [eventData, setEventData] = useState([]);

    const fetchEventData = async () => {
        
        const toastId = toast.loading("Loading ...")
        setLoading(true);
        try {
            const { data } = await apiConnector("POST","/api/event/getAllEvent");
            setLoading(false);
            toast.dismiss(toastId);
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
    

  return (
        <div className="flex flex-col w-11/12 mx-auto items-center mt-2 mb-8 text-center">
            <CreateEventButton className="flex items-center" setEventData={setEventData}/>
            <h1 className='text-3xl text-white font-bold mt-8'>List of All Events</h1>
            <div className='w-full'>
                <DataTable columns={columns(setEventData)} data={eventData} />
            </div>
        </div>
    )
};

export default EventManagement;