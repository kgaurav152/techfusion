"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const EventCreationForm = () => {

  const EventCreationFormSchema = z.object({
    eventType: z.enum(['cultural', 'technical'], { message: "Select a valid option"} ),
    id: z.string().min(1, { message: "Id must be of min. 1 digit"}),
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(2, { message: "Name must be 2 or more characters long" } ),
    participationMode: z.enum([0,1], { message: "Select a valid option"} ),
    description: z.string({ message: "Description can't be empty!"}),
    rulebookLink: z.string().url(),
    posterUrl: z.string().url(),
  })

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EventCreationFormSchema),
    mode: "onChange",
  })

  const onSubmit = async (data) => {    
    setIsLoading(true);

    const obj = {
      eventType: data.eventType,
      id: data.id,
      name: data.name,
      participationMode: data.participationMode,
      description: data.description,
      rulebookLink: data.rulebookLink,
      posterUrl: data.posterUrl
    };
    
    try {
      const { data } = await axios.post("/api/createevent", obj);
      setIsLoading(false);
      if (data.success) {
        toast.success("Event Created!");
        // router.push("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  return (
            
    <React.Fragment>
      <div className="text-center mb-4 text-border flex-col">
        <h1 className="font-bold text-[3rem] text-border-white">Create New Event</h1>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 mt-3 text-left">
          <CardContent>
              <div className="flex items-center pt-4">
                <p className="font-semibold font-mono">Fill details below carefully!</p>
              </div>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex flex-col items-center mb-8">
          <div className="mx-auto w-4/5 gap-2 lg:grid lg:grid-cols-2 lg:gap-4 max-w-xl mb-4">
            <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Select Type of Event*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder= "Select One" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Enter Event Id*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Id of Event" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name of Event*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name of Event" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="participationMode"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Event Participation Type*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder= "Select One" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="0">Individual</SelectItem>
                        <SelectItem value="1">Group</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Description*</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Enter description of the event here" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="rulebookLink"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Rule Book Link*</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter rulebook drive link" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="posterUrl"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Poster URL*</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter imgur URL of Poster of Event" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none" >Create Event</Button>
        </form>
      </Form>
    </React.Fragment>
  )
}

export default EventCreationForm;