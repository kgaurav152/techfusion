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

export function HospitalityUserCreationForm({
  setOpen,
  setHospitalityUserData,
}) {
  const HospitalityUserCreationFormSchema = z.object({
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
    resolver: zodResolver(HospitalityUserCreationFormSchema),
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
      const toastId = toast.loading("Creating HospitalityUser...");

      const { data } = await apiConnector(
        "POST",
        "/api/admin/hospitality/createHospitalityUser",
        obj
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("HospitalityUser Created!");
        setOpen(false);
        setHospitalityUserData(data.data);
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
                Name of Hospitality User*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Name of Hospitality User"
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
                  placeholder="Enter Email of Hospitality User"
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
                  placeholder="Enter Password for Hospitality User"
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
          Create Hospitality User
        </Button>
      </form>
    </Form>
  );
}

export function CreateHospitalityUserButton({ setHospitalityUserData }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Hospitality User</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#00040F]">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl text-center">
            Create New Hospitality User
          </DialogTitle>
          <DialogDescription className="text-lg text-center">
            Fill details below carefully!
          </DialogDescription>
        </DialogHeader>
        <HospitalityUserCreationForm
          setOpen={setOpen}
          setHospitalityUserData={setHospitalityUserData}
        />
      </DialogContent>
    </Dialog>
  );
}

export function HospitalityUserEditForm({
  setOpen,
  setHospitalityUserData,
  selectedHospitalityUser,
}) {
  const HospitalityUserCreationFormSchema = z.object({
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
    resolver: zodResolver(HospitalityUserCreationFormSchema),
    mode: "onChange",
    defaultValues: {
      name: selectedHospitalityUser?.name,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const updateData = {
      name: data.name,
    };

    try {
      const toastId = toast.loading("Updating Hospitality User...");

      const { data } = await apiConnector(
        "PUT",
        `/api/admin/hospitality/updateHospitalityUser`,
        { hospitalityUserId: selectedHospitalityUser?._id, updateData }
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Hospitality User Updated!");
        setOpen(false);
        setHospitalityUserData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Hospitality User.");
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
                    Name of Hospitality User*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name of Hospitality User"
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
            Update Hospitality User
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}

export function EditHospitalityUserButton({
  selectedHospitalityUser,
  setHospitalityUserData,
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
            Edit Hospitality User Details
          </DialogTitle>
        </DialogHeader>
        <HospitalityUserEditForm
          setOpen={setOpen}
          setHospitalityUserData={setHospitalityUserData}
          selectedHospitalityUser={selectedHospitalityUser}
        />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteHospitalityUserForm({
  setOpen,
  HospitalityUserId,
  setHospitalityUserData,
}) {
  const handleHospitalityUserDeletion = async () => {
    const obj = {
      hospitalityUserId: HospitalityUserId,
    };

    try {
      const toastId = toast.loading("Deleting...");
      const { data } = await apiConnector(
        "DELETE",
        "/api/admin/hospitality/deleteHospitalityUser",
        obj
      );
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("HospitalityUser Deleted!");
        setOpen(false);
        setHospitalityUserData(data.data);
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
        Are you sure you want to delete this Hospitality User?
      </p>
      <Button
        className="mr-8"
        variant="destructive"
        type="button"
        onClick={handleHospitalityUserDeletion}
      >
        Confirm
      </Button>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export function DeleteButton({ HospitalityUserId, setHospitalityUserData }) {
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
          <DialogTitle>Delete Hospitality User</DialogTitle>
        </DialogHeader>
        <DeleteHospitalityUserForm
          setOpen={setOpen}
          HospitalityUserId={HospitalityUserId}
          setHospitalityUserData={setHospitalityUserData}
        />
      </DialogContent>
    </Dialog>
  );
}
