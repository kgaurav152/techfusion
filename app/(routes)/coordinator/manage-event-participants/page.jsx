"use client";

import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { toast } from "sonner";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { apiConnector } from "@/helpers/apiConnector";
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
      event_id: event_id,
    };
    try {
      const { data } = await apiConnector(
        "POST",
        "/api/coordinator/getParticipantsByRelatedEvent",
        obj
      );
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
  };

  const fetchEvents = async () => {
    // setIsLoading(true);
    try {
      const { data } = await apiConnector(
        "POST",
        "/api/coordinator/getAllRelatedEvent"
      );
      // setIsLoading(false);
      if (data.success) {
        const unRestructuredEvents = data.data;
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
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (actionSuccess) {
    fetchAllEventParticipants();
    setActionSuccess(false);
  }

  return (
    <div className="flex w-11/12 mx-auto flex-col items-center mt-2 mb-8 text-center">
      {/* <Link
        href="/admin/event-registration-via-admin"
        className="md:w-auto my-4"
      >
        <Button className="w-full md:w-auto text-gray-800" variant="outline">
          Register participant for an event
        </Button>
      </Link> */}
      <h1 className="text-3xl text-white font-bold">Participants by Event</h1>
      <div className="container mt-4 mb-5 w-full">
        <Popover open={openPop} onOpenChange={setOpenPop}>
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
              {value
                ? eventData.find((event) => event.value === value)?.label
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
                        setValue(event.value);
                        setOpenPop(false);
                        fetchAllEventParticipants(event.value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === event.value ? "opacity-100" : "opacity-0"
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
      </div>
      <div className="w-full">
        {allEventParticipantsData.length > 0 && (
          <p className="text-white text-lg font-semibold">
            Total Participants : {allEventParticipantsData.length}
          </p>
        )}
        <DataTable
          columns={columns(setActionSuccess)}
          data={allEventParticipantsData}
        />
      </div>
    </div>
  );
};

export default AllEventParticipants;
