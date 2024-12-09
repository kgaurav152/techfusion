"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { EditHospitalityUserButton, DeleteButton } from "./buttonBar";

export const columns = (setHospitalityUserData) => [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "editButton",
    cell: ({ row }) => {
      const co = row.original;
      return (
        <EditHospitalityUserButton
          selectedHospitalityUser={co}
          setHospitalityUserData={setHospitalityUserData}
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
          HospitalityUserId={co._id}
          setHospitalityUserData={setHospitalityUserData}
        />
      );
    },
  },
];
