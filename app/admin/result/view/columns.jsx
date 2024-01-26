"use client"

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import DeleteResult from './DeleteResult';
  
// import { ApproveButton, RejectButton } from "@/app/admin/participant/all/buttonBar";

export const columns = (setParticipantData,allResultId) => [
  {
    accessorKey: 'festId',
    header: 'TechFusion ID',
    cell: ({ row }) => {
        const  {participant}= row.original
        
        return (
          <div>
            <p>
            <span>{participant.participants[0].festId}</span></p> 
          </div>
        )
      },
  }, 
  {
    accessorKey: 'Team Leader Name',
    header: "Team  Leader Name",
    cell: ({ row }) => {
        const  {participant}= row.original
        
        return (
          <div>
            <p>
            <span>{participant.participants[0].name}</span></p> 
          </div>
        )
      },
  },
  {
    accessorKey: 'Team Name',
    header: "Team Name",
    cell: ({ row }) => {
        const  {participant}= row.original
        
        return (
          <div>
            <p>
            <span>{participant.teamName}</span></p> 
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
        const  {participant}= row.original
        
        return (
          <div>
            <p>
            <span>{participant.participants[0].college}</span></p> 
          </div>
        )
      },
  },
  {
    accessorKey: 'Rank',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rank
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const  {rank}= row.original
      
      return (
        <div>
          <p>
          <span> {rank}</span></p> 
        </div>
      )
    },
  },
  {
    accessorKey: 'Score',
    header:  "Score",
    cell: ({ row }) => {
      const  {score}= row.original
      
      return (
        <div>
          <p>
          <span> {score}</span></p> 
        </div>
      )
    },
  },
{
    accessorKey: 'Description',
    header:  "Description",
    cell: ({ row }) => {
      const  {description}= row.original
      
      return (
        <div>
          <p>
          <span> {description}</span></p> 
        </div>
      )
    },
},
{
    accessorKey: 'Delete',
    header:  "Delete",
    cell: ({ row }) => {
      const  {description,_id}= row.original
      
      return (
        <div className='print:hidden'>
          <DeleteResult resultId ={_id} allResultId={allResultId} setParticipantData={setParticipantData}/>
        </div>
      )
    },
}
]

  