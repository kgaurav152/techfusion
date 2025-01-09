"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiConnector } from "@/helpers/apiConnector";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { studentClasses, sections, deskManagers } from "@/public/constants";

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

export function EditSchoolStudentDetailsForm({
  setOpen,
  schoolStudent,
  fetchAllParticipants,
}) {
  const SchoolStudentRegistrationFormSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 5 or more characters long" }),
    parentPhoneNumber: z
      .string()
      .min(10, { message: "Mobile no. must be 10 digits" })
      .max(10, { message: "Mobile no. must be 10 digits" })
      .optional(),
    gender: z.enum(["Male", "Female"], { message: "Select a valid option" }),
    school: z.string({ message: "Must be a valid School Name" }),
    studentClass: z.string({ message: "Must be a valid class" }),
    section: z.string().optional(),
    rollNo: z
      .string()
      .refine((val) => !isNaN(Number(val)), "Roll No must be a valid number"),
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(SchoolStudentRegistrationFormSchema),
    mode: "onChange",
    defaultValues: {
      name: schoolStudent?.name,
      parentPhoneNumber: schoolStudent?.parentPhoneNumber,
      gender: schoolStudent?.gender,
      school: schoolStudent?.school,
      studentClass: schoolStudent?.studentClass,
      section: schoolStudent?.section,
      rollNo: schoolStudent?.rollNo,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const obj = {
      name: data.name,
      parentPhoneNumber: data.parentPhoneNumber,
      gender: data.gender,
      studentClass: data.studentClass,
      section: data.section,
      rollNo: data.rollNo.toString(),
    };

    const timeoutError = setTimeout(() => {
      toast.error("Request timed out. Please try again later.");
      setIsLoading(false);
    }, 120000);

    var toastId;

    try {
      toastId = toast.loading("Updating Student Details...");
      const { data } = await apiConnector(
        "PUT",
        "/api/school/updateSchoolStudentDetails",
        { schoolStudentId: schoolStudent?.value, updateData: obj }
      );
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("School Student Details Updated!");
        setOpen(false);
        fetchAllParticipants();
      } else {
        toast.error(data.message);
      }
      clearTimeout(timeoutError);
      setIsLoading(false);
    } catch (err) {
      clearTimeout(timeoutError);
      toast.error("Something went wrong. Please try again later.");
      toast.dismiss(toastId);
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:gap-4 mb-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Full Name" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent&apos;s Mobile No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Parent's Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School*</FormLabel>
                  <FormControl>
                    <Input placeholder="School Name*" {...field} disabled />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentClasses &&
                        studentClasses.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sections &&
                        sections.map((item, index) => (
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
            <FormField
              control={form.control}
              name="rollNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll No*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Roll No"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="transition mx-auto ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
          >
            Submit
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}

export function EditSchoolStudentDetailsButton({
  schoolStudent,
  fetchAllParticipants,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-green-300">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit School Student Details</DialogTitle>
        </DialogHeader>
        <EditSchoolStudentDetailsForm
          setOpen={setOpen}
          schoolStudent={schoolStudent}
          fetchAllParticipants={fetchAllParticipants}
        />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteSchoolStudentForm({
  setOpen,
  schoolStudentId,
  fetchParticipantsData,
}) {
  const handleSchoolStudentDeletion = async () => {
    const obj = {
      schoolStudentId: schoolStudentId,
    };

    try {
      const toastId = toast.loading("Loading...");

      const { data } = await apiConnector(
        "DELETE",
        "/api/school/deleteSchoolStudent",
        obj
      );
      toast.dismiss(toastId);
      if (data.success) {
        setOpen(false);
        toast.success("School Student Deleted!");
        fetchParticipantsData();
      } else {
        toast.error(data.message);
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white text-center">
      <p className="mb-4">
        Are you sure you want to delete this school student?
      </p>
      <Button
        className="mr-8"
        variant="destructive"
        type="button"
        onClick={handleSchoolStudentDeletion}
      >
        Delete
      </Button>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export function DeleteSchoolStudentButton({
  schoolStudentId,
  fetchParticipantsData,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete School Student</DialogTitle>
        </DialogHeader>
        <DeleteSchoolStudentForm
          setOpen={setOpen}
          schoolStudentId={schoolStudentId}
          fetchParticipantsData={fetchParticipantsData}
        />
      </DialogContent>
    </Dialog>
  );
}
