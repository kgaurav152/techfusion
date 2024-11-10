"use client";

// import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ApproveButton, DeleteButton } from "@/app/admin/manageevent/buttonBar";
import Link from "next/link";

export const columns = (setEventData) => [
  {
    accessorKey: "eventId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "participationMode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Participation Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <p className="w-20 md:w-32 lg:w-40 truncate">{event.description}</p>
      );
    },
  },
  {
    accessorKey: "ruleBook",
    header: "Rulebook Link",
    cell: ({ row }) => {
      const event = row.original;
      if (event.ruleBook) {
        return (
          <Link
            href={event.ruleBook}
            target="_blank"
            className="flex justify-center"
          >
            <Eye className="h-4 w-4 text-violet-500" />
          </Link>
        );
      } else {
        return <p>Not Available</p>;
      }
    },
  },
  {
    accessorKey: "posterUrl",
    header: "Poster URL",
    cell: ({ row }) => {
      const event = row.original;
      if (event.posterUrl) {
        return (
          <Link
            href={event.posterUrl}
            target="_blank"
            className="flex justify-center"
          >
            <Image className="h-6 w-6 text-emerald-400" />
          </Link>
        );
      } else {
        return <p>Not Available</p>;
      }
    },
  },
  {
    accessorKey: "min",
    header: "Minimum Participant",
    cell: ({ row }) => {
      const event = row.original;
      return <p className="w-20 md:w-32 lg:w-40 truncate">{event.min}</p>;
    },
  },
  {
    accessorKey: "max",
    header: "Maximum Participant",
    cell: ({ row }) => {
      const event = row.original;
      return <p className="w-20 md:w-32 lg:w-40 truncate">{event.max}</p>;
    },
  },
  {
    id: "deleteButton",
    cell: ({ row }) => {
      const event = row.original;
      return <DeleteButton EventId={event._id} setEventData={setEventData} />;
    },
  },
];
