"use client"

// import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
  
import { ApproveButton, DeleteButton } from "@/app/admin/manageevent/buttonBar";
import Link from "next/link";

export const columns = (setEventData) => [
  {
    accessorKey: 'id',
    header: 'Event Id'
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'eventType',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'participationMode',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Participation Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const event = row.original
      return (
        <p className="truncate ...">{event.description}</p>
      )
    },
  },
  {
    accessorKey: 'rulebookLink',
    header: 'Rulebook Link',
    cell: ({ row }) => {
      const event = row.original
      return (
        <Link href={event.relebookLink} target="_blank"><Eye className="h-4 w-4"/></Link>
      )
    },
  },
  {
    accessorKey: 'posterUrl',
    header: 'Poster URL'
  },
  // {
  //   id: "approveButton",
  //   cell: ({ row }) => {
  //     const user = row.original
 
  //     return (
  //       <ApproveButton  UserId={user._id} setEventData={setEventData} />
  //     )
  //   },
  // },
  {
    id: "deleteButton",
    cell: ({ row }) => {
      const event = row.original
      return (
        <DeleteButton  EventId={event._id} setEventData={setEventData} />
      )
    },
  },
]

  