"use client";

// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiConnector } from "@/helpers/apiConnector";

const EventRegistrationForm = () => {
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
  const { event } = useSelector((state) => state?.event);

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedForEventDetail, setSelectedForEventDetail] = useState({});

  const form = useForm({
    mode: "onChange",
  });

  const { control, handleSubmit, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  useEffect(() => {
    const restructuredEvents = event?.map((ev) => ({
      label: `${ev?.eventId} - ${ev?.name}`,
      value: ev?._id,
      minParticipants: ev?.min,
      maxParticipants: ev?.max,
    }));
    setEventData(restructuredEvents);
  }, [event]);

  useEffect(() => {
    const eventId = watch("event");
    const selected = eventData?.find((ev) => ev?.value === eventId);
    setSelectedEvent(selected);
    const selectedForDetail = event?.find((ev) => ev?._id === eventId);
    setSelectedForEventDetail(selectedForDetail);
    if (selected) {
      form?.setValue("teamMembers", [
        { festId: user?.festId, role: "Team Lead" },
      ]);
      for (let i = 1; i < selected?.minParticipants; i++) {
        append({ festId: "", role: "Team Member" });
      }
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
    if (festIds?.includes("") || uniqueFestIds?.size !== festIds?.length) {
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
      team_lead: user?.festId,
      team_name:
        selectedEvent?.maxParticipants === 1 ? user?.name : data?.teamName,
      team_members: data?.teamMembers
        ?.filter((member) => member?.festId !== user?.festId) // Exclude team lead from team members
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
        "/api/eventRegistration",
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
    <React.Fragment>
      {user && user?.status === "approved" ? (
        <>
          <div className="text-center mb-4 text-border flex-col">
            <h1
              className="font-bold text-[3rem] text-border-white"
              style={{ ...neonTextStyle }}
            >
              Enroll for Event Below
            </h1>
            <Card className="mx-auto w-4/5 max-w-xl mt-2 mb-2 text-left">
              <CardHeader>
                <CardTitle>
                  For all your queries, feel free to contact:
                </CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent className="grid gap-4 lg:gap-2 lg:grid-cols-2">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="avatar_02.png" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div className="gap-1">
                      <p className="text-sm font-medium leading-none">
                        Mohit Kumar
                      </p>
                      <a
                        href="https://wa.me/917257827104?text=Hello!%20I%20have%20some%20Query%20related%20to%20Event%20Registration."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-800"
                      >
                        +917257827104
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="avatar_02.png" />
                      <AvatarFallback>KG</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Kumar Gaurav
                      </p>
                      <a
                        href="https://wa.me/917004174269?text=Hello!%20I%20have%20some%20Query%20related%20to%20Event%20Registration."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-800"
                      >
                        +917004174269
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="mx-auto w-4/5 max-w-xl mb-8 text-left">
              <CardContent>
                <div className="flex flex-col items-center pt-4">
                  <p className="font-semibold font-mono">
                    A participant can participate in max. 5 Technical and 3
                    Cultural events in total.
                  </p>
                  {/* {form.watch('event').split('@')[1]==='Individual' && <p className="font-semibold font-mono"></p>} */}
                </div>
              </CardContent>
            </Card>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto flex flex-col items-center mb-8"
            >
              <div className="mx-auto w-3/5 md:w-1/5 mb-4">
                <FormField
                  control={form.control}
                  name="event"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-white">Select Event</FormLabel>
                      <Popover open={openPop} onOpenChange={setOpenPop}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
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
                                {eventData.map((event) => (
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
              </div>
              {selectedForEventDetail && selectedForEventDetail?._id && (
                <div className=" mb-4 text-border flex-col w-11/12 mx-auto">
                  <Card className="mx-auto max-w-xl rounded-lg shadow-md overflow-hidden">
                    <CardContent className="flex flex-col lg:flex-row items-center justify-center">
                      <div className="lg:w-1/3 mt-3">
                        <p className="text-2xl font-bold mb-2">
                          {selectedForEventDetail?.name}
                        </p>
                        <img
                          src={selectedForEventDetail?.posterUrl}
                          alt={selectedForEventDetail?.name}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="lg:w-2/3 py-4 mt-3">
                        <CardTitle />
                        <CardContent>
                          <p className="text-lg mb-1">
                            Type of Event: {selectedForEventDetail?.eventType}
                          </p>
                          <div className="flex flex-row gap-2">
                            <p className="text-lg mb-1">Participant Allowed-</p>
                            <p className="text-lg mb-1">
                              min: {selectedForEventDetail?.min},
                            </p>
                            <p className="text-lg mb-1">
                              max: {selectedForEventDetail?.max}
                            </p>
                          </div>
                          <button
                            onClick={(e) =>
                              handleClick(
                                e,
                                `/events/detail/${selectedForEventDetail?._id}`
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            View Details
                          </button>
                        </CardContent>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div className="mx-auto w-4/5 gap-2 lg:grid lg:grid-cols-2 lg:gap-4 max-w-xl mb-4">
                {selectedEvent && selectedEvent?.maxParticipants > 1 && (
                  // <div className="w-3/5 md:w-1/5 mb-4">
                  <FormField
                    control={control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Team Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter team name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  // </div>
                )}
                <div className="team-members-section mb-4">
                  <h3>Team Members</h3>
                  {fields?.map((member, index) => (
                    <div key={member?.id} className="mb-2">
                      <FormField
                        control={form.control}
                        name={`teamMembers?.${index}?.festId`}
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
                              {index === 0 ? (
                                <Input disabled defaultValue={user?.festId} />
                              ) : (
                                <Input
                                  placeholder="Enter Team Member's TechFusion Id"
                                  {...field}
                                />
                              )}
                            </FormControl>
                            {index === 0 &&
                            selectedEvent?.maxParticipants > 1 ? (
                              <FormDescription>
                                <span className="text-teal-300">
                                  {user?.name}
                                </span>
                                <br />
                                If you want other member of your team to be a
                                leader ask them to register for the event
                                instead.
                              </FormDescription>
                            ) : selectedEvent?.maxParticipants === 1 ? (
                              <FormDescription>
                                <span className="text-teal-300">
                                  {user?.name}
                                </span>
                              </FormDescription>
                            ) : (
                              <FormDescription />
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {index >= selectedEvent?.minParticipants && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {selectedEvent &&
                    fields?.length < selectedEvent?.maxParticipants && (
                      <Button onClick={handleAddMember}>Add Team Member</Button>
                    )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading || !selectedEvent}
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
              >
                Enroll
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className=" min-h-[80vh]">
          <Card className="mx-auto w-4/5 max-w-xl mb-8 mt-16 text-left">
            <CardHeader>
              <CardTitle>
                Oops! Your payment status isn&apos;t verified yet!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center pt-4">
                <p className="font-semibold font-mono">
                  Please allow us some more time before we confirm your payment
                  status. It usually takes somewhere between 24-48 hours to
                  verify the payment status. <br />
                  Meanwhile, you can explore the
                  <Badge variant="outline" className=" bg-emerald-100 ml-2">
                    <a
                      className="flex flex-row items-center underline decoration-double decoration-emerald-400"
                      href="/events"
                    >
                      Event Section
                      <MousePointerClick className="ml-2" />
                    </a>
                  </Badge>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default EventRegistrationForm;
