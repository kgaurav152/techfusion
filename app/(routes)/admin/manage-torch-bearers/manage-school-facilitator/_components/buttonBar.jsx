"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { apiConnector } from "@/helpers/apiConnector";

export function SchoolFacilitatorCreationForm({
  setOpen,
  setSchoolFacilitatorData,
}) {
  const SchoolFacilitatorCreationFormSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 2 or more characters long" }),
    email: z.string().email(),
    password: z.string({ message: "Must be a password" }),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(SchoolFacilitatorCreationFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const obj = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const toastId = toast.loading("Creating SchoolFacilitator...");

      const { data } = await apiConnector(
        "POST",
        "/api/admin/schoolFacilitator/createSchoolFacilitator",
        obj
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("SchoolFacilitator Created!");
        setOpen(false);
        setSchoolFacilitatorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Name of School Facilitator*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Name of School Facilitator"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Email of School Facilitator"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Password for School Facilitator"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="transition w-full ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
        >
          Create School Facilitator
        </Button>
      </form>
    </Form>
  );
}

export function CreateSchoolFacilitatorButton({ setSchoolFacilitatorData }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New School Facilitator</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#00040F]">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl text-center">
            Create New School Facilitator
          </DialogTitle>
          <DialogDescription className="text-lg text-center">
            Fill details below carefully!
          </DialogDescription>
        </DialogHeader>
        <SchoolFacilitatorCreationForm
          setOpen={setOpen}
          setSchoolFacilitatorData={setSchoolFacilitatorData}
        />
      </DialogContent>
    </Dialog>
  );
}

export function SchoolFacilitatorEditForm({
  setOpen,
  setSchoolFacilitatorData,
  selectedSchoolFacilitator,
}) {
  const SchoolFacilitatorCreationFormSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 2 or more characters long" }),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(SchoolFacilitatorCreationFormSchema),
    mode: "onChange",
    defaultValues: {
      name: selectedSchoolFacilitator?.name,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const updateData = {
      name: data.name,
    };

    try {
      const toastId = toast.loading("Updating School Facilitator...");

      const { data } = await apiConnector(
        "PUT",
        `/api/admin/schoolFacilitator/updateSchoolFacilitator`,
        { schoolFacilitatorId: selectedSchoolFacilitator?._id, updateData }
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("School Facilitator Updated!");
        setOpen(false);
        setSchoolFacilitatorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update School Facilitator.");
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex flex-col items-center mb-8"
        >
          <div className="mx-auto gap-2 max-w-xl mb-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Name of School Facilitator*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name of School Facilitator"
                      {...field}
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
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center"
          >
            Update School Facilitator
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}

export function EditSchoolFacilitatorButton({
  selectedSchoolFacilitator,
  setSchoolFacilitatorData,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-green-300">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#00040F]">
        <DialogHeader>
          <DialogTitle className="text-white">
            Edit School Facilitator Details
          </DialogTitle>
        </DialogHeader>
        <SchoolFacilitatorEditForm
          setOpen={setOpen}
          setSchoolFacilitatorData={setSchoolFacilitatorData}
          selectedSchoolFacilitator={selectedSchoolFacilitator}
        />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteSchoolFacilitatorForm({
  setOpen,
  SchoolFacilitatorId,
  setSchoolFacilitatorData,
}) {
  const handleSchoolFacilitatorDeletion = async () => {
    const obj = {
      schoolFacilitatorId: SchoolFacilitatorId,
    };

    try {
      const toastId = toast.loading("Deleting...");
      const { data } = await apiConnector(
        "DELETE",
        "/api/admin/schoolFacilitator/deleteSchoolFacilitator",
        obj
      );
      console.log(data);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("SchoolFacilitator Deleted!");
        setOpen(false);
        setSchoolFacilitatorData(data.data);
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
        Are you sure you want to delete this School Facilitator?
      </p>
      <Button
        className="mr-8"
        variant="destructive"
        type="button"
        onClick={handleSchoolFacilitatorDeletion}
      >
        Confirm
      </Button>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export function DeleteButton({
  SchoolFacilitatorId,
  setSchoolFacilitatorData,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete School Facilitator</DialogTitle>
        </DialogHeader>
        <DeleteSchoolFacilitatorForm
          setOpen={setOpen}
          SchoolFacilitatorId={SchoolFacilitatorId}
          setSchoolFacilitatorData={setSchoolFacilitatorData}
        />
      </DialogContent>
    </Dialog>
  );
}
