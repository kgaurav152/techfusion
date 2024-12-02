import Loader from "@/components/custom/loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiConnector } from "@/helpers/apiConnector";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserParticipation = ({ allParticipants }) => {
  const [openPop, setOpenPop] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [participantDetails, setParticipantDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await apiConnector(
        "POST",
        "/api/school/getEventsOfParticipant",
        { participantId: participant._id }
      );

      setParticipantDetails(data?.data);
      setLoading(false);
    };
    if (participant) {
      fetchData();
    }
  }, [participant]);

  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <Popover open={openPop} onOpenChange={setOpenPop}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPop}
              className={cn(
                "justify-between w-[300px]",
                !participant && "text-muted-foreground"
              )}
            >
              {participant
                ? allParticipants.find(
                    (item) => item.value === participant.value
                  )?.label
                : "Select Participant"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search Participants..." />
              <CommandEmpty>No Paticipant found.</CommandEmpty>
              <ScrollArea className="h-48 overflow-auto">
                <CommandGroup>
                  {allParticipants.map((item) => (
                    <CommandItem
                      value={item.label}
                      key={item.value}
                      onSelect={() => {
                        setParticipant(item);
                        setOpenPop(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.value === participant?.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item?.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {loading && <Loader />}
      {participantDetails && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{participantDetails?.name}</CardTitle>
              <CardDescription>{participantDetails?.school}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc grid grid-cols-1 md:grid-cols-2 text-muted-foreground">
                <li>
                  Fest ID :{" "}
                  <span className="text-foreground font-semibold">
                    {participantDetails?.festId || "NA"}
                  </span>
                </li>
                <li>
                  Parent Phone No :{" "}
                  <span className="text-foreground font-semibold">
                    {participantDetails?.parentPhoneNumber || "NA"}
                  </span>
                </li>
                <li>
                  Class :{" "}
                  <span className="text-foreground font-semibold">
                    {participantDetails?.studentClass || "NA"}
                  </span>
                </li>
                <li>
                  Section :{" "}
                  <span className="text-foreground font-semibold">
                    {participantDetails?.section || "NA"}
                  </span>
                </li>
                <li>
                  Roll :{" "}
                  <span className="text-foreground font-semibold">
                    {participantDetails?.rollNo || "NA"}
                  </span>
                </li>
                <li>
                  Payment :{" "}
                  <span className="text-foreground font-semibold">
                    {participantDetails?.isPaymentConfirmed ? (
                      <span className="text-green-500">Done</span>
                    ) : (
                      <span className="text-rose-500">Pending</span>
                    )}
                  </span>
                </li>
              </ul>

              <div>
                <h4 className="text-2xl font-semibold border-b my-6">
                  Enrolled in :
                </h4>
                <div className="space-y-2">
                  <div>
                  {[
                    ...participantDetails?.technical,
                    ...participantDetails?.cultural,
                  ].length==0 && <p className="text-lg text-center font-medium">Not Enrolled in any event !</p>}
                  </div>
                  {[
                    ...participantDetails?.technical,
                    ...participantDetails?.cultural,
                  ]?.map((item, i) => (
                    <div
                      key={item._id}
                      className="relative p-2 py-4 border-b-2 shadow-lg bg-amber-50 border-amber-700 rounded-lg"
                    >
                      <h6 className="text-lg font-medium">
                        {item.schoolEvent.name}
                        <span className="rounded-2xl p-1 px-4 ml-2 bg-amber-400/50 text-xs text-amber-800">
                          {item.schoolEvent.eventType}
                        </span>
                      </h6>
                      {item.schoolEvent.max > 1 && (
                        <div>
                          <h6 className="text-center border-b mt-5 text-lg font-semibold">
                            {item.teamName}
                          </h6>
                          <ul className="list-disc px-5 space-y-2 my-2">
                            {item.participants.map((item) => (
                              <li key={item?._id}>
                                {item?.festId} - {item?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <DeleteButton setParticipantDetails={setParticipantDetails} id={item?._id} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserParticipation;

const DeleteButton = ({ id ,setParticipantDetails}) => {
  const deleteHandler = async () => {
    const toastId = toast.loading("Deleting...");
    const { data } = await apiConnector(
      "DELETE",
      "/api/school/deleteSchoolParticipation",
      { participationId: id }
    );
    toast.dismiss(toastId);
    if (data?.success) {
      toast.success("Unenrolled from event Successfully");
      setParticipantDetails(data?.data)
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog className="mb-4" open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-rose-500 absolute top-0 right-2 hover:text-rose-700"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Student Enrollment from Event
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete student
            erollment from the event
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteHandler} className="bg-rose-500">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
