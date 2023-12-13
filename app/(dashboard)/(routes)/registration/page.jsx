"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

import Network from "@/components/network";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const colleges = [
    'katihar Engineering College',

]

const studentSignupFormSchema = z.object({
  fname: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  lname: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email().optional(),
  father_name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
//   date_of_birth: z.date({
//     required_error: "A date of birth is required.",
//   }),
  registration_no: z.string({
    required_error: "Please enter a valid registration number.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
//   pincode: z.string({
//     required_error: "Pincode is required.",
//   }),
//   nominee_email: z.string().email({
//     message: "Please enter a valid email address.",
//   }).optional(),
//   nominee_type: z.string({
//     message: "Please enter a valid nominee type.",
//   }).optional(),
  mobile: z.string().min(2, {
    message: "Mobile number must be at least 2 digits.",
  }).max(10, {
    message: "Mobile number cannot be longer than 10 digits.",
  }).optional(),
//   user_name: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }).max(30, {
//     message: "Username must not be longer than 30 characters.",
//   }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
//   confirmPassword: z.string().min(8, {
//     message: "Password must be at least 8 characters long.",
//   }),
});

export function StudentSignupForm({setOpen}) {

  const form = useForm({
    resolver: zodResolver(studentSignupFormSchema),
    mode: "onChange",
  })

  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {    
    setIsLoading(true);

    const fieldMap = {
      name: data.name,
      email: data.email,
      father_name: data.father_name,
      mother_name: data.mother_name,
      date_of_birth: data.date_of_birth,
      registration_no: data.registration_no,
      address: data.address,
      pincode: data.pincode,
      nominee_email: data.nominee_email,
      nominee_type: data.nominee_type,
      mobile: data.mobile,
      user_name: data.user_name,
      password: data.password,
      user_type: "5",
    };

    const obj = Object.fromEntries(
      Object.entries(fieldMap).filter(([_, value]) => value !== undefined && value !== null)
    );

    new Network().hit("account", "create", obj, (responseData) => {
      if (responseData) {
        setOpen(false);
      }
    })
    setIsLoading(false);
  }

  return (
            


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input placeholder="Name" {...field} />
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
                <FormLabel />
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
            name="father_name"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="Father's Name" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="mother_name"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="Mother's Name" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel />
                <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? (
                        format(field.value, "PPP")
                        ) : (
                        <span>Date of Birth</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1960}
                    toYear={2030}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    />
                </PopoverContent>
                </Popover>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="registration_no"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="Registration Number" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="Address" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="Pin Code" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="nominee_email"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="Nominee Email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="nominee_type"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="Nominee Type" {...field} />
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
                <FormLabel />
                <FormControl>
                <Input placeholder="Mobile Number" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
            <FormItem>
                <FormLabel />
                <FormControl>
                <Input placeholder="User Name" {...field} />
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
                <FormLabel />
                <FormControl>
                <Input placeholder="Password" {...field} />

                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />    
        <Button type="submit" disabled={isLoading}>Save</Button>
      </form>
    </Form>

  )
}