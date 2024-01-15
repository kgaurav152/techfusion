'use client'

import React, { useEffect, useState } from 'react';
import { apiConnector } from '@/helpers/apiConnector';
import toast from "react-hot-toast";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check, Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
Command,
CommandEmpty,
CommandGroup,
CommandInput,
CommandItem,
} from "@/components/ui/command";
import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Input } from '@/components/ui/input';

export const ViewResultPage = () => {

    const [loading, setLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);  
    const [openCalPop, setOpenCalPop] = useState(false);  
    const [value, setValue] = React.useState("");
    const [date, setDate] = React.useState();
    const [eventData, setEventData] = useState([]);
    const [participantData, setParticipantData] = useState([]);

    
    const fetchEvents = async () => {
      try {
        const { data } = await apiConnector("POST","/api/event/getAllEvent")
        if (data.success) {
          const unRestructuredEvents=data.data;
          const restructuredEvents = unRestructuredEvents.map((event) => ({
            label: `${event.eventId} - ${event.name}`,
            value: event._id,
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

    const fetchEventResult= async (event_id) => {
      setLoading(true);
      const obj = {
          event_id: event_id
      }
      try {
        const { data } = await apiConnector("POST","/api/getParticipantsByEvent",obj);
        setLoading(false);
        if (data.success) {
          toast.success("Data Fetched Successfully!");
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }


    return (
      <div className="flex flex-col items-center mt-2 text-center">
        <h1 className='text-3xl text-white font-bold mb-8 mt-4'>View Result by Event</h1>
        <div className='container flex lg:flex-row flex-col justify-center mt-4 mb-5 w-full gap-4'>
            <Popover open={openPop} onOpenChange={setOpenPop} className="mt-4 mb-2">
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPop}
                    className={cn(
                        "justify-between w-[300px]",
                        !value && "text-muted-foreground"
                      )}
                    >
                    {value?eventData.find(
                            (event) => event.value === value
                        )?.label
                        : "Select Event"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                    <CommandInput placeholder="Search Event..." />
                    <CommandEmpty>No Event found.</CommandEmpty>
                    <ScrollArea className="h-48 overflow-auto">
                        <CommandGroup>
                                {eventData.map((event) => (
                                <CommandItem
                                    value={event.label}
                                    key={event.value}
                                    onSelect={() => {
                                    setValue(event.value)
                                    setOpenPop(false);
                                    fetchEventResult(event.value);
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
                    </ScrollArea>
                    </Command>
                </PopoverContent>
            </Popover>
            {/* <Popover open={openCalPop} onOpenChange={setOpenCalPop} className="mt-4 mb-2">
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                    setDate(d);                        
                    setOpenCalPop(false);                        
                    }}
                    initialFocus
                    />
                </PopoverContent>
            </Popover> */}
        </div>
        {date && participantData.length>0 && 
            <div>
                Hello Result !
            </div>
        }
      </div>
)};

export default ViewResultPage;