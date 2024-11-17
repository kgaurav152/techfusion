"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"; 
import {toast} from 'sonner'
import { apiConnector } from "@/helpers/apiConnector"; 
import ForgotPassword from "@/app/(auth)/(routes)/sign-in/forgot-password";

const SignInPage = () => { 

  const [loading,setLoading] = useState(false);
  const form = useForm({ mode: "onChange" }); 
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    setLoading(true);
    var toastId;
    try {
      toastId = toast.loading("Logging ....");
      const { data } = await apiConnector("POST", "/api/login", formData);
      setLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Login Successful"); 
        if (data?.data?.userType == "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="p-4 lg:p-8 min-h-screen">
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                        <Input
                          placeholder="Enter Your Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} className="w-full" type="submit">
                  Submit
                  </Button>
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
            <ForgotPassword />
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
      {/* {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-md w-4/5 lg:w-2/5">
            <Card className="mx-auto max-w-xl text-left">
              <CardHeader>
                <CardTitle>
                  For all your queries, feel free to contact:
                </CardTitle>
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
                      <p className="text-sm font-medium leading-none">
                        Mohit Kumar
                      </p>
                      <a
                        href="https://wa.me/917257827104?text=Hello!%20I%20have%20some%20Query%20related%20to%20Sign%20In."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-800"
                      >
                        +917257827104
                      </a>
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
                      <p className="text-sm font-medium leading-none">
                        Kumar Gaurav
                      </p>
                      <a
                        href="https://wa.me/917004174269?text=Hello!%20I%20have%20some%20Query%20related%20to%20Sign%20In."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-800"
                      >
                        +917004174269
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex mt-8 justify-center">
              <Button
                variant=""
                onClick={() => {
                  setOpen(false);
                }}
              >
                Back to Sign In
              </Button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default SignInPage;
