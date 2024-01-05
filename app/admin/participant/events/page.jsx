'use client'

import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
// import { Button } from '@/components/ui/button';
import {columns} from '@/app/admin/participant/events/columns'
import { DataTable } from '@/app/admin/participant/events/data-table'
import { apiConnector } from '@/helpers/apiConnector';
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export const AllEventParticipants = () => {
    
    const [loading, setLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);  
    const [value, setValue] = React.useState("");
    const [eventData, setEventData] = useState([]);
    const [actionSuccess, setActionSuccess] = useState(false);
    const [allEventParticipantsData, setAllEventParticipantsData] = useState([]);

    const fetchAllEventParticipants = async (event_id) => {
        setLoading(true);
        const obj = {
            event_id: event_id
        }
        try {
            const { data } = await apiConnector("POST","/api/getParticipantsByEvent",obj);
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

    const fetchEvents = async () => {
        // setIsLoading(true);
        try {
            const { data } = await apiConnector("GET","/api/event/getAllEvent")
            // setIsLoading(false);
            if (data.success) {
            const unRestructuredEvents=data.data;
            const restructuredEvents = unRestructuredEvents.map((event) => ({
              label: `${event.eventId} - ${event.name}`,
              value: event._id,
              // participationMode:event.participationMode
            }));
            setEventData(restructuredEvents);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
      }
      
    useEffect(() => {
        fetchEvents();
    }, []);

    // if(actionSuccess){ 
    //     fetchAllEventParticipants();
    //     setActionSuccess(false);
    // }
    

  return (
        <div className="flex flex-col items-center mt-2 text-center">
            <h1 className='text-3xl text-white font-bold'>Participants by Event</h1>
            <div className='container mt-4 mb-5 w-4/5'>
                <Popover open={openPop} onOpenChange={setOpenPop}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        >
                        {value
                            ? eventData.find(
                                (event) => event.value === value
                            )?.label
                            : "Select Event"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder="Search Event..." />
                        <CommandEmpty>No Event found.</CommandEmpty>
                        <CommandGroup>
                                {eventData.map((event) => (
                                <CommandItem
                                    value={event.label}
                                    key={event.value}
                                    onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpenPop(false);
                                    fetchAllEventParticipants(currentValue);
                                    }}
                                >
                                    <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === event.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                    />
                                    {event.label}
                                </CommandItem>
                                ))}
                        </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className='container mt-4 mb-20 w-4/5'>
                <DataTable columns={columns(setActionSuccess)} data={allEventParticipantsData} />
            </div>
        </div>
  )
};

export default AllEventParticipants;