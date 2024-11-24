"use client";

import React, { useState } from "react";
import {toast} from 'sonner'
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

export function CampusAmbassadorCreationForm({
  setOpen,
  setCampusAmbassadorData,
}) {
  const CampusAmbassadorCreationFormSchema = z.object({
    id: z.string().min(1, { message: "Id must be of min. 1 digit" }),
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 2 or more characters long" }),
    email: z.string().email(),
    mobile: z
      .string()
      .min(10, { message: "Mobile no. must be 10 digits" })
      .max(10, { message: "Mobile no. must be 10 digits" }),
    college: z.string({ message: "Must be a valid College Name" }),
    branch: z.string({ message: "Must be a valid branch" }),
    batch: z.string({ message: "Must be a valid batch" }),
    linkedin: z.string().url().optional(),
    pictureUrl: z.string().url(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(CampusAmbassadorCreationFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const obj = {
      name: data.name,
      email: data.email != null ? data.email : "admin@techfusion.org.in",
      linkedin:
        data.linkedin != null
          ? data.linkedin
          : "https://www.linkedin.com/company/tpo-keckatihar",
      pictureUrl: data.pictureUrl,
      mobile: data.mobile,
      batch: data.batch,
      branch: data.branch,
      college: data.college,
      // caId: "KECTF" + "last 2 digit of current year" + "CA" + data.id,
      caId: "KECTF" + "25" + "CA" + data.id,
    };

    try {
      const toastId = toast.loading("Creating Campus Ambassador...");

      const { data } = await apiConnector(
        "POST",
        "/api/campusAmbassador/createCampusAmbassador",
        obj
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Campus Ambassador Created!");
        setOpen(false);
        setCampusAmbassadorData(data.data);
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        > 
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Enter CA Id*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Id of Ca" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name of CA*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name of Campus Ambassador"
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
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Mobile of CA*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Mobile of Campus Ambassador"
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
                      placeholder="Enter Email of Campus Ambassador"
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
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Linkedin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter linkedin url of Campus Ambassador"
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
                      placeholder="Enter Picture URL of Campus Ambassador"
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
              name="college"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">College*</FormLabel>
                  <Popover open={openPop} onOpenChange={setOpenPop}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? colleges.find(
                                (college) => college.value === field.value
                              )?.label
                            : "Select College"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search College..." />
                        <CommandEmpty>No College found.</CommandEmpty>
                        <ScrollArea className="h-48 overflow-auto">
                          <CommandGroup>
                            {colleges.map((college) => (
                              <CommandItem
                                value={college.label}
                                key={college.value}
                                onSelect={() => {
                                  form.setValue("college", college.value);
                                  setOpenPop(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    college.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {college.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
          <Button
            type="submit"
            disabled={isLoading}
            className="transition w-full ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
          >
            Create CA
          </Button>
        </form>
      </Form> 
  );
}

export function CreateCampusAmbassadorButton({ setCampusAmbassadorData }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New CA</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#00040F]">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl text-center">
            Create New Campus Ambassador
          </DialogTitle>
          <DialogDescription className="text-lg text-center">
          Fill details below carefully!
          </DialogDescription>
        </DialogHeader>
        <CampusAmbassadorCreationForm
          setOpen={setOpen}
          setCampusAmbassadorData={setCampusAmbassadorData}
        />
      </DialogContent>
    </Dialog>
  );
}

export function CampusAmbassadorEditForm({
  setOpen,
  setCampusAmbassadorData,
  selectedAmbassador,
}) {
  const CampusAmbassadorCreationFormSchema = z.object({
    id: z.string().min(1, { message: "Id must be of min. 1 digit" }),
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 2 or more characters long" }),
    email: z.string().email(),
    mobile: z
      .string()
      .min(10, { message: "Mobile no. must be 10 digits" })
      .max(10, { message: "Mobile no. must be 10 digits" }),
    college: z.string({ message: "Must be a valid College Name" }),
    branch: z.string({ message: "Must be a valid branch" }),
    batch: z.string({ message: "Must be a valid batch" }),
    linkedin: z.string().url().optional(),
    pictureUrl: z.string().url(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(CampusAmbassadorCreationFormSchema),
    mode: "onChange",
    defaultValues: {
      id: selectedAmbassador?.caId,
      name: selectedAmbassador?.name,
      email: selectedAmbassador?.email,
      mobile: selectedAmbassador?.mobile,
      college: selectedAmbassador?.college,
      branch: selectedAmbassador?.branch,
      batch: selectedAmbassador?.batch,
      linkedin: selectedAmbassador?.linkedin,
      pictureUrl: selectedAmbassador?.pictureUrl,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const updatedData = {
      id: selectedAmbassador?._id,
      caId: selectedAmbassador?.id,
      name: data.name,
      email: data.email != null ? data.email : "admin@techfusion.org.in",
      linkedin:
        data.linkedin != null
          ? data.linkedin
          : "https://www.linkedin.com/company/tpo-keckatihar",
      pictureUrl: data.pictureUrl,
      mobile: data.mobile,
      batch: data.batch,
      branch: data.branch,
      college: data.college,
    };

    try {
      const toastId = toast.loading("Updating Campus Ambassador...");

      const { data } = await apiConnector(
        "PUT",
        `/api/campusAmbassador/updateCampusAmbassador`,
        updatedData
      );
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Campus Ambassador Updated!");
        setOpen(false);
        setCampusAmbassadorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Campus Ambassador.");
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
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">CA Id*</FormLabel>
                  <FormControl>
                    {/* <Input disabled placeholder="Enter Id of Ca" {...field} /> */}
                    <p className="text-white">{selectedAmbassador?.caId}</p>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name of CA*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Mobile of CA*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Mobile" {...field} />
                  </FormControl>
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
                      placeholder="Enter Email of Campus Ambassador"
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
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Linkedin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter linkedin url of Campus Ambassador"
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
                      placeholder="Enter Picture URL of Campus Ambassador"
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
              name="college"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">College*</FormLabel>
                  <Popover open={openPop} onOpenChange={setOpenPop}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? colleges.find(
                                (college) => college.value === field.value
                              )?.label
                            : "Select College"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search College..." />
                        <CommandEmpty>No College found.</CommandEmpty>
                        <ScrollArea className="h-48 overflow-auto">
                          <CommandGroup>
                            {colleges.map((college) => (
                              <CommandItem
                                value={college.label}
                                key={college.value}
                                onSelect={() => {
                                  form.setValue("college", college.value);
                                  setOpenPop(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    college.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {college.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
            {/* Repeat for other fields like email, linkedin, pictureUrl, college, branch, batch */}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center"
          >
            Update CA
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}

export function EditCampusAmbassadorButton({
  selectedAmbassador,
  setCampusAmbassadorData,
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
            {" "}
            Edit Campus Ambassador Details
          </DialogTitle>
        </DialogHeader>
        <CampusAmbassadorEditForm
          setOpen={setOpen}
          setCampusAmbassadorData={setCampusAmbassadorData}
          selectedAmbassador={selectedAmbassador}
        />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteCampusAmbassadorForm({
  setOpen,
  CampusAmbassadorId,
  setCampusAmbassadorData,
}) {
  const handleCADeletion = async () => {
    const obj = {
      id: CampusAmbassadorId,
    };

    try {
      const toastId = toast.loading("Loading...");
      const { data } = await apiConnector(
        "POST",
        "/api/campusAmbassador/deleteCampusAmbassador",
        obj
      );
      console.log(data);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Campus Ambassador Deleted!");
        setOpen(false);
        setCampusAmbassadorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white text-center">
      <p className="mb-4">Are you sure you want to delete this CA?</p>
      <Button
        className="mr-8"
        variant="destructive"
        type="button"
        onClick={handleCADeletion}
      >
        Confirm
      </Button>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export function DeleteButton({ CampusAmbassadorId, setCampusAmbassadorData }) {
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
          <DialogTitle>Delete Campus Ambassador</DialogTitle>
        </DialogHeader>
        <DeleteCampusAmbassadorForm
          setOpen={setOpen}
          CampusAmbassadorId={CampusAmbassadorId}
          setCampusAmbassadorData={setCampusAmbassadorData}
        />
      </DialogContent>
    </Dialog>
  );
}
