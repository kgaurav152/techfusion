"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {toast} from 'sonner'
import { apiConnector } from "@/helpers/apiConnector";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check, Trash2 } from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function EventView({
  loading,
  eventData,
  coordinatorData,
  restructuredEventData,
  restructuredCoordinatorData,
  fetchData,
  handleLink,
  handleDeLink,
}) {
  const [openPop, setOpenPop] = useState(false);
  const [openPop2, setOpenPop2] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [linkedCoordinators, setLinkedCoordinators] = useState([]);

  const form = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedEvent) {
      const event = eventData.find((e) => e._id === selectedEvent);
      setLinkedCoordinators(event?.coordinators || []);
    }
  }, [selectedEvent, eventData]);

  const handleDelete = (e, coordinatorId) => {
    e.preventDefault();
    handleDeLink(coordinatorId, selectedEvent);
    fetchData();
  };

  const onSubmit = (data) => {
    handleLink(data.coordinator, selectedEvent);
    form.reset();
  };

  return (
    <div>
      <div className="space-y-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex flex-col items-center mb-4"
          >
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
                            "justify-between w-[300px]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? restructuredEventData.find(
                                (e) => e.value === field.value
                              )?.label
                            : "Select Event"}
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
                            {restructuredEventData.map((e) => (
                              <CommandItem
                                value={e.label}
                                key={e.value}
                                onSelect={() => {
                                  field.onChange(e.value);
                                  setSelectedEvent(e.value);
                                  setOpenPop(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    e.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {e.label}
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
            {selectedEvent && (
              <>
                {/* Table of Linked Coordinators */}
                <div className="overflow-x-auto my-8">
                  <Table>
                    <TableCaption>Related Coordinators</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {linkedCoordinators.map((coordinator) => (
                        <TableRow key={coordinator._id}>
                          <TableCell className="font-medium">
                            {coordinator.name}
                          </TableCell>
                          <TableCell>{coordinator.mobile}</TableCell>
                          <TableCell>{coordinator.batch}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              onClick={(e) => handleDelete(e, coordinator._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Add Coordinator Selector */}
                <FormField
                  control={form.control}
                  name="coordinator"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-white">
                        Select Coordinator
                      </FormLabel>
                      <Popover open={openPop2} onOpenChange={setOpenPop2}>
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
                                ? restructuredCoordinatorData?.find(
                                    (e) => e.value === field.value
                                  )?.label
                                : "Select Coordinator"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search Coordinator..." />
                            <CommandEmpty>No Coordinator found.</CommandEmpty>
                            <ScrollArea className="h-48 overflow-auto">
                              <CommandGroup>
                                {restructuredCoordinatorData?.map((e) => (
                                  <CommandItem
                                    value={e.label}
                                    key={e.value}
                                    onSelect={() => {
                                      field.onChange(e.value);
                                      setOpenPop2(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        e.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {e.label}
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
                <Button type="submit" disabled={loading}>
                  Assign
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

function CoordinatorView({
  loading,
  eventData,
  coordinatorData,
  restructuredEventData,
  restructuredCoordinatorData,
  fetchData,
  handleLink,
  handleDeLink,
}) {
  const [openPop, setOpenPop] = useState(false);
  const [openPop2, setOpenPop2] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [linkedEvents, setLinkedEvents] = useState([]);

  const form = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedCoordinator) {
      const coordinator = coordinatorData.find(
        (c) => c._id === selectedCoordinator
      );
      setLinkedEvents(coordinator?.events || []);
    }
  }, [selectedCoordinator, coordinatorData]);

  const handleDelete = (e, eventId) => {
    e.preventDefault();
    handleDeLink(selectedCoordinator, eventId);
    fetchData();
  };

  const onSubmit = (data) => {
    handleLink(selectedCoordinator, data.event);
    form.reset();
  };

  return (
    <div>
      <div className="space-y-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex flex-col items-center mb-4"
          >
            <FormField
              control={form.control}
              name="coordinator"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">
                    Select Coordinator
                  </FormLabel>
                  <Popover open={openPop2} onOpenChange={setOpenPop2}>
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
                            ? restructuredCoordinatorData?.find(
                                (e) => e.value === field.value
                              )?.label
                            : "Select Coordinator"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Coordinator..." />
                        <CommandEmpty>No Coordinator found.</CommandEmpty>
                        <ScrollArea className="h-48 overflow-auto">
                          <CommandGroup>
                            {restructuredCoordinatorData?.map((e) => (
                              <CommandItem
                                value={e.label}
                                key={e.value}
                                onSelect={() => {
                                  field.onChange(e.value);
                                  setSelectedCoordinator(e.value);
                                  setOpenPop2(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    e.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {e.label}
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

            {selectedCoordinator && (
              <>
                {/* Table of Linked Coordinators */}
                <div className="overflow-x-auto my-8">
                  <Table>
                    <TableCaption>Related Events</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">EventId</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {linkedEvents.map((ev) => (
                        <TableRow key={ev._id}>
                          <TableCell>{ev.eventId}</TableCell>
                          <TableCell className="font-medium">
                            {ev.name}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              onClick={(e) => handleDelete(e, ev._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Add Event Selector */}
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
                                "justify-between w-[300px]",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? restructuredEventData.find(
                                    (e) => e.value === field.value
                                  )?.label
                                : "Select Event"}
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
                                {restructuredEventData.map((e) => (
                                  <CommandItem
                                    value={e.label}
                                    key={e.value}
                                    onSelect={() => {
                                      field.onChange(e.value);
                                      setOpenPop(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        e.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {e.label}
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
                <Button type="submit" disabled={loading}>
                  Assign
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function EventCoordinatorAssignment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState([]);
  const [coordinatorData, setCoordinatorData] = useState([]);
  const [restructuredEventData, setRestructuredEventData] = useState([]);
  const [restructuredCoordinatorData, setRestructuredCoordinatorData] =
    useState([]);

  const fetchCoordinatorData = async () => {
    setLoading(true);

    try {
      // const toastId = toast.loading("Loading ....");
      const { data } = await apiConnector(
        "GET",
        "/api/admin/coordinator/getAllCoordinator"
      );
      setLoading(false);
      // toast.dismiss(toastId);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setCoordinatorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEventData = async () => {
    setLoading(true);

    try {
      // const toastId = toast.loading("Loading ....");
      const { data } = await apiConnector("POST", "/api/event/getAllEvent");
      setLoading(false);
      // toast.dismiss(toastId);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setEventData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    fetchCoordinatorData();
    fetchEventData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const restructuredEvents = eventData?.map((ev) => ({
      label: `${ev?.eventId} - ${ev?.name}`,
      value: ev?._id,
    }));
    setRestructuredEventData(restructuredEvents);
  }, [eventData]);

  useEffect(() => {
    const restructuredCoordinators = coordinatorData?.map((co) => ({
      label: co?.name,
      value: co?._id,
    }));
    setRestructuredCoordinatorData(restructuredCoordinators);
  }, [coordinatorData]);

  const handleLink = async (coordinatorId, eventId) => {
    setLoading(true);
    const obj = {
      eventId: eventId,
      coordinatorId: coordinatorId,
    };
    try {
      const toastId = toast.loading("Assigning Coordinator...");
      const { data } = await apiConnector(
        "POST",
        "/api/admin/coordinator/linkCoordinatorToEvent",
        obj
      );
      toast.dismiss(toastId);
      setLoading(false);
      if (data.success) {
        toast.success("Coordinator Assigned Successfully!");
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeLink = async (coordinatorId, eventId) => {
    setLoading(true);
    const obj = {
      eventId: eventId,
      coordinatorId: coordinatorId,
    };
    try {
      const toastId = toast.loading("Removing Coordinator...");
      const { data } = await apiConnector(
        "POST",
        "/api/admin/coordinator/removeCoordinatorFromEvent",
        obj
      );
      toast.dismiss(toastId);
      setLoading(false);
      if (data.success) {
        toast.success("Coordinator Removed Successfully!");
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <>
      {/* <div className="flex justify-center container mt-4 mb-8">
        <Button onClick={(e) => handleClick(e, "/admin/hospitality/details")}>
          View Allocation Details
        </Button>
      </div> */}
      <div className="flex justify-center mt-4 mb-8 p-2">
        <Tabs defaultValue="vEvent" className="w-3/4 lg:w-5/6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vEvent">Via Event</TabsTrigger>
            <TabsTrigger value="vCoordinator">Via Coordinator</TabsTrigger>
          </TabsList>
          <TabsContent value="vEvent">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Via Event</CardTitle>
                  <CardDescription>
                    Assign and View Coordinator related to an event.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EventView
                    restructuredEventData={restructuredEventData}
                    restructuredCoordinatorData={restructuredCoordinatorData}
                    eventData={eventData}
                    coordinatorData={coordinatorData}
                    handleLink={handleLink}
                    handleDeLink={handleDeLink}
                    fetchData={fetchData}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="vCoordinator">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Via Coordinator</CardTitle>
                  <CardDescription>
                    Assign and View Event related to a coordinator.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CoordinatorView
                    restructuredEventData={restructuredEventData}
                    restructuredCoordinatorData={restructuredCoordinatorData}
                    eventData={eventData}
                    coordinatorData={coordinatorData}
                    handleLink={handleLink}
                    handleDeLink={handleDeLink}
                    fetchData={fetchData}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
