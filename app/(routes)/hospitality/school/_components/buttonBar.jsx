"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiConnector } from "@/helpers/apiConnector";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deskManagers } from "@/public/constants";

export function ModifyPaymentStatusForm({
  setOpen,
  schoolStudentId,
  isPaymentConfirmed,
  fetchAllParticipants,
}) {
  const form = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const obj = {
      schoolStudentId: schoolStudentId,
      isPaymentConfirmed: !isPaymentConfirmed,
      paymentReceivedBy:
        isPaymentConfirmed === false ? data.paymentReceivedBy : null,
    };

    try {
      const toastId = toast.loading("Loading...");
      const { data } = await apiConnector(
        "POST",
        "/api/school/schoolStudentPaymentStatusModification",
        obj
      );
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Payment Status Modified!");
        setOpen(false);
        fetchAllParticipants();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white text-center">
      <p className="mb-4">
        {isPaymentConfirmed === false
          ? "Are you sure you want to mark it as paid?"
          : "Are you sure you want to mark it unpaid?"}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {isPaymentConfirmed === false && (
            <FormField
              control={form.control}
              name="paymentReceivedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Payment Received By*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Coordinator" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deskManagers &&
                        deskManagers.map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item.value}
                          >{`${item.label}`}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button className="mr-8" variant="default" type="submit">
            Confirm
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function ModifyPaymentStatusButton({
  schoolStudentId,
  isPaymentConfirmed,
  fetchAllParticipants,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={
            isPaymentConfirmed
              ? "text-red-500 hover:text-red-700"
              : "text-green-400 hover:text-green-500"
          }
        >
          {isPaymentConfirmed ? "Mark Unpaid" : "Mark as Paid"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Payment Status</DialogTitle>
        </DialogHeader>
        <ModifyPaymentStatusForm
          setOpen={setOpen}
          schoolStudentId={schoolStudentId}
          isPaymentConfirmed={isPaymentConfirmed}
          fetchAllParticipants={fetchAllParticipants}
        />
      </DialogContent>
    </Dialog>
  );
}

export function ModifyIdCardAllocationStatusForm({
  setOpen,
  schoolStudentId,
  idCardAllocation,
  registeredStudent,
  fetchAllParticipants,
}) {
  const form = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const obj = {
      schoolStudentId: schoolStudentId,
      idCardAllocation: !idCardAllocation,
    };

    try {
      const toastId = toast.loading("Loading...");
      const { data } = await apiConnector(
        "POST",
        "/api/school/schoolStudentIdCardAllocation",
        obj
      );
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Id Allocation Status Modified!");
        setOpen(false);
        fetchAllParticipants();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white text-center">
      <p className="mb-4">
        {idCardAllocation === false
          ? "Allocate Id card Below:"
          : "Are you sure you want to De-Allocate Id Card?"}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {idCardAllocation === false && (
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="mb-2 text-center font-extrabold">
                Student Details:
              </h2>
              <p className="font-mono mb-2">
                Student&apos;s TechFusion Id:{" "}
                {registeredStudent.festId ? (
                  <strong>{registeredStudent.festId}</strong>
                ) : (
                  <span className="text-red-600">not available</span>
                )}
              </p>
              <p className="font-mono mb-2">
                Name:{" "}
                <b>
                  {registeredStudent.name ? (
                    registeredStudent.name
                  ) : (
                    <span className="text-red-600">not available</span>
                  )}
                </b>{" "}
                !
              </p>
              <p className="font-mono mb-2">
                School:{" "}
                {registeredStudent?.school ? (
                  registeredStudent.school
                ) : (
                  <span className="text-red-600">not available</span>
                )}
              </p>
              <p className="font-mono mb-2">
                Class:{" "}
                {registeredStudent?.studentClass ? (
                  registeredStudent.studentClass
                ) : (
                  <span className="text-red-600">not available</span>
                )}
              </p>
              <p className="font-mono mb-2">
                Section:{" "}
                {registeredStudent?.section ? (
                  registeredStudent.section
                ) : (
                  <span className="text-red-600">not available</span>
                )}
              </p>
              <p className="font-mono mb-2">
                Roll No:{" "}
                {registeredStudent?.rollNo ? (
                  registeredStudent.rollNo
                ) : (
                  <span className="text-red-600">not available</span>
                )}
              </p>
              <p className="font-mono mb-2">
                Parent Phone No:{" "}
                {registeredStudent?.parentPhoneNumber ? (
                  registeredStudent.parentPhoneNumber
                ) : (
                  <span className="text-red-600">not available</span>
                )}
              </p>
              <p className="font-mono mb-2">
                Payment Status:{" "}
                {registeredStudent?.paymentStatus === true ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>
            </div>
          )}
          <Button className="mr-8" variant="default" type="submit">
            {idCardAllocation === false ? "Allocate Id" : "Confirm"}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function ModifyIdCardAllocationStatusButton({
  schoolStudentId,
  isPaymentConfirmed,
  idCardAllocation,
  registeredStudent,
  fetchAllParticipants,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={
            idCardAllocation
              ? "text-red-500 hover:text-red-700"
              : "text-green-400 hover:text-green-500"
          }
          disabled={isPaymentConfirmed === false}
        >
          {!isPaymentConfirmed
            ? "Payment Pending"
            : idCardAllocation
            ? "Is this a mistake?"
            : "Allocate Id"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Id card Allocation Status</DialogTitle>
        </DialogHeader>
        <ModifyIdCardAllocationStatusForm
          setOpen={setOpen}
          schoolStudentId={schoolStudentId}
          idCardAllocation={idCardAllocation}
          isPaymentConfirmed={isPaymentConfirmed}
          registeredStudent={registeredStudent}
          fetchAllParticipants={fetchAllParticipants}
        />
      </DialogContent>
    </Dialog>
  );
}
