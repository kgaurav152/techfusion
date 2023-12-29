"use client"

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
  
import { ApproveButton, RejectButton, ViewImageButton } from "@/app/admin/participant/pending/buttonBar";

export const columns = (setPendingParticipantsData) => [
  {
    accessorKey: 'festId',
    header: 'TechFest ID'
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
    accessorKey: 'trx_id',
    header: 'Payment Id'
  },
  {
    accessorKey: 'trx_img',
    header: 'Payment SS',
    cell: ({ row }) => {
      const user = row.original
      if (user.trx_img) {
        return (
          <ViewImageButton imageUrl={user.trx_img}/>
        );
      } else {
        return <p>Not Available</p>;
      }
    },
  },
  {
    id: "approvebutton",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <ApproveButton  UserId={user.id} setPendingParticipantsData={setPendingParticipantsData} />
      )
    },
  },
  {
    id: "rejectbutton",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <RejectButton  UserId={user.id} setPendingParticipantsData={setPendingParticipantsData} />
      )
    },
  },
]

  