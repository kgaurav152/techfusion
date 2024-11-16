"use client";

import { ArrowUpDown, Eye, Image } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import {
  EditCoordinatorButton,
  DeleteButton,
} from "@/app/admin/manage-torch-bearers/manage-coordinator/_components/buttonBar";
import Link from "next/link";

export const columns = (setCoordinatorData) => [
  // {
  //   accessorKey: "caId",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         CA Id
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
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
            <FaLinkedin className="text-3xl hover:text-blue-600" />
          </Link>
        );
      } else {
        return <p>Not Available</p>;
      }
    },
  },
  {
    accessorKey: "instaId",
    header: "Instagram",
    cell: ({ row }) => {
      const co = row.original;
      if (co.instaId) {
        return (
          <Link
            href={co.instaId}
            target="_blank"
            className="flex justify-center"
          >
            <FaInstagram className="text-3xl hover:text-red-500" />
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
      const co = row.original;
      if (co.pictureUrl) {
        return (
          <Link
            href={co.pictureUrl}
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
    id: "editButton",
    cell: ({ row }) => {
      const co = row.original;
      return (
        <EditCoordinatorButton
          selectedCoordinator={co}
          setCoordinatorData={setCoordinatorData}
        />
      );
    },
  },
  {
    id: "deleteButton",
    cell: ({ row }) => {
      const co = row.original;
      return (
        <DeleteButton
          CoordinatorId={co._id}
          setCoordinatorData={setCoordinatorData}
        />
      );
    },
  },
];
