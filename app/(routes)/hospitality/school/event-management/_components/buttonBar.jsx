"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { apiConnector } from "@/helpers/apiConnector";

export function DeleteParticipationForm({
  setOpen,
  participationId,
  setActionSuccess,
}) {
  const handleParticipationDeletion = async () => {
    const obj = {
      participationId: participationId,
    };

    try {
      const toastId = toast.loading("Deleting...");
      const { data } = await apiConnector(
        "POST",
        "/api/school/deleteSchoolParticipation",
        obj
      );
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Participation Deleted!");
        setOpen(false);
        setActionSuccess(true);
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
        Are you sure you want to delete this event&apos;s participation?
      </p>
      <Button
        className="mr-8"
        variant="destructive"
        type="button"
        onClick={handleParticipationDeletion}
      >
        Confirm
      </Button>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export function DeleteButton({ participationId, setActionSuccess }) {
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
          <DialogTitle>Delete Participation</DialogTitle>
        </DialogHeader>
        <DeleteParticipationForm
          setOpen={setOpen}
          participationId={participationId}
          setActionSuccess={setActionSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
