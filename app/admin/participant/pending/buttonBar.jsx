"use client"

import React, { useState } from "react";
import axios from "axios";


import Network from "@/components/network";
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
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { apiConnector } from "@/helpers/apiConnector";


export function AcceptApprovalForm({ setOpen,  UserId, setPendingParticipantsData }) {
    const handleAcceptApprovalRequest = async () => {
      const obj = { 
        userId:UserId,
        status: "1"
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
  
  export function ApproveButton({ UserId, setPendingParticipantsData }) {
    const [open, setOpen] = useState(false);
  
    return (
      <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-green-500">
            Approve
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Accept Approval Request</DialogTitle>
          </DialogHeader>
          <AcceptApprovalForm setOpen={setOpen} UserId={UserId} setPendingParticipantsData={setPendingParticipantsData} />
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

  export function ViewImageButton({ ImageUrl }) {
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
            <img src={ImageUrl} alt="Payment Screenshot" className="w-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }