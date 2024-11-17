import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'

import { apiConnector } from "@/helpers/apiConnector";
import {toast} from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function DeleteEventForm({ setOpen,  resultId, allResultId,setParticipantData }) {
  const handleParticipationDeletion = async () => {
    const obj = {  
      user_result_id:resultId,
      result_id : allResultId,
    }; 

  try {
    const toastId = toast.loading("Loading...");
      const { data } = await apiConnector("POST","/api/result/delete",obj);
      console.log(data)
      toast.dismiss(toastId); 
      if (data.success) {
          toast.success("Result Deleted successfully");
          setParticipantData(data.data.result); 
          setOpen(false); 
      } else {
      toast.error(data.message);
      }
  } catch (err) {
      console.log(err);
  }
  };

  return (
    <div className="bg-white text-center">
      <p className="mb-4">Are you sure you want to delete?</p>
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
const DeleteResult = ({resultId,allResultId,setParticipantData}) => {
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
            <DialogTitle>Delete Result</DialogTitle>
          </DialogHeader>
          <DeleteEventForm setOpen={setOpen} resultId={resultId} allResultId={allResultId} setParticipantData={setParticipantData}/>
        </DialogContent>
      </Dialog>
  )
}

export default DeleteResult