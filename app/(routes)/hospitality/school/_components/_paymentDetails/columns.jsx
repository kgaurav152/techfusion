"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  ModifyPaymentStatusButton,
  EditSchoolStudentDetailsButton,
  DeleteSchoolStudentButton,
} from "@/app/(routes)/hospitality/school/_components/buttonBar";

export const columns = (fetchAllParticipants, userType) => {
  const baseColumns = [
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }) => {
        const student = row.original;
        return student?.createdBy ? (
          <p>{student?.createdBy?.name}</p>
        ) : (
          <p>N/A</p>
        );
      },
    },
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
      accessorKey: "school",
      header: "School",
    },
    {
      accessorKey: "studentClass",
      header: "Class",
    },
    {
      accessorKey: "section",
      header: "Section",
    },
    {
      accessorKey: "rollNo",
      header: "Roll No",
    },
    {
      accessorKey: "parentPhoneNumber",
      header: "Parent Phone No.",
    },
    {
      accessorKey: "registrationFee",
      header: "Registration Fee",
    },
    {
      accessorKey: "paymentReceivedBy",
      header: "Payment Received By",
    },
    {
      accessorKey: "idCardAllocation",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const student = row.original;
        if (userType === "admin") {
          return (
            <ModifyPaymentStatusButton
              schoolStudentId={student?.value}
              isPaymentConfirmed={student?.paymentStatus}
              fetchAllParticipants={fetchAllParticipants}
            />
          );
        } else {
          return student?.paymentStatus !== true ? (
            <ModifyPaymentStatusButton
              schoolStudentId={student?.value}
              isPaymentConfirmed={student?.paymentStatus}
              fetchAllParticipants={fetchAllParticipants}
            />
          ) : (
            <p className="text-purple-500">Marked Paid</p>
          );
        }
      },
    },
  ];

  // Conditionally add the "Edit" column for userType = admin
  if (userType === "admin") {
    baseColumns.push(
      {
        accessorKey: "edit",
        header: "Edit",
        cell: ({ row }) => {
          const schoolStudent = row.original;
          return (
            <EditSchoolStudentDetailsButton
              schoolStudent={schoolStudent}
              fetchAllParticipants={fetchAllParticipants}
            />
          );
        },
      },
      {
        accessorKey: "delete",
        header: "Delete",
        cell: ({ row }) => {
          const schoolStudent = row.original;
          // console.log(schoolStudent);
          return (
            <DeleteSchoolStudentButton
              schoolStudentId={schoolStudent.value}
              fetchParticipantsData={fetchAllParticipants}
            />
          );
        },
      }
    );
  }

  return baseColumns;
};
