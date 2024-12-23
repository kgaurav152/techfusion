"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiConnector } from "@/helpers/apiConnector";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import SelectedEventCard from "@/components/selected-event-card";

import { columns as participantsColumns } from "@/app/(routes)/hospitality/school/event-management/_components/_eventParticipants/columns";
import { DataTable as ParticipantsDataTable } from "@/app/(routes)/hospitality/school/event-management/_components/_eventParticipants/data-table";
import UserParticipation from "@/app/(routes)/hospitality/school/event-management/_components/_userParticipation/userParticipation";
// import { columns as paymentColumns } from "@/app/(routes)/hospitality/school/_components/_paymentDetails/columns";
// import { DataTable as PaymentDataTable } from "@/app/(routes)/hospitality/school/_components/_paymentDetails/data-table";

const UserSelectionPopOver = ({ allParticipantsData, form, index, field }) => {
  const [openPop, setOpenPop] = useState(false);
  return (
    <Popover open={openPop} onOpenChange={setOpenPop}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between w-full",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? allParticipantsData.find((user) => user.value === field.value)
                  ?.label
              : "Select Participant"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search User..." />
          <CommandEmpty>No User found.</CommandEmpty>
          <ScrollArea className="h-48 overflow-auto">
            <CommandGroup>
              {allParticipantsData.map((user) => (
                <CommandItem
                  value={user.label}
                  key={user.value}
                  onSelect={() => {
                    form.setValue(`teamMembers.${index}.festId`, user.value);
                    setOpenPop(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      user.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export function SchoolStudentEventRegistration({
  event,
  eventData,
  allParticipantsData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedForEventDetail, setSelectedForEventDetail] = useState(null);

  const form = useForm({
    mode: "onChange",
  });

  const { control, handleSubmit, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  useEffect(() => {
    const eventId = watch("event");
    const selected = eventData?.find((ev) => ev?.value === eventId);
    setSelectedEvent(selected);
    // console.log(selected);
    const selectedForDetail = event?.find((ev) => ev?._id === eventId);
    setSelectedForEventDetail(selectedForDetail);
    // console.log(selectedForDetail);
    if (selected) {
      const initialMembers = Array(selected?.minParticipants)
        .fill(null)
        .map((_, index) => ({
          festId: "",
          role: index === 0 ? "Team Lead" : "Team Member",
        }));
      form?.setValue("teamMembers", initialMembers);
    }
  }, [watch("event")]);

  const handleAddMember = (e) => {
    e?.preventDefault();
    if (fields?.length < selectedEvent?.maxParticipants) {
      append({ festId: "", role: "Team Member" });
    } else {
      toast?.error(
        `Maximum team members allowed is ${selectedEvent?.maxParticipants}.`
      );
    }
  };

  const validateFestIds = (teamMembers) => {
    const festIds = teamMembers?.map((member) => member?.festId);
    const uniqueFestIds = new Set(festIds);
    if (festIds.some((id) => !id) || uniqueFestIds.size !== festIds.length) {
      toast?.error("All TechFusion IDs must be unique and non-empty.");
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (fields?.length < selectedEvent?.minParticipants) {
      toast?.error(
        `Minimum team members required is ${selectedEvent?.minParticipants}.`
      );
      return;
    }

    if (!validateFestIds(data?.teamMembers)) return;

    setIsLoading(true);

    const payload = {
      schoolEvent_id: selectedEvent?.value,
      team_lead: data?.teamMembers[0]?.festId,
      team_name:
        selectedEvent?.maxParticipants === 1
          ? allParticipantsData
              .find(
                (participant) =>
                  participant.value === data?.teamMembers?.[0]?.festId
              )
              ?.label.split(" - ")[1]
          : data?.teamName,
      team_members: data?.teamMembers
        ?.slice(1)
        ?.map((member) => ({ festId: member?.festId })),
    };

    const timeoutError = setTimeout(() => {
      toast?.error("Request timed out. Please try again later.");
      setIsLoading(false);
    }, 120000);

    var toastId;

    try {
      toastId = toast?.loading("Registering For Event...");
      const { data } = await apiConnector(
        "POST",
        "/api/school/schoolStudentEventRegistration",
        payload
      );
      toast?.dismiss(toastId);
      clearTimeout(timeoutError);
      setIsLoading(false);
      if (data?.success) {
        toast?.success("Registered for Event Successfully!");
        setSelectedForEventDetail(null);
        setSelectedEvent(null);
        form?.reset();
      } else {
        toast?.error(data?.message);
      }
    } catch (error) {
      clearTimeout(timeoutError);
      toast?.error("Something went wrong. Please try again later.");
      toast?.dismiss(toastId);
      setIsLoading(false);
      console?.log(err);
    }
  };

  return (
    <>
      <div className="text-center mb-4 text-border flex-col">
        {/* <h1
              className="font-bold text-[3rem] text-border-white"
              style={{ ...neonTextStyle }}
            >
              Enroll Participant for Event Below
            </h1> */}
        <Card className="mx-auto w-full max-w-xl mb-8">
          <CardContent>
            <div className="flex flex-col items-center pt-4">
              <p className="font-semibold font-mono">
                A participant can participate in max. 5 Technical and 5 Cultural
                events in total.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl w-full flex gap-3 flex-col items-center justify-center mx-auto"
        >
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">Select Event</FormLabel>
                <Popover open={openPop} onOpenChange={setOpenPop}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? eventData.find(
                              (event) => event.value === field.value
                            )?.label
                          : "Select an Event to Enroll"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search Event..." />
                      <CommandEmpty>No Event found.</CommandEmpty>
                      <ScrollArea className="h-48 overflow-auto">
                        <CommandGroup>
                          {eventData?.map((event) => (
                            <CommandItem
                              value={event.label}
                              key={event.value}
                              onSelect={() => {
                                form.setValue("event", event.value);
                                setOpenPop(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  event.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {event.label}
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
          {selectedForEventDetail && selectedForEventDetail?._id && (
            <SelectedEventCard
              selectedForEventDetail={selectedForEventDetail}
            />
          )}
          <div className="w-full">
            {selectedEvent && selectedEvent?.maxParticipants > 1 && (
              <FormField
                control={control}
                name="teamName"
                rules={{ required: selectedEvent?.maxParticipants > 1 }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Team Name: <sup className="text-rose-500">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter team name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex flex-col w-full gap-5 mt-4">
              {selectedEvent && selectedEvent.maxParticipants > 1 && (
                <h3 className="border-b text-lg font-semibold">Team Members</h3>
              )}
              {selectedEvent &&
                fields?.map((member, index) => (
                  <div key={member?.id} className="">
                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.festId`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                          <FormLabel>
                            {`${
                              index === 0 && selectedEvent?.maxParticipants > 1
                                ? "Team Lead:  "
                                : selectedEvent?.maxParticipants === 1
                                ? "Participant:  "
                                : `Team Member ${index + 1}:  `
                            }`}
                          </FormLabel>
                          <FormControl>
                            <UserSelectionPopOver
                              allParticipantsData={allParticipantsData}
                              form={form}
                              index={index}
                              field={field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      {index >= selectedEvent?.minParticipants && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-rose-500"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              {selectedEvent &&
                fields?.length < selectedEvent?.maxParticipants && (
                  <div className="flex justify-end">
                    <Button className="w-fit" onClick={handleAddMember}>
                      Add Team Member
                    </Button>
                  </div>
                )}
            </div>
          </div>
          {selectedForEventDetail && selectedForEventDetail?._id && (
            <Button
              type="submit"
              disabled={isLoading || !selectedEvent}
              className="transition w-full ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-xl border border-transparent my-6 bg-gray-900 text-white px-8 py-1 hover:bg-purple-500 flex items-center border-white hover:border-none"
            >
              Enroll
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}

export function ViewAllSchoolEventParticipants({ eventData }) {
  const [loading, setLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [value, setValue] = React.useState("");
  const [actionSuccess, setActionSuccess] = useState(false);
  const [allEventParticipantsData, setAllEventParticipantsData] = useState([]);

  const fetchAllEventSchoolParticipants = async (event_id) => {
    setLoading(true);
    const obj = {
      schoolEvent_id: event_id,
    };
    try {
      const { data } = await apiConnector(
        "POST",
        "/api/school/getParticipantsBySchoolEvent",
        obj
      );
      setLoading(false);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setAllEventParticipantsData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (actionSuccess) {
    fetchAllEventSchoolParticipants();
    setActionSuccess(false);
  }

  return (
    <div className="flex flex-col w-full mx-auto items-center my-2 mb-8 text-center">
      <h1 className="text-3xl font-bold">School Participants by Event</h1>
      <div className="container mt-4 mb-5 w-full">
        <Popover open={openPop} onOpenChange={setOpenPop}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPop}
              className={cn(
                "justify-between w-[300px]",
                !value && "text-muted-foreground"
              )}
            >
              {value
                ? eventData.find((event) => event.value === value)?.label
                : "Select Event"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search Event..." />
              <CommandEmpty>No Event found.</CommandEmpty>
              <ScrollArea className="h-48 overflow-auto">
                <CommandGroup>
                  {eventData.map((event) => (
                    <CommandItem
                      value={event.label}
                      key={event.value}
                      onSelect={() => {
                        setValue(event.value);
                        setOpenPop(false);
                        fetchAllEventSchoolParticipants(event.value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === event.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {event.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full">
        {allEventParticipantsData.length > 0 && (
          <p className="text-lg font-semibold">
            Total Participants : {allEventParticipantsData.length}
          </p>
        )}
        <ParticipantsDataTable
          columns={participantsColumns(setActionSuccess)}
          data={allEventParticipantsData}
        />
      </div>
    </div>
  );
}

export default function SchoolEventManagement() {
  const router = useRouter();
  const [
    allConfirmedSchoolParticipantsData,
    setAllConfirmedSchoolParticipantsData,
  ] = useState([]);
  const [
    allConfirmedSchoolParticipantsDataByFestIdAsValue,
    setAllConfirmedSchoolParticipantsDataByFestIdAsValue,
  ] = useState([]);
  const [event, setEvent] = useState([]);
  const [eventData, setEventData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAllSchoolParticipants = async () => {
    setLoading(true);
    try {
      const { data } = await apiConnector(
        "POST",
        "/api/school/getAllParticipantsBySf"
      );
      setLoading(false);
      if (data.success) {
        const unRestructuredUsers = data.data;
        const restructuredUsers = unRestructuredUsers.map((user) => ({
          label: `${user.festId} - ${user.name}`,
          value: user._id,
          name: user.name,
          gender: user.gender,
          studentClass: user.studentClass,
          section: user.section,
          rollNo: user.rollNo,
          school: user.school,
          parentPhoneNumber: user.parentPhoneNumber,
          festId: user.festId,
          registrationFee: user.registrationFee,
          paymentStatus: user.isPaymentConfirmed,
          paymentReceivedBy: user.paymentReceivedBy,
          idCardAllocation: user.idCardAllocation,
          technical: user.technical,
          cultural: user.cultural,
        }));
        const confirmedPaymentRestructuredStudents = restructuredUsers.filter(
          (schoolStudent) => schoolStudent.paymentStatus === true
        );
        setAllConfirmedSchoolParticipantsData(
          confirmedPaymentRestructuredStudents
        );
        const restructuredUsersByFestIdAsValue = unRestructuredUsers
          .map((user) => ({
            label: `${user.festId} - ${user.name}`,
            value: user.festId,
            _id: user._id,
            paymentStatus: user.isPaymentConfirmed,
          }))
          .filter((schoolStudent) => schoolStudent.paymentStatus === true);
        setAllConfirmedSchoolParticipantsDataByFestIdAsValue(
          restructuredUsersByFestIdAsValue
        );
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSchoolEvents = async () => {
    try {
      const { data } = await apiConnector(
        "POST",
        "/api/school/schoolEvent/getAllSchoolEvent"
      );
      if (data.success) {
        const unRestructuredEvents = data.data;
        setEvent(unRestructuredEvents);
        const restructuredEvents = unRestructuredEvents.map((event) => ({
          label: `${event.eventId} - ${event.name}`,
          value: event._id,
          minParticipants: event?.min,
          maxParticipants: event?.max,
        }));
        setEventData(restructuredEvents);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllDetails = () => {
    fetchAllSchoolParticipants();
  };

  useEffect(() => {
    fetchAllDetails();
    fetchSchoolEvents();
  }, []);

  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <>
      {/* <div className="flex justify-center w-11/12 mx-auto mt-4 mb-8">
        <Button onClick={(e) => handleClick(e, "/hospitality/school/details")}>
          View Allocation Details
        </Button>
      </div> */}
      <div className="flex justify-center mt-4 mb-8 p-2">
        <Tabs defaultValue="eventRegistration" className="max-w-4xl w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="eventRegistration">
              Event Registration
            </TabsTrigger>
            <TabsTrigger value="viewEventParticipants">
              Event Participants
            </TabsTrigger>
            <TabsTrigger value="viewUserParticipation">
              User Participation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="eventRegistration">
            <Card>
              <CardHeader>
                <CardTitle>School Student Event Registration</CardTitle>
                <CardDescription>
                  Register Student For Event Below:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolStudentEventRegistration
                  allParticipantsData={
                    allConfirmedSchoolParticipantsDataByFestIdAsValue
                  }
                  event={event}
                  eventData={eventData}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="viewEventParticipants">
            <Card>
              <CardHeader>
                <CardTitle>Event Participants</CardTitle>
                <CardDescription>
                  View and modify Participants by Event.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ViewAllSchoolEventParticipants eventData={eventData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="viewUserParticipation">
            <Card>
              <CardHeader>
                <CardTitle>User Participation</CardTitle>
                <CardDescription>
                  View and modify User Participation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserParticipation
                  allParticipants={
                    allConfirmedSchoolParticipantsDataByFestIdAsValue
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
