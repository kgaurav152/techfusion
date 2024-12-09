"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, ChevronsUpDown, Check, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiConnector } from "@/helpers/apiConnector";

import { colleges, branches, batches } from "@/public/constants";

export function CoordinatorCreationForm({ setOpen, setCoordinatorData }) {
  const CoordinatorCreationFormSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 2 or more characters long" }),
    mobile: z
      .string()
      .min(10, { message: "Mobile no. must be 10 digits" })
      .max(10, { message: "Mobile no. must be 10 digits" }),
    email: z.string().email(),
    gender: z.enum(["Male", "Female"], { message: "Select a valid option" }),
    password: z.string({ message: "Must be a password" }),
    branch: z.string({ message: "Must be a valid branch" }),
    batch: z.string({ message: "Must be a valid batch" }),
    linkedin: z.string().url().optional(),
    instaId: z.string().url().optional(),
    pictureUrl: z.string().url(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(CoordinatorCreationFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const obj = {
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      gender: data.gender,
      password: data.password,
      branch: data.branch,
      batch: data.batch,
      linkedin:
        data.linkedin != null
          ? data.linkedin
          : "https://www.linkedin.com/company/tpo-keckatihar",
      instaId:
        data.instaId != null
          ? data.instaId
          : "https://instagram.com/techfusion_kec",
      pictureUrl: data.pictureUrl,
    };

    try {
      const toastId = toast.loading("Creating Coordinator...");

      const { data } = await apiConnector(
        "POST",
        "/api/admin/coordinator/createCoordinator",
        obj
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Coordinator Created!");
        setOpen(false);
        setCoordinatorData(data.data);
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
              <FormLabel className="text-white">Name of Coordinator*</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name of Coordinator" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Mobile of Coordinator*
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter Mobile of Coordinator" {...field} />
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
                <Input placeholder="Enter Email of Coordinator" {...field} />
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
                  placeholder="Enter Password for Coordinator"
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
              <FormLabel className="text-white">Gender*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Linkedin</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter linkedin url of Coordinator"
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
          name="instaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Instagram</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter instagram url of Coordinator"
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
          name="pictureUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Picture URL*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Picture URL of Coordinator"
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
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Branch*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches &&
                    branches.map((item, index) => (
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
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Batch*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {batches &&
                    batches.map((item, index) => (
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
        <Button
          type="submit"
          disabled={isLoading}
          className="transition w-full ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
        >
          Create Coordinator
        </Button>
      </form>
    </Form>
  );
}

export function CreateCoordinatorButton({ setCoordinatorData }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Coordinator</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#00040F]">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl text-center">
            Create New Coordinator
          </DialogTitle>
          <DialogDescription className="text-lg text-center">
            Fill details below carefully!
          </DialogDescription>
        </DialogHeader>
        <CoordinatorCreationForm
          setOpen={setOpen}
          setCoordinatorData={setCoordinatorData}
        />
      </DialogContent>
    </Dialog>
  );
}

export function CoordinatorEditForm({
  setOpen,
  setCoordinatorData,
  selectedCoordinator,
}) {
  const CoordinatorCreationFormSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 2 or more characters long" }),
    mobile: z
      .string()
      .min(10, { message: "Mobile no. must be 10 digits" })
      .max(10, { message: "Mobile no. must be 10 digits" }),
    // email: z.string().email(),
    gender: z.enum(["Male", "Female"], { message: "Select a valid option" }),
    // password: z.string({ message: "Must be a password" }),
    branch: z.string({ message: "Must be a valid branch" }),
    batch: z.string({ message: "Must be a valid batch" }),
    linkedin: z.string().url().optional(),
    instaId: z.string().url().optional(),
    pictureUrl: z.string().url(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(CoordinatorCreationFormSchema),
    mode: "onChange",
    defaultValues: {
      name: selectedCoordinator?.name,
      mobile: selectedCoordinator?.mobile,
      // email: selectedCoordinator?.email,
      gender: selectedCoordinator?.gender,
      branch: selectedCoordinator?.branch,
      batch: selectedCoordinator?.batch,
      linkedin: selectedCoordinator?.linkedin,
      instaId: selectedCoordinator?.instaId,
      pictureUrl: selectedCoordinator?.pictureUrl,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const updateData = {
      // id: selectedCoordinator?._id,
      name: data.name,
      // email: data.email != null ? data.email : "admin@techfusion.org.in",
      linkedin:
        data.linkedin != null
          ? data.linkedin
          : "https://www.linkedin.com/company/tpo-keckatihar",
      instaId:
        data.instaId != null
          ? data.instaId
          : "https://instagram.com/techfusion_kec",
      pictureUrl: data.pictureUrl,
      gender: data.gender,
      mobile: data.mobile,
      batch: data.batch,
      branch: data.branch,
      college: data.college,
    };

    try {
      const toastId = toast.loading("Updating Coordinator...");

      const { data } = await apiConnector(
        "PUT",
        `/api/admin/coordinator/updateCoordinator`,
        { coordinatorId: selectedCoordinator?._id, updateData }
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Coordinator Updated!");
        setOpen(false);
        setCoordinatorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Coordinator.");
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
                    Name of Coordinator*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name of Coordinator" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Mobile of Coordinator*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Mobile of Coordinator"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email of Campus Ambassador"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Gender*</FormLabel>
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
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Linkedin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter linkedin url of Coordinator"
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
              name="instaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Instagram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter instagram url of Coordinator"
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
              name="pictureUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Picture URL*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Picture URL of Coordinator"
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
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Branch*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branches &&
                        branches.map((item, index) => (
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
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Batch*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Batch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {batches &&
                        batches.map((item, index) => (
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
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center"
          >
            Update Coordinator
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}

export function EditCoordinatorButton({
  selectedCoordinator,
  setCoordinatorData,
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
            Edit Coordinator Details
          </DialogTitle>
        </DialogHeader>
        <CoordinatorEditForm
          setOpen={setOpen}
          setCoordinatorData={setCoordinatorData}
          selectedCoordinator={selectedCoordinator}
        />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteCoordinatorForm({
  setOpen,
  CoordinatorId,
  setCoordinatorData,
}) {
  const handleCoordinatorDeletion = async () => {
    const obj = {
      coordinatorId: CoordinatorId,
    };

    try {
      const toastId = toast.loading("Deleting...");
      const { data } = await apiConnector(
        "DELETE",
        "/api/admin/coordinator/deleteCoordinator",
        obj
      );
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Coordinator Deleted!");
        setOpen(false);
        setCoordinatorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white text-center">
      <p className="mb-4">Are you sure you want to delete this Coordinator?</p>
      <Button
        className="mr-8"
        variant="destructive"
        type="button"
        onClick={handleCoordinatorDeletion}
      >
        Confirm
      </Button>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export function DeleteButton({ CoordinatorId, setCoordinatorData }) {
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
          <DialogTitle>Delete Coordinator</DialogTitle>
        </DialogHeader>
        <DeleteCoordinatorForm
          setOpen={setOpen}
          CoordinatorId={CoordinatorId}
          setCoordinatorData={setCoordinatorData}
        />
      </DialogContent>
    </Dialog>
  );
}
