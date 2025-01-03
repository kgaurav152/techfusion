"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/app/(routes)/hospitality/school/event-management/_components/_eventParticipants/buttonBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// import { ApproveButton, RejectButton } from "@/app/admin/participant/all/buttonBar";

export const columns = (setActionSuccess) => [
  {
    accessorKey: "participants",
    header: "Leader TechFusion ID",
    cell: ({ row }) => {
      const { participants } = row.original;

      return (
        <div>
          <p>{participants[0].festId}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "team_leader_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Leader Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { participants } = row.original;

      return (
        <div>
          <p>{participants[0].name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "team_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { teamName } = row.original;

      return (
        <div>
          <p>{teamName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "parentPhoneNumber",
    header: "Parent Phone No.",
    cell: ({ row }) => {
      const { participants } = row.original;

      return (
        <div>
          <p>{participants[0].parentPhoneNumber}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "studentClass",
    header: "Class",
    cell: ({ row }) => {
      const { participants } = row.original;

      return (
        <div>
          <p>{participants[0].studentClass}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }) => {
      const { participants } = row.original;

      return (
        <div>
          <p>{participants[0].section}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => {
      const { participants } = row.original;

      return (
        <div>
          <p>{participants[0].rollNo}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "teamMembers",
    header: "Team Members",
    cell: ({ row }) => {
      const { participants } = row.original;
      if (!participants?.length) {
        return <p>Not Available</p>;
      }
      const filteredParticipants = participants.slice(1);
      return (
        <ScrollArea className="h-20 w-48 rounded-md border">
          {filteredParticipants.map((co) => (
            <>
              <div key={co} className="text-sm">
                {co.name}
              </div>
              <Separator className="my-1" />
            </>
          ))}
        </ScrollArea>
      );
    },
  },
  {
    accessorKey: "school",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          school
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { participants } = row.original;

      return (
        <div>
          <p>{participants[0].school}</p>
        </div>
      );
    },
  },
  {
    id: "deleteButton",
    cell: ({ row }) => {
      const pr = row.original;
      return (
        <DeleteButton
          participationId={pr._id}
          setActionSuccess={setActionSuccess}
        />
      );
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
];
