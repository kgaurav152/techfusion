"use client";
 
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; 

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
import { apiConnector } from "@/helpers/apiConnector";
import QueryCard from "./query-card";
import SelectedEventCard from "./selected-event-card";
import { Button } from "@/components/ui/button";

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
    <div className="w-11/12 mx-auto">
      {user && user?.status === "approved" ? (
        <>
          <div className="text-center mb-4 text-border flex-col">
            <h1
              className="font-bold text-[3rem] text-border-white"
              style={{ ...neonTextStyle }}
            >
              Enroll for Event Below
            </h1>
            <QueryCard />

            <Card className="mx-auto w-full max-w-xl mb-8 text-left">
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
              className="max-w-xl w-11/12 flex gap-3 flex-col items-center justify-center mx-auto"
            >
              {/* EVENT Dropdown */}
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
                  // </div>
                )}
                <div className="flex flex-col gap-3">
                  <h3>Team Members</h3>
                  {fields?.map((member, index) => (
                    <div key={member?.id} className="">
                      <div>
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
    </div>
  );
};

export default EventRegistrationForm;
