"use client"

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button"; 
  
import { ApproveButton, RejectButton, ViewImageButton } from "./buttonBar";
  
const paymentMethodMapping={
  ba: 'Bank Account',
  ca: 'Campus Ambassador'
};

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
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => {

      const paymentMethodValue = row.getValue('paymentMethod');
      const paymentMethodName = paymentMethodMapping[paymentMethodValue];

      return (
        
        `${paymentMethodName}` || 'Unknown'
      );
    },
  },
  {
    accessorKey: 'registrationFee',
    header: 'Registration Fee'
  },
  {
    accessorKey: 'transactionId',
    header: 'Payment Id'
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
        <ApproveButton  UserId={user._id} setPendingParticipantsData={setPendingParticipantsData} />
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

  