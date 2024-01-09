"use client"

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
  
// import { ApproveButton, RejectButton } from "@/app/admin/participant/all/buttonBar";

export const columns = (setAllParticipantsData) => [
  {
    accessorKey: 'festId',
    header: 'TechFusion ID'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
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
    accessorKey: 'mobile',
    header: 'Phone No.'
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
  },
  {
    accessorKey: 'accomodation',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Accomodation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'Event Count',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No. Events
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const  {technical,cultural}= row.original
      
      return (
        <div>
          <p  className='grid grid-cols-5'>
          <span className='col-span-3'>Technical</span> <span>:</span> <span> {technical.length}</span></p>
       <p  className='grid grid-cols-5'>   <span className='col-span-3'>Cultural</span> <span>:</span><span>{cultural.length}</span> 
          </p>
        </div>
      )
    },
  },
]

  