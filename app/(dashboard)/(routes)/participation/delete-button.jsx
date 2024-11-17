"use client";

import React, { useState } from "react";
// import axios from "axios";
import {toast} from 'sonner'
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
import { useSelector } from "react-redux";

export function DeleteEventAlert({
  setOpen,
  participationId,
  setParticipatingEventsData,
}) {
  const handleParticipationDeletion = async () => {
    const obj = {
      participation_id: participationId,
    };

    try {
      const toastId = toast.loading("Loading...");
      const { data } = await apiConnector(
        "POST",
        "/api/deleteParticipation",
        obj
      );
      console.log(data);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Participation to the event deleted!");
        setOpen(false);
        setParticipatingEventsData([
          ...data.data?.technical,
          ...data.data?.cultural,
        ]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p className="mb-4">Are you sure you want to delete?</p>
      <div className="flex gap-4 justify-end">
        <Button
          variant="destructive"
          type="button"
          onClick={handleParticipationDeletion}
        >
          Confirm
        </Button>
        <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export function DeleteButton({ participationId, setParticipatingEventsData }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-rose-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Participation</DialogTitle>
        </DialogHeader>
        <DeleteEventAlert
          setOpen={setOpen}
          participationId={participationId}
          setParticipatingEventsData={setParticipatingEventsData}
        />
      </DialogContent>
    </Dialog>
  );
}
