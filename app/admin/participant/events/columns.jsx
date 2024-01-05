"use client"

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
  
// import { ApproveButton, RejectButton } from "@/app/admin/participant/all/buttonBar";

export const columns = (setActionSuccess) => [
  {
    accessorKey: 'participants',
    header: 'Leader TechFusion ID',
    cell: ({ row }) => {
      const  {participants}= row.original
      
      return (
        <div>
          <p>
          {participants[0].festId}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'team_leader_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Leader Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const  {participants}= row.original
      
      return (
        <div>
          <p>
          {participants[0].name}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'mobile',
    header: 'Phone No.',
    cell: ({ row }) => {
      const  {participants}= row.original
      
      return (
        <div>
          <p>
          {participants[0].mobile}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'teamMembers',
    header: 'Team Members',
    cell: ({ row }) => {
      const  {participants}= row.original
      
      return (
        <div>
          <p>
            { participants[1] ? (<>
              {participants[1]?.name}<br/>
              {participants[2]?.name}<br/>
              {participants[3]?.name}
              </>
            ) :(
              <div>-</div>
            )}
          
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'college',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          College
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const  {participants}= row.original
      
      return (
        <div>
          <p>
          {participants[0].college}
          </p>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'event',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Events
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     const  {event}= row.original
      
  //     return (
  //       <div>
  //         <p>
  //         {event?.name?event.name:'not available'}
  //         </p>
  //       </div>
  //     )
  //   },
  // },
]

  