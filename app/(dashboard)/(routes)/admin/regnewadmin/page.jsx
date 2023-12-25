"use client"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import Network from "@/components/network";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";


const AdminRegistrationForm = () => {

  const AdminRegistrationFormSchema = z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(2, { message: "Name must be 5 or more characters long" } ),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be longer than 8 characters"} ),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password must be same.',
    path: ["confirmPassword"],
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(AdminRegistrationFormSchema),
    mode: "onChange",
  })

  const onSubmit = async (data) => {    
    setIsLoading(true);

    const obj = {
      name: data.name,
      email: data.email,
      password: data.confirmPassword,
      userType: 'admin'
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
            
    <React.Fragment>
      <div className="text-center mb-4 text-border flex-col">
        <h1 className="font-bold text-[3rem] text-border-white">Register New Admin</h1>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 mt-3 text-left">
          <CardContent>
              <div className="flex items-center pt-4">
                <p className="font-semibold font-mono">Remember password to avoid password recovery hassle and to protect account.</p>
              </div>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex flex-col items-center mb-8">
          <div className="mx-auto w-4/5 gap-2 lg:grid lg:grid-cols-2 lg:gap-4 max-w-xl mb-4">
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
          </div>
          <Button type="submit" disabled={isLoading} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none" >Create New Admin</Button>
        </form>
      </Form>
    </React.Fragment>
  )
}

export default AdminRegistrationForm;