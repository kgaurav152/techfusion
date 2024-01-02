"use client"

// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check } from "lucide-react";
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
} from "@/components/ui/command"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage 
} from "@/components/ui/avatar"
import { apiConnector } from "@/helpers/apiConnector";


const EventRegistrationForm = () => {
  
  const { user } = useSelector((state) => state.profile);

  const neonTextStyle = {
    marginTop: '5vh',
    marginBottom: '5vh',
    fontFamily: 'Helvetica Neue, sans-serif',
    // backgroundColor: '#010a01',
    // textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 100,
    textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa',
    animation: 'flicker 1.5s infinite alternate',
    color: '#fff',
  };
  
  // const GroupEventRegistrationFormSchema = z.object({
  //   event: z.any({message:"Select an Event!"}),
  //   teamLead: z.string(),
  //   tmOne: z.string({message:"Enter a Valid Id"}),
  //   tmTwo: z.string({message:"Enter a Valid Id"}).optional(),
  //   tmThree: z.string({message:"Enter a Valid Id"}).optional(),
  //   teamName: z.string({message:"Enter a Team Name"})
  // });
  
  // const IndividualEventRegistrationFormSchema = z.object({
  //   event: z.any({message:"Select an Event!"}),
  //   teamLead: z.string(),
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);  
  const [eventData, setEventData] = useState([]);
  // const router = useRouter();

  // const form = if (form.watch('event')?.split('@')[1]==='Individual') {
  //   useForm({
  //   resolver: zodResolver(IndividualEventRegistrationFormSchema),
  //   mode:"onChange"
  //   })
  // } else {
  //   useForm({
  //     resolver: zodResolver(GroupEventRegistrationFormSchema),
  //     mode:"onChange"
  //     })
  // }

  // const form = useForm({
  //   // resolver: form.watch('event')?.split('@')[1]==='Individual'? zodResolver(IndividualEventRegistrationFormSchema): zodResolver(GroupEventRegistrationFormSchema),
  //   // resolver: (data) =>{
  //     if (form.watch('event')?.split('@')[1]==='Individual') {
  //       resolver: zodResolver(IndividualEventRegistrationFormSchema),
  //     } else {
  //       resolver: zodResolver(GroupEventRegistrationFormSchema),
  //     }
  //   // },
  //   mode: "onChange",
  // })

  // const form = useForm({
  //   resolver:
  //     form.watch('event')?.split('@')[1] === 'Individual'
  //       ? zodResolver(IndividualEventRegistrationFormSchema)
  //       : zodResolver(GroupEventRegistrationFormSchema),
  //   mode: 'onChange',
  // });

  const form= useForm({
    mode:'onChange'
  })

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
        const { data } = await apiConnector("GET","/api/event/getAllEvent")
        setIsLoading(false);
        if (data.success) {
        const unRestructuredEvents=data.data;
        const restructuredEvents = unRestructuredEvents.map((event) => ({
          label: `${event.eventId} - ${event.name}`,
          value: `${event._id}@${event.participationMode}`,
          // participationMode:event.participationMode
        }));
        setEventData(restructuredEvents);
        } else {
        toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
  }
  
  useEffect(()=>{
    fetchEvents();
  },[])

  const onSubmit = async (data) => {    
    setIsLoading(true);
    const tempObj = data.event?.split('@')[1]==='Individual'? {
      event_id:data.event?.split('@')[0],
      team_name:user.name,
      team_lead:user.festId,
      team_member_1:null,
      team_member_2:null,
      team_member_3:null,
    }: {
      event_id:data.event?.split('@')[0],
      team_name:data.teamName,
      team_lead:user.festId,
      team_member_1:data.tmOne,
      team_member_2:data.tmTwo?data.tmTwo:null,
      team_member_3:data.tmThree?data.tmThree:null,
    }
    const obj = tempObj;

    console.log(obj);
    // try {
    //   const toastId = toast.loading("Regestring Event...")
    //   const { data } = await axios.post("/api/eventRegistration", obj);
    //   toast.dismiss(toastId);
    //   setIsLoading(false);
    //   if (data.success) { 
    //     toast.success("Registered for Event Successfully!");
    //     form.reset();
    //   } else {
    //     toast.error(data.message);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
            
    <React.Fragment>
      <div className="text-center mb-4 text-border flex-col">
        <h1 className="font-bold text-[3rem] text-border-white" style={{ ...neonTextStyle }}>Enroll for Event Below</h1>
        <Card className="mx-auto w-4/5 max-w-xl mt-2 mb-2 text-left">
          <CardHeader>
            <CardTitle>For all your queries, feel free to contact:</CardTitle>
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
                  <p className="text-sm font-medium leading-none">Mohit Kumar</p>
                  <a href="https://wa.me/917257827104?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration." target="_blank" rel="noopener noreferrer" className="text-sm text-blue-800">+917257827104</a>
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
                  <p className="text-sm font-medium leading-none">Kumar Gaurav</p>
                  <a href="https://wa.me/917004174269?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration." target="_blank" rel="noopener noreferrer" className="text-sm text-blue-800">+917004174269</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 text-left">
          <CardContent>
              <div className="flex items-center pt-4">
                <p className="font-semibold font-mono">Note: For Group Events min. 2 and max. 4 members (Including Team Leader) can be part of a group.</p>
              </div>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex flex-col items-center mb-8">
          <div className="mx-auto w-4/5 gap-2 lg:grid lg:grid-cols-2 lg:gap-4 max-w-xl mb-4">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Select Event</FormLabel>
                  <Popover open={openPop} onOpenChange={setOpenPop} >
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
                              )?.level
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
            {form.watch('event')?.split('@')[1] === "Group" && (
              // selectedEvent && selectedEvent.participatingType==group
            <>
            <FormField
                control={form.control}
                name="teamLead"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Team Leader Id*</FormLabel>
                    <FormControl>
                      <Input disabled defaultValue={user.festId}/>
                    </FormControl>
                    <FormDescription>If you want other member of your team to be a leader ask them to register for the event instead.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="tmOne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Team Member 1*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Team Member's TechFest Id" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="tmTwo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Team Member 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Team Member's TechFest Id" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="tmThree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Team Member 3</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Team Member's TechFest Id" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
            />
            <div>
              <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Team Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Team Name" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            </>
            )}        
            {form.watch('event')?.split('@')[1] === "Individual" && (
            <>
            <FormField
                control={form.control}
                name="teamLeadIndividial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Participant's TechFest Id</FormLabel>
                    <FormControl>
                      <Input disabled defaultValue={user.festId} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
            />
            </>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none" >Participate</Button>
        </form>
      </Form>
    </React.Fragment>
  )
}

export default EventRegistrationForm;