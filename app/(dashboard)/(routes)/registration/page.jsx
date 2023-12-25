"use client"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import Network from "@/components/network";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { colleges, branches, batches, tshirtSizeValue, knowAbout } from "@/public/constants";


const RegistrationForm = () => {
  

  const RegistrationFormSchema = z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(2, { message: "Name must be 5 or more characters long" } ),
    email: z.string().email(),
    mobile: z.string().min(10, { message: "Mobile no. must be 10 digits"}).max(10, { message: "Mobile no. must be 10 digits"}),
    password: z.string().min(8, { message: "Password must be longer than 8 characters"} ),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female'],  { message: "Select a valid option"} ),
    college: z.string({ message: "Must be a valid College Name"}),
    branch: z.string({ message: "Must be a valid branch"}),
    batch: z.string({ message: "Must be a valid batch"}),
    knowAbout: z.string({ message: "Select a valid option"}),
    accomodation: z.enum(['yes', 'no'], { message: "Select a valid option"} ),
    tShirtSize: z.string( { message: "Select a valid option"} ),
    paymentMethod: z.enum(['ca', 'ba'], { message: "Select a valid option"} ),  
    otherCollege: z.string().min(2).optional(),
    // Add other fields to your schema
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password must be same.',
    path: ["confirmPassword"],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(RegistrationFormSchema),
    mode: "onChange",
  })

  const onSubmit = async (data) => {    
    setIsLoading(true);

    const obj = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      password: data.confirmPassword,
      gender: data.gender,
      college: data.college === 'other' ? data.otherCollege : data.college,
      branch: data.branch,
      batch: data.batch,
      knowAbout: data.knowAbout,
      accomodation: data.accomodation,
      tShirtSize: data.tShirtSize,
      paymentMethod: data.paymentMethod,
      // Add other fields to your obj based on your form
    };

    // new Network().hit("account", "create", obj, (responseData) => {
    //   if (responseData) {
    //     // setOpen(false);
    //   }
    // })

    console.log(obj);

    setIsLoading(false);
  }

  return (
            


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex flex-col items-center mb-8">
        <div className="mx-auto w-4/5 gap-2 lg:grid lg:grid-cols-2 lg:gap-4 max-w-xl mb-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Full Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Full Name" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Email*</FormLabel>
                  <FormControl>
                  <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Mobile No*</FormLabel>
                  <FormControl>
                  <Input placeholder="Enter 10 digit Mobile Number" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Password*</FormLabel>
                  <FormControl>
                  <Input placeholder="Password" {...field} type="password" />

                  </FormControl>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Confirm Password*</FormLabel>
                  <FormControl>
                  <Input placeholder="Confirm Password" {...field} />

                  </FormControl>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Gender*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder= "Select Gender" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">College</FormLabel>
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
                          ? colleges.find(
                              (college) => college.value === field.value
                            )?.label
                          : "Select College"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search College..." />
                      <CommandEmpty>No College found.</CommandEmpty>
                      <ScrollArea className="h-48 overflow-auto">
                        <CommandGroup>
                          {colleges.map((college) => (
                            <CommandItem
                              value={college.label}
                              key={college.value}
                              onSelect={() => {
                                form.setValue("college", college.value);
                                setOpenPop(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  college.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {college.label}
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
          {form.watch('college') === "other" && (
          <FormField
              control={form.control}
              name="otherCollege"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">College Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter College Name" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Branch*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder= "Select Branch" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {branches &&
                          branches.map((item, index) => (
                            <SelectItem key={index}
                              value={item.value}
                            >{`${item.label}`}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Batch*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder= "Select Batch" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      {batches &&
                        batches.map((item, index) => (
                          <SelectItem key={index}
                            value={item.value}
                          >{item.label}</SelectItem>
                      ))}
                      </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="knowAbout"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">How did you came to know about TechKEC2024?*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder= "Select One" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      {knowAbout &&
                        knowAbout.map((item, index) => (
                          <SelectItem key={index}
                            value={item.value}
                          >{item.label}</SelectItem>
                      ))}
                      </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="accomodation"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Do you need Accomodation?*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder= "Select One" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />
          <FormField
                control={form.control}
                name="tShirtSize"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">T-Shirt Size*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder= "Select One" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {tshirtSizeValue &&
                          tshirtSizeValue.map((item, index) => (
                            <SelectItem key={index}
                              value={item.value}
                            >{item.label}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-white">Payment Method*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder= "Select One" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectItem value="ca">Through Campus Ambassador</SelectItem>
                      <SelectItem value="ba">Through Bank Account</SelectItem>
                      </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
              </FormItem>
            )}
          />  
        </div>
        <Button type="submit" disabled={isLoading} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none" >Register</Button>
      </form>
    </Form>

  )
}

export default RegistrationForm;