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


export function AcceptApprovalForm({ setOpen,  userId, setActionSuccess }) {
    const handleAcceptApprovalRequest = async () => {
      const obj = { 
        user_id: userId,
        approval: "1"
        };
  
    //   new Network().hit("approval", "accept", obj, (responseData) => {
    //     if (responseData) {
    //       setOpen(false);
    //       setActionSuccess(true);
    //     }
    //   });

        
    setLoading(true);
    try {
        const { data } = await axios.post("/api/pending/approval",obj);
        setLoading(false);
        if (data.success) {
            setOpen(false);
            toast.success("Approval request accepted!");
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
  
  export function ApproveButton({ UserId, setActionSuccess }) {
    const [open, setOpen] = useState(false);
  
    return (
      <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            Approve
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Accept Approval Request</DialogTitle>
          </DialogHeader>
          <AcceptApprovalForm setOpen={setOpen} UserId={UserId} setActionSuccess={setActionSuccess} />
        </DialogContent>
      </Dialog>
    );
  }


export function RejectApprovalForm({ setOpen,  userId, setActionSuccess }) {
    const handleRejectApprovalRequest = async () => {
      const obj = { 
        user_id: userId,
        approval: "0"
        };
  
    //   new Network().hit("approval", "reject", obj, (responseData) => {
    //     if (responseData) {
    //       setOpen(false);
    //       setActionSuccess(true);
    //     }
    //   });

        
    setLoading(true);
    try {
        const { data } = await axios.post("/api/pending/approval",obj);
        setLoading(false);
        if (data.success) {
            setOpen(false);
            toast.success("Approval request rejected!");
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
  
  export function RejectButton({ UserId, setActionSuccess }) {
    const [open, setOpen] = useState(false);
  
    return (
      <Dialog className="mb-4" open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Approval Request</DialogTitle>
          </DialogHeader>
          <RejectApprovalForm setOpen={setOpen} UserId={UserId} setActionSuccess={setActionSuccess} />
        </DialogContent>
      </Dialog>
    );
  }