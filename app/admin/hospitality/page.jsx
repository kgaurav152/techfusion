"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {toast} from 'sonner'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Accomodation({allParticipantsData,fetchAllParticipants}) {
  // const [allParticipantsData, setAllParticipantsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  // const fetchAllParticipants = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await apiConnector("POST", "/api/getAllParticipants");
  //     setLoading(false);
  //     if (data.success) {
  //       const unRestructuredUsers = data.data;
  //       const restructuredUsers = unRestructuredUsers.map((user) => ({
  //         label: `${user.festId} - ${user.name}`,
  //         value: user._id,
  //         tShirtSize: user.tShirtSize,
  //         paymentStatus: user.status,
  //         accomodation: user.accomodation,
  //         gender: user.gender,
  //         tShirtAllocation: user.tShirtAllocation, //true,false/1,0
  //         roomAllocation: user.roomAllocation, //true,false/1,0
  //         roomNo: user.roomNo, //actual room no
  //         noOfDays: user.noOfDays, //no of days
  //       }));
  //       setAllParticipantsData(restructuredUsers);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllParticipants();
  // }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const obj = {
      userId: data.user.value,
      roomAllocation: true,
      roomNo:
        data.user?.gender == "Female" ? "A" + data.room_no : "N" + data.room_no,
      noOfDays: data.day,
      roomAmount: data.amount,
    };
    try {
      const toastId = toast.loading("Allocating Room...");
      const { data } = await apiConnector("POST", "/api/roomAllocation", obj);
      toast.dismiss(toastId);
      setLoading(false);
      if (data.success) {
        toast.success("Room Allocated Successfully!");
        fetchAllParticipants();
        form.reset();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <div className="space-y-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex flex-col items-center mb-4"
          >
            <div className="max-w-xl mb-4">
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Select User</FormLabel>
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
                              ? allParticipantsData.find(
                                  (user) => user.value === field.value.value
                                )?.label
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
                                    form.setValue("user", user);
                                    setOpenPop(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      user.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
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
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("user") &&
              form.watch("user")?.accomodation === "No" ? (
                <>
                  <p className="font-mono mt-4">
                    The Participant hasn&apos;t opted for accomodation.
                  </p>
                </>
              ) : (
                <>
                  {form.watch("user") &&
                    (form.watch("user")?.accomodation === "Yes" &&
                    form.watch("user")?.roomAllocation === true ? (
                      <>
                        <p className="font-mono mt-4">
                          Participant have been allocated Room No.:{" "}
                          <span className="font-semibold">
                            {form.watch("user")?.roomNo}
                          </span>{" "}
                          for{" "}
                          <span className="font-semibold">
                            {form.watch("user")?.noOfDays}
                          </span>{" "}
                          Days
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-mono mt-4 mb-2">
                          Gender: {form.watch("user")?.gender}
                        </p>
                        <p className="font-mono mt-4 mb-2">
                          Hostel To be Allocated:{" "}
                          {form.watch("user")?.gender === "Female"
                            ? "Girls Hostel Alaknanda"
                            : "Boys Hostel Nilgiri"}
                        </p>
                        <FormField
                          control={form.control}
                          name="room_no"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Room No.
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Room No. to be Allocated"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="day"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Days</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select No. of Days" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Amount
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Total Amount Collected"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          disabled={loading}
                          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl mt-5 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
                        >
                          Allocate Room
                        </Button>
                      </>
                    ))}
                </>
              )}

              {/* {form.watch('user')?.accomodation === "Yes" && form.watch('user')?.roomAllocation === false && (
                
                )} */}
            </div>

            {/* {form.watch('user')?.accomodation === "Yes"  && (
                <>   
                    <Button type="submit" disabled={loading} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none" >Allocate Room</Button>
                </>
                )} */}
          </form>
        </Form>
      </div>
    </div>
  );
}

export function TShirt({fetchAllParticipants,allParticipantsData}) {
 
  const [loading, setLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

 
  const onSubmit = async (data) => {
    setLoading(true);

    const obj = {
      userId: data.user.value,
      tShirtAllocation: true,
    };

    // console.log(obj);
    try {
      const toastId = toast.loading("Alloting Tshirt...");
      const { data } = await apiConnector("POST", "/api/tShirtAllocation", obj);
      toast.dismiss(toastId);
      setLoading(false);
      if (data.success) {
        toast.success("Tshirt Alloted Successfully!");
        fetchAllParticipants();
        form.reset();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <div className="space-y-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex flex-col items-center mb-4"
          >
            <div className="max-w-xl mb-4">
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Select User</FormLabel>
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
                              ? allParticipantsData.find(
                                  (user) => user.value === field.value.value
                                )?.label
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
                                    form.setValue("user", user);
                                    setOpenPop(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      user.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
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
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("user") &&
                (form.watch("user")?.tShirtAllocation === true ? (
                  <>
                    <p className="font-mono">
                      Sweat Shirt have already been alloted to the User.
                    </p>
                  </>
                ) : (
                  <>
                    {form.watch("user")?.tShirtAllocation === false &&
                    form.watch("user")?.tShirtSize === "No" ? (
                      <>
                        <p className="font-mono mt-4">
                          The Participant hasn&apos;t opted for T-Shirt.
                        </p>
                      </>
                    ) : (
                      <div className="flex flex-col gap-y-3 mt-4 px-2">
                        {form.watch("user")?.tShirtAllocation === false &&
                          form.watch("user")?.tShirtSize !== "No" && (
                            <>
                              <p className="font-mono">
                                User have selected{" "}
                                <b>{form.watch("user")?.tShirtSize}</b> size.
                              </p>
                              <Button
                                type="submit"
                                disabled={loading}
                                className="transition w-fit ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
                              >
                                Allot Sweat Shirt
                              </Button>
                            </>
                          )}
                      </div>
                    )}
                  </>
                ))}
            </div>

            {/* {form.watch("user")?.tShirtAllocation === false &&
              form.watch("user")?.tShirtSize !== "No" && <></>} */}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function Hospitality() {
  const router = useRouter();
  const [allParticipantsData, setAllParticipantsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllParticipants = async () => {
    setLoading(true);
    try {
      const { data } = await apiConnector("POST", "/api/getAllParticipants");
      setLoading(false);
      if (data.success) {
        const unRestructuredUsers = data.data;
        const restructuredUsers = unRestructuredUsers.map((user) => ({
          label: `${user.festId} - ${user.name}`,
          value: user._id,
          tShirtSize: user.tShirtSize,
          gender: user.gender,
          paymentStatus: user.status,
          accomodation: user.accomodation,
          tShirtAllocation: user.tShirtAllocation, //true,false/1,0
          roomAllocation: user.roomAllocation, //true,false/1,0
          roomNo: user.roomNo, //actual room no
          noOfDays: user.noOfDays, //no of days
        }));
        setAllParticipantsData(restructuredUsers);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllParticipants();
  }, []);


  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <>
      <div className="flex justify-center container mt-4 mb-8">
        <Button onClick={(e) => handleClick(e, "/admin/hospitality/details")}>
          View Allocation Details
        </Button>
      </div>
      <div className="flex justify-center mt-4 mb-8 p-2">
        <Tabs defaultValue="accomodation" className="w-[400px] lg:w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="accomodation">Accomodation</TabsTrigger>
            <TabsTrigger value="tShirt">Sweat Shirt</TabsTrigger>
          </TabsList>
          <TabsContent value="accomodation">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Accomodation</CardTitle>
                  <CardDescription>
                    Allocate and View Accomodation related information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accomodation allParticipantsData={allParticipantsData} fetchAllParticipants={fetchAllParticipants}/>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="tShirt">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sweat Shirt</CardTitle>
                  <CardDescription>
                    Allot Sweat Shirt and View Status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TShirt allParticipantsData={allParticipantsData} fetchAllParticipants={fetchAllParticipants}/>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
