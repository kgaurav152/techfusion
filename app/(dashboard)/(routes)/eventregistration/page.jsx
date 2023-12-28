"use client"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

// import Network from "@/components/network";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check } from "lucide-react";
// import { format } from "date-fns";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

// import { colleges, branches, batches, tshirtSizeValue, knowAbout } from "@/public/constants";


const EventRegistrationForm = () => {
  
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

  // const RegistrationFormSchema = z.object({
  //   name: z.string({
  //     required_error: "Name is required",
  //     invalid_type_error: "Name must be a string",
  //   }).min(2, { message: "Name must be 5 or more characters long" } ),
  //   email: z.string().email(),
  //   mobile: z.string().min(10, { message: "Mobile no. must be 10 digits"}).max(10, { message: "Mobile no. must be 10 digits"}),
  //   password: z.string().min(8, { message: "Password must be longer than 8 characters"} ),
  //   confirmPassword: z.string(),
  //   gender: z.enum(['male', 'female'],  { message: "Select a valid option"} ),
  //   college: z.string({ message: "Must be a valid College Name"}),
  //   branch: z.string({ message: "Must be a valid branch"}),
  //   batch: z.string({ message: "Must be a valid batch"}),
  //   knowAbout: z.string({ message: "Select a valid option"}),
  //   accomodation: z.enum(['yes', 'no'], { message: "Select a valid option"} ),
  //   tShirtSize: z.string( { message: "Select a valid option"} ),
  //   paymentMethod: z.enum(['ca', 'ba'], { message: "Select a valid option"} ),  
  //   otherCollege: z.string().optional(),
  //   ca_no_ba: z.string().optional(),
  //   ca_no_ca: z.string().optional(),
  //   trx_id: z.string().optional(),
  //   trx_img: z
  //   .any()
  // }).refine((data) => data.password === data.confirmPassword, {
  //   message: 'Password and confirm password must be same.',
  //   path: ["confirmPassword"],
  // });

  const [loading, setLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);  
  const [eventData, setEventData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    // resolver: zodResolver(RegistrationFormSchema),
    mode: "onChange",
  })

  const fetchEvents = async () => {
    setLoading(true);
    try {
        const { data } = await axios.post("/api/events",{});
        setLoading(false);
        if (data.success) {
        toast.success("Data Fetched Successfully!");
        setEventData(data.data);
        } else {
        toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
  }

  const onSubmit = async (data) => {    
    setIsLoading(true);

    if (data.college!='other') {
      data.otherCollege=null;
    };

    const obj = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      password: data.confirmPassword,
      gender: data.gender,
      college: data.college == 'other' ? data.otherCollege : data.college,
      branch: data.branch,
      batch: data.batch,
      knowAbout: data.knowAbout,
      accomodation: data.accomodation,
      tShirtSize: data.tShirtSize,
      paymentMethod: data.paymentMethod,
      ca_no: data.ca_no_ba == null ? data.ca_no_ba : data.ca_no_ba,
      transaction_id: data.trx_id == null ? '' : data.trx_id,
      screenshot: data.trx_img[0],
      // userType: 'Participant'
    };

    // console.log(obj);
    try {
      const toastId = toast.loading("Creating Account...")
      const { data } = await axios.post("/api/signup", obj);
      toast.dismiss(toastId);
      setIsLoading(false);
      if (data.success) { 
        toast.success("Registered Successfully!");
        // if(data.user.role=="admin"){
        //   router.push("/admin/dashboard");
        // }
        // else{
        //   router.push("/");
        // }
        router.push("/sign-in");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
    const fileRef = form.register('file', { required: true });

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
                              )?.label
                            : "Select Event"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search College..." />
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
            {form.watch('eventvent') === "team" && (
              // selectedEvent && selectedEvent.participatingType==group
            <div>
            <FormField
                control={form.control}
                name="teamLead"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Team Leader Id*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Team Leader TechFest Id" {...field} />
                    </FormControl>
                    <FormDescription />
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
            </div>
            )}        
            {form.watch('eventvent') === "individual" && (
              // selectedEvent && selectedEvent.participatingType==group
            <div>
            <FormField
                control={form.control}
                name="teamLead"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white"></FormLabel>
                    <FormControl>
                      <Input defaultValue={user.festId} {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
            />
            </div>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none" >Participate</Button>
        </form>
      </Form>
    </React.Fragment>
  )
}

export default EventRegistrationForm;