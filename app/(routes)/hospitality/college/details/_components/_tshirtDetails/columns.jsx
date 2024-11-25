"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// import { ApproveButton, RejectButton } from "@/app/admin/participant/all/buttonBar";

export const columns = (setAllParticipantsData) => [
  {
    accessorKey: "festId",
    header: "TechFusion ID",
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
    accessorKey: "mobile",
    header: "Phone No.",
  },
  {
    accessorKey: "college",
    header: "College",
  },
  {
    accessorKey: "tshirtOpted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Opted For S.S
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      const opted =
        data?.tShirtSize === "No" ? (
          <span className="bg-amber-100 px-3 py-1 rounded-xl text-amber-500">
            {" "}
            No
          </span>
        ) : (
          <span className="bg-green-100 px-3 py-1 rounded-xl text-green-500">
            Yes
          </span>
        );
      return <p>{opted}</p>;
    },
  },
  {
    accessorKey: "tshirtAllocation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sweat Shirt Allocated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const participant = row.original;
      return (
        <p>
          {participant?.tShirtAllocation ? (
            <span className="bg-green-100 px-3 py-1 rounded-xl text-green-500">
              Yes
            </span>
          ) : (
            <span className="bg-amber-100 px-3 py-1 rounded-xl text-amber-500">
              {" "}
              No
            </span>
          )}
        </p>
      );
    },
  },
];
