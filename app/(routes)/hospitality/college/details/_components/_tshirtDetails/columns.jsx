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
  // {
  //   accessorKey: "tshirtOpted",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Opted For S.S
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const { participant } = row.original;
  //     const opted = participant?.tShirtSize === "No" ? "No" : "Yes";
  //     return <p>{opted}</p>;
  //   },
  // },
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
      const { participant } = row.original;
      return (
        <p className="">
          {participant?.tShirtAllocation == true ? "Yes" : "No"}
        </p>
      );
    },
  },
];
