'use client'

import React, { useEffect, useState } from 'react';
import { apiConnector } from '@/helpers/apiConnector';
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check, Plus, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';

export const CustomParticipantSelector = ({ value, onChange, participantData }) => {
    const [open, setOpen] = useState(false);
  
    return (
      <Popover open={open} onOpenChange={setOpen} className="w-[300px]">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between w-full",
              !value && "text-muted-foreground"
            )}
          >
            {value ? participantData.find((participant) => participant.value === value)?.label : "Select Team/participant"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search Team/Participant..." />
            <CommandEmpty>No Team/Participant found.</CommandEmpty>
            <ScrollArea className="h-48 overflow-auto">
              <CommandGroup>
                {participantData.map((participant) => (
                  <CommandItem
                    value={participant.label}
                    key={participant.value}
                    onSelect={() => {
                      onChange(participant.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === participant.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {participant.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    );
};

export const CreateResultPage = () => {

    const [loading, setLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);
    const [openCalPop, setOpenCalPop] = useState(false);  
    const [value, setValue] = React.useState(""); 
    const [round, setRound] = useState("");
    const [eventData, setEventData] = useState([]);
    const [participantData, setParticipantData] = useState([]);
    const [rows, setRows] = useState([{ participant: '', rank: '', score: '', description: '' }]);
    const [allEventParticipantsData, setAllEventParticipantsData] = useState([]);

    
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

    const reStructureParticipant = () => {        
      if (allEventParticipantsData.length > 0) {
        const restructuredParticipants = allEventParticipantsData.map((participant) => ({
          label: `${participant.participants[0].festId} - ${participant.teamName}`,
          value: participant._id,
        }));
        setParticipantData(restructuredParticipants);
      }
    };
      
    useEffect(() => {
      reStructureParticipant();
    }, [allEventParticipantsData]);
    
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { participant: '', rank: '', score: '', description: '' }]);
  };

  const handleSubmit = async () => {
    try {
      
    const resultArray = rows.filter(row => row.participant)
    .map((row) => ({
      participant_id: row.participant,
      rank: row.rank,
      score: row.score,
      description: row.description,
    }));

    const submissionObj = {
      event_id: value,
      event_round: round,
      result: resultArray,
    };

    console.log(submissionObj);

    } catch (error) {
    }
  };


    return (
      <div className="flex flex-col items-center mt-2 text-center">
        <h1 className='text-3xl text-white font-bold mb-8 mt-4'>Create Result by Event</h1>
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
                                    fetchAllEventParticipants(event.value);
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
            <Select onValueChange={(v) => {setRound(v);}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select round" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="Round 1">Round 1</SelectItem>
                  <SelectItem value="Round 2">Round 2</SelectItem>
                  <SelectItem value="Round 3">Round 3</SelectItem>
                  <SelectItem value="Round 4">Round 4</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
              </SelectContent>
            </Select>
        </div>
        {round && participantData.length>0 && rows.map((row, index) => (
            <div key={index} className='flex flex-row gap-3 mt-2 mb-2'>
                <CustomParticipantSelector
                value={row.participant}
                onChange={(selectedParticipant) => handleInputChange(index, 'participant', selectedParticipant)}
                participantData={participantData}
                />
                <Input
                    value={row.rank}
                    placeholder="Rank"
                    onChange={(e) => handleInputChange(index, 'rank', e.target.value)}
                />
                <Input
                    value={row.score}
                    onChange={(e) => handleInputChange(index, 'score', e.target.value)}
                    placeholder="Score"
                />
                <Input
                    value={row.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    placeholder="Description"
                />
                <Button onClick={() => handleDeleteRow(index)} className="ml-2" ><Trash2 className=" text-red-600"/></Button>
            </div>
        ))}
        {round && participantData.length>0 && 
          <>              
            <Button onClick={handleAddRow} className="mt-5 mb-4" ><Plus className=" text-green-400"/></Button>
            <Button onClick={handleSubmit} className="mt-10 mb-10">Submit</Button>
          </>
        }
      </div>
)};

export default CreateResultPage;