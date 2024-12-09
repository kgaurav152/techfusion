"use client";

import React, { useState } from "react";
// import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { apiConnector } from "@/helpers/apiConnector";

export function EventCreationForm({ setOpen, setEventData, meantFor }) {
  const EventCreationFormSchema = z
    .object({
      eventType: z.enum(["Cultural", "Technical"], {
        message: "Select a valid option",
      }),
      id: z.string().min(1, { message: "Id must be of min. 1 digit" }),
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be a string",
        })
        .min(2, { message: "Name must be 2 or more characters long" }),
      description: z.string({ message: "Description can't be empty!" }),
      rulebookLink: z.string().url(),
      posterUrl: z.string().url(),
      min: z
        .string()
        .min(1, { message: "Minimum participants must be at least 1" })
        .transform((value) => parseInt(value, 10)) // Transform the string to a number
        .refine((value) => !isNaN(value) && value >= 1, {
          message: "Minimum must be a valid number and at least 1",
        }),
      max: z
        .string()
        .min(1, { message: "Maximum participants must be at least 1" })
        .transform((value) => parseInt(value, 10)) // Transform the string to a number
        .refine((value) => !isNaN(value) && value >= 1, {
          message: "Maximum must be a valid number and at least 1",
        }),
    })
    .refine((data) => parseInt(data.max, 10) >= parseInt(data.min, 10), {
      path: ["max"],
      message:
        "Maximum participant/s must be greater than or equal to Minimum participant/s",
    });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EventCreationFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const apiEndpoint =
      meantFor === "School"
        ? "/api/school/schoolEvent/createSchoolEvent"
        : "/api/event/createEvent";

    const eventIdPrefix = meantFor === "School" ? "S" : "";
    const eventTypePrefix = data.eventType === "Cultural" ? "C" : "T";

    const obj = {
      eventType: data.eventType,
      eventId: `${eventIdPrefix}${eventTypePrefix}${data.id}`,
      name: data.name,
      description: data.description,
      ruleBook: data.rulebookLink,
      posterUrl: data.posterUrl,
      min: Number(data.min),
      max: Number(data.max),
    };

    try {
      const toastId = toast.loading("Creating Event...");

      const { data } = await apiConnector("POST", apiEndpoint, obj);
      setIsLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Event Created!");
        setOpen(false);
        setEventData(data.data);
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
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Select Type of Event*
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Enter Event Id*</FormLabel>
              <FormControl>
                <Input placeholder="Enter Id of Event" {...field} />
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
              <FormLabel className="text-white">Name of Event*</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    meantFor === "School"
                      ? "Enter Name of School Event"
                      : "Enter Name of Event"
                  }
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Description*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description of the event here"
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
          name="rulebookLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Rule Book Link*</FormLabel>
              <FormControl>
                <Input placeholder="Enter rulebook drive link" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="posterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Poster URL*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter imgur URL of Poster of Event"
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
          name="min"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Minimum Participants*
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Minimum participants"
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
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Maximum Participants*
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Maximum participants"
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
          Create Event
        </Button>
      </form>
    </Form>
  );
}

export function CreateEventButton({ setEventData, meantFor }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {meantFor === "School"
            ? "Create New School Event"
            : "Create New Event"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#00040F]">
        <DialogHeader>
          <DialogTitle className="text-white text-3xl">
            {meantFor === "School"
              ? "Create New School Event"
              : "Create New Event"}
          </DialogTitle>
          <DialogDescription className="text-xl">
            {" "}
            Fill details below carefully!
          </DialogDescription>
        </DialogHeader>
        <EventCreationForm
          setOpen={setOpen}
          setEventData={setEventData}
          meantFor={meantFor}
        />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteEventForm({ setOpen, EventId, setEventData, meantFor }) {
  const handleEventDeletion = async () => {
    const obj = {
      id: EventId,
    };

    const apiEndpoint =
      meantFor === "School"
        ? "/api/school/schoolEvent/deleteSchoolEvent"
        : "/api/event/deleteEvent";

    try {
      const toastId = toast.loading("Loading...");
      const { data } = await apiConnector("POST", apiEndpoint, obj);
      console.log(data);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Event Deleted!");
        setOpen(false);
        setEventData(data.data);
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
        {meantFor === "School"
          ? "Are you sure want to delete this school event?"
          : "Are you sure you want to delete this event?"}
      </p>
      <Button
        className="mr-8"
        variant="destructive"
        type="button"
        onClick={handleEventDeletion}
      >
        Confirm
      </Button>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export function DeleteButton({ EventId, setEventData, meantFor }) {
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
          <DialogTitle>Delete Event</DialogTitle>
        </DialogHeader>
        <DeleteEventForm
          setOpen={setOpen}
          EventId={EventId}
          meantFor={meantFor}
          setEventData={setEventData}
        />
      </DialogContent>
    </Dialog>
  );
}

// export function AcceptApprovalForm({ setOpen,  UserId, setPendingParticipantsData }) {
//     const handleAcceptApprovalRequest = async () => {
//       const obj = {
//         userId:UserId,
//         status: "1"
//         };

//     try {
//         const toastId = toast.loading("Loading...");
//         const { data } = await axios.put("/api/updateStatus",obj);
//         console.log(data)
//         toast.dismiss(toastId)
//         if (data.success) {
//             toast.success("Approval request accepted!");
//             setOpen(false);
//             setPendingParticipantsData(data.data);
//         } else {
//         toast.error(data.message);
//         }
//     } catch (err) {
//         console.log(err);
//     }
//     };

//     return (
//       <div className="bg-white text-center">
//         <p className="mb-4">Are you sure you want to Accept Approval Request?</p>
//         <Button
//           className="mr-8"
//           variant="destructive"
//           type="button"
//           onClick={handleAcceptApprovalRequest}
//         >
//           Confirm
//         </Button>
//         <Button variant="outline" type="button" onClick={() => setOpen(false)}>
//           Cancel
//         </Button>
//       </div>
//     );
//   }

//   export function ApproveButton({ UserId, setPendingParticipantsData }) {
//     const [open, setOpen] = useState(false);

//     return (
//       <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button variant="outline">
//             Approve
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Accept Approval Request</DialogTitle>
//           </DialogHeader>
//           <AcceptApprovalForm setOpen={setOpen} UserId={UserId} setPendingParticipantsData={setPendingParticipantsData} />
//         </DialogContent>
//       </Dialog>
//     );
//   }