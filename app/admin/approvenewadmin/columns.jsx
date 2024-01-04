"use client"

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
  
import { ApproveAdminButton, RejectButton, ViewImageButton } from "@/app/admin/approvenewadmin/buttonBar";

export const columns = (setPendingParticipantsData) => [
  {
    accessorKey: 'festId',
    header: 'TechFusion ID'
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
    accessorKey: 'screenshotImage',
    header: 'Payment SS',
    cell: ({ row }) => {
      const user = row.original
      if (user.screenshotImage) {
        return (
          <ViewImageButton imageUrl={user.screenshotImage}/>
        );
      } else {
        return <p>Not Available</p>;
      }
    },
  },
  {
    id: "approvebutton",
    header:'Approve',
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <ApproveAdminButton  UserId={user._id} setPendingParticipantsData={setPendingParticipantsData} />
      )
    },
  },
  {
    id: "rejectbutton",
    header:'Reject',
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <RejectButton  UserId={user._id} setPendingParticipantsData={setPendingParticipantsData} />
      )
    },
  },
]

  