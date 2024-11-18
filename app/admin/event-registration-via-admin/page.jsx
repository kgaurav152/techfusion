"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiConnector } from "@/helpers/apiConnector";
import QueryCard from "@/components/query-card";
import SelectedEventCard from "@/components/selected-event-card";
import { Button } from "@/components/ui/button";

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
              "justify-between w-[300px]",
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

const EventRegistrationViaAdmin = () => {
  const neonTextStyle = {
    marginTop: "5vh",
    marginBottom: "5vh",
    fontFamily: "Helvetica Neue, sans-serif",
    // backgroundColor: '#010a01',
    // textTransform: 'uppercase',
    textAlign: "center",
    fontWeight: 100,
    textShadow:
      "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa",
    animation: "flicker 1.5s infinite alternate",
    color: "#fff",
  };

  const router = useRouter();

  const { user } = useSelector((state) => state?.profile);

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [event, setEvent] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedForEventDetail, setSelectedForEventDetail] = useState({});
  const [allParticipantsData, setAllParticipantsData] = useState([]);

  const form = useForm({
    mode: "onChange",
  });

  const { control, handleSubmit, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const fetchEvents = async () => {
    try {
      const { data } = await apiConnector("POST", "/api/event/getAllEvent");
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

  const fetchAllParticipants = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiConnector("POST", "/api/getAllParticipants");
      setIsLoading(false);
      if (data.success) {
        const unRestructuredUsers = data.data;
        const restructuredUsers = unRestructuredUsers.map((user) => ({
          label: `${user.festId} - ${user.name}`,
          value: user.festId,
        }));
        setAllParticipantsData(restructuredUsers);
      } else {
        toast.error(data.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchAllParticipants();
  }, []);

  useEffect(() => {
    const eventId = watch("event");
    const selected = eventData?.find((ev) => ev?.value === eventId);
    setSelectedEvent(selected);
    console.log(selected);
    const selectedForDetail = event?.find((ev) => ev?._id === eventId);
    setSelectedForEventDetail(selectedForDetail);
    console.log(selectedForDetail);
    if (selected) {
      // form?.setValue("teamMembers", [{ festId: "", role: "Team Lead" }]);
      // for (let i = 1; i < selected?.minParticipants; i++) {
      //   append({ festId: "", role: "Team Member" });
      // }
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
      event_id: selectedEvent?.value,
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
      toastId = toast?.loading("Registering Event...");
      const { data } = await apiConnector(
        "POST",
        "/api/admin/eventRegistration",
        payload
      );
      toast?.dismiss(toastId);
      clearTimeout(timeoutError);
      setIsLoading(false);
      if (data?.success) {
        toast?.success("Registered for Event Successfully!");
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

  const handleClick = (e, path) => {
    e?.preventDefault();
    router?.push(path);
  };

  return (
    <div className="w-11/12 mx-auto">
      <>
        <div className="text-center mb-4 text-border flex-col">
          <h1
            className="font-bold text-[3rem] text-border-white"
            style={{ ...neonTextStyle }}
          >
            Enroll Participant for Event Below
          </h1>
          <Card className="mx-auto w-full max-w-xl mb-8 text-left">
            <CardContent>
              <div className="flex flex-col items-center pt-4">
                <p className="font-semibold font-mono">
                  A participant can participate in max. 5 Technical and 3
                  Cultural events in total.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-11/12 flex gap-3 flex-col items-center justify-center mx-auto"
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
            <div>
              {selectedEvent && selectedEvent?.maxParticipants > 1 && (
                <FormField
                  control={control}
                  name="teamName"
                  rules={{ required: selectedEvent?.maxParticipants > 1 }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Team Name <sup className="text-rose-500">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter team name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex flex-col gap-3">
                <h3>Team Members</h3>
                {fields?.map((member, index) => (
                  <div key={member?.id} className="">
                    <div>
                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.festId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">
                              {`${
                                index === 0 &&
                                selectedEvent?.maxParticipants > 1
                                  ? "Team Lead"
                                  : selectedEvent?.maxParticipants === 1
                                  ? "Participant"
                                  : `Team Member ${index + 1}`
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
                    </div>
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
    </div>
  );
};

export default EventRegistrationViaAdmin;
