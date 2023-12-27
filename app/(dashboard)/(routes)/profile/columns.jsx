"use client"

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
  
// import { ApproveButton, RejectButton } from "@/app/admin/participant/all/buttonBar";

export const columns = (setActionSuccess) => [
  {
    accessorKey: 'id',
    header: 'Member/Lead Id'
  },
  {
    accessorKey: 'team_leader_name',
    header: 'Member/Team Lead Name'
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
  },
]

  