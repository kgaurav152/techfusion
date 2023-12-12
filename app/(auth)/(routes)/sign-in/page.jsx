"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Network from "@/components/network";
// import { useDispatch } from "react-redux";
// import { setClasses } from "@/redux/slices/classSlice"; 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form" 
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToken } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { CloudCog } from "lucide-react";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
   
  const form = useForm(
   { mode : "onChange"}
  );
  // const {token} = useSelector((state)=>state.auth)
  const router = useRouter();
  const [open, setOpen] = useState(true); 
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    setLoading(true);
    const {data} = await axios.post("/api/login",formData); 
    setLoading(false);  
    if(data.success){
      localStorage.setItem("token",JSON.stringify(data.token));
      dispatch(setToken(data.token)); 
      toast.success("Login Successfull");
      router.push("/")
    }
    else{
      toast.error(data.message);
    }
  
     
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign In to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username and password below
          </p>
        </div>
        <div className={cn("grid gap-6")}>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                Trouble logging in?
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={(e) => handleClick(e, "/forgot-password")}
          >
            Forgot Password
          </Button>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking Sign In, you agree to our{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
