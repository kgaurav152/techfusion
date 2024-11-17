"use client"

import React, { useState } from "react"; 
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Image } from "lucide-react";
import {toast} from 'sonner'
import { apiConnector } from "@/helpers/apiConnector";


export function AcceptAdminApprovalForm({ setOpen,  UserId, setPendingParticipantsData }) {
    const handleAcceptApprovalRequest = async () => {
      const obj = { 
        userId:UserId,
        status: "1",
        role: "admin"
        };
    try {
        const toastId = toast.loading("Loading...");
        const { data } = await apiConnector("POST","/api/updateStatus",obj);
        toast.dismiss(toastId) 
        if (data.success) {
          setOpen(false);
            toast.success("Approval request accepted!");
            setPendingParticipantsData(data.data);
        } else {
        toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
    };
  
    return (
      <div className="bg-white text-center">
        <p className="mb-4">Are you sure you want to Accept Approval Request?</p>
        <Button
          className="mr-8"
          variant="destructive"
          type="button"
          onClick={handleAcceptApprovalRequest}
        >
          Confirm
        </Button>
        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    );
  }
  
  export function ApproveAdminButton({ UserId, setPendingParticipantsData }) {
    const [open, setOpen] = useState(false);
  
    return (
      <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-green-500">
            Approve Admin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Accept Approval Request As Admin</DialogTitle>
          </DialogHeader>
          <AcceptAdminApprovalForm setOpen={setOpen} UserId={UserId} setPendingParticipantsData={setPendingParticipantsData} />
        </DialogContent>
      </Dialog>
    );
  }


export function RejectApprovalForm({ setOpen,  UserId, setPendingParticipantsData }) {
    const handleRejectApprovalRequest = async () => {
      const obj = { 
        userId: UserId,
        status: "0"
        }; 
 
    try {
      const toastId = toast.loading("Loading...");
      
        const { data } = await apiConnector("POST","/api/updateStatus",obj); 
        toast.dismiss(toastId); 
        if (data.success) {
            setOpen(false);
            toast.success("Approval request rejected!");
            console.log("data setting")
            setPendingParticipantsData(data.data);
            console.log("data setting success")
        } else {
        toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
    };
  
    return (
      <div className="bg-white text-center">
        <p className="mb-4">Are you sure you want to Reject Approval Request?</p>
        <Button
          className="mr-8"
          variant="destructive"
          type="button"
          onClick={handleRejectApprovalRequest}
        >
          Confirm Reject
        </Button>
        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    );
  }
  
  export function RejectButton({ UserId, setPendingParticipantsData }) {
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
            <DialogTitle>Reject Approval Request</DialogTitle>
          </DialogHeader>
          <RejectApprovalForm setOpen={setOpen} UserId={UserId} setPendingParticipantsData={setPendingParticipantsData} />
        </DialogContent>
      </Dialog>
    );
  }

  export function ViewImageButton({ imageUrl }) {
    console.log(imageUrl);
    const [open, setOpen] = useState(false);
  
    return (
      <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Image className="h-6 w-6 text-emerald-400" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Screenshot</DialogTitle>
          </DialogHeader>
          <div className="flex items-center">
            <a href={imageUrl} target='_blank'>
              <img src={imageUrl} alt="Payment Screenshot" className="w-full" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    );
}