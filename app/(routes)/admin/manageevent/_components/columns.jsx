"use client";

// import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ApproveButton, DeleteButton } from "./buttonBar";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export const columns = (setEventData, meantFor) => {
  const baseColumns = [
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
      accessorKey: "eventDateTime",
      header: "Event Date Time",
      cell: ({ row }) => {
        const event = row.original;
        let formattedDateTime = "N/A";
        if (event?.eventDateTime) {
          try {
            formattedDateTime = format(
              new Date(event.eventDateTime),
              "dd MMM yyyy, hh:mm a"
            );
          } catch (error) {
            console.error("Invalid eventDateTime:", event.eventDateTime, error);
          }
        }
        return <p>{formattedDateTime}</p>;
      },
    },
    {
      accessorKey: "eventRegistrationDateTime",
      header: "Event Registration Closing Date Time",
      cell: ({ row }) => {
        const event = row.original;
        let formattedDateTime = "N/A";
        if (event?.eventRegistrationDateTime) {
          try {
            formattedDateTime = format(
              new Date(event.eventRegistrationDateTime),
              "dd MMM yyyy, hh:mm a"
            );
          } catch (error) {
            console.error(
              "Invalid eventRegistrationDateTime:",
              event.eventRegistrationDateTime,
              error
            );
          }
        }
        return <p>{formattedDateTime}</p>;
      },
    },
    {
      id: "deleteButton",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <DeleteButton
            EventId={event._id}
            setEventData={setEventData}
            meantFor={meantFor}
          />
        );
      },
    },
  ];

  if (meantFor != "School") {
    baseColumns.splice(-1, 0, {
      accessorKey: "coordinators",
      header: "Coordinators",
      cell: ({ row }) => {
        const ev = row.original;
        if (ev?.coordinators?.length > 0) {
          return (
            <ScrollArea className="h-20 w-48 rounded-md border">
              {ev.coordinators.map((coordinator, index) => (
                <div key={index} className="text-sm">
                  {coordinator.name}
                  <Separator className="my-1" />
                </div>
              ))}
            </ScrollArea>
          );
        } else {
          return <p>Not Available</p>;
        }
      },
    });
  }

  return baseColumns;
};
