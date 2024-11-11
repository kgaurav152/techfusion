"use client";

import { ArrowUpDown, Eye, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  EditButton,
  DeleteButton,
} from "@/app/admin/manage-torch-bearers/manage-campus-ambassador/_components/buttonBar";
import Link from "next/link";

export const columns = (setCampusAmbassadorData) => [
  {
    accessorKey: "caId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CA Id
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
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "college",
    header: "College",
  },
  {
    accessorKey: "batch",
    header: "Batch",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "linkedin",
    header: "Linkedin",
    cell: ({ row }) => {
      const ca = row.original;
      if (ca.linkedin) {
        return (
          <Link
            href={ca.linkedin}
            target="_blank"
            className="flex justify-center"
          >
            <Eye className="h-4 w-4 text-violet-500" />{" "}
            {/* change to linkedin icon */}
          </Link>
        );
      } else {
        return <p>Not Available</p>;
      }
    },
  },
  {
    accessorKey: "pictureUrl",
    header: "Picture URL",
    cell: ({ row }) => {
      const ca = row.original;
      if (ca.pictureUrl) {
        return (
          <Link
            href={ca.pictureUrl}
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
  // {
  //   id: "editButton",
  //   cell: ({ row }) => {
  //     const ca = row.original;
  //     return (
  //       <EditButton
  //         CampusAmbassadorId={ca._id}
  //         setCampusAmbassadorData={setCampusAmbassadorData}
  //       />
  //     );
  //   },
  // },
  {
    id: "deleteButton",
    cell: ({ row }) => {
      const ca = row.original;
      return (
        <DeleteButton
          CampusAmbassadorId={ca._id}
          setCampusAmbassadorData={setCampusAmbassadorData}
        />
      );
    },
  },
];
