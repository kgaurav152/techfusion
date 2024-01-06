"use client"

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { useSelector } from 'react-redux';
  
import { DeleteButton } from "@/app/(dashboard)/(routes)/profile/buttonBar";

export const columns = (user,setParticipatingEventsData) => [
  {
    accessorKey: 'team_leader_name',
    header: 'Team Leader ID',
    cell: ({ row }) => {
      const {participants} = row.original
      return (
        <p className="">{participants[0].festId}</p>
      )
    },

  },
  {
    accessorKey: 'team_leader_name',
    header: 'Team Leader Name',
    cell: ({ row }) => {
      const {participants} = row.original
      return (
        <p className="">{participants[0].name}</p>
      )
    },

  },
  {
    accessorKey: 'events',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name of Event
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const {event} = row.original
      return (
        <p className="">{event?.name}</p>
      )
    },
  },
  {
    accessorKey: 'events',
    header: 'Type of Event',
    cell: ({ row }) => {
      const {event} = row.original
      return (
        <p className="">{event?.eventType}</p>
      )
    },
  },
  {
    accessorKey: '',
    header: 'Team Member Name',
    cell: ({ row }) => {
      const {participants} = row.original
      return (
        <p className="">
          {
            participants[1] ? (
              <>
                <p>{participants[1]?.name}</p>
                <p>{participants[2]?.name}</p>
                <p>{participants[3]?.name}</p>
              </>
            ) : (
              <div>-</div>
            )
          }
        </p>
      )
    },
  },  
  {
    accessorKey: '',
    header: 'Delete',
    cell: ({ row }) => { 
      const {participants} = row.original
      return (
        <>
          {
            participants[0]?._id === user?._id ? <DeleteButton setParticipatingEventsData={setParticipatingEventsData} participationId={participationId}/> : (<div>Ask Leader to Delete</div>)  
          }
        </>
      )
    },
  },
  
  
]

  