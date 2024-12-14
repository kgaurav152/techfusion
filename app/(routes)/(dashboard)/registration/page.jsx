"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check, MousePointerClick, Search } from "lucide-react";
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
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  colleges,
  branches,
  batches,
  tshirtSizeValue,
  knowAbout,
} from "@/public/constants";

const RegistrationForm = () => {
  const neonTextStyle = {
    marginTop: "5vh",
    marginBottom: "5vh",
    fontFamily: "Helvetica Neue, sans-serif",
    // backgroundColor: '#010a01',
    // textTransform: 'uppercase',
    textAlign: "center",
    fontWeight: 100,
    textShadow:
      "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa",
    animation: "flicker 1.5s infinite alternate",
    color: "#fff",
  };

  const RegistrationFormSchema = z
    .object({
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be a string",
        })
        .min(2, { message: "Name must be 5 or more characters long" }),
      email: z.string().email(),
      mobile: z
        .string()
        .min(10, { message: "Mobile no. must be 10 digits" })
        .max(10, { message: "Mobile no. must be 10 digits" }),
      password: z
        .string()
        .min(8, { message: "Password must be longer than 8 characters" }),
      confirmPassword: z.string(),
      gender: z.enum(["Male", "Female"], { message: "Select a valid option" }),
      college: z.string({ message: "Must be a valid College Name" }),
      branch: z.string({ message: "Must be a valid branch" }),
      batch: z.string({ message: "Must be a valid batch" }),
      knowAbout: z.string({ message: "Select a valid option" }),
      accomodation: z.enum(["Yes", "No"], { message: "Select a valid option" }),
      tShirtSize: z.string().optional(),
      paymentMethod: z.enum(["ca", "ba"], { message: "Select a valid option" }),
      otherCollege: z.string().optional(),
      ca_no_ba: z.string().optional(),
      ca_no_ca: z.string().optional(),
      trx_id: z.string().optional(),
      trx_img: z.any(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must be same.",
      path: ["confirmPassword"],
    });

  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccessfulPopup, setIsRegistrationSuccessfulPopup] =
    useState(false);
  const [user, setUser] = useState(null);
  const [openPop, setOpenPop] = useState(false);
  const [file, setFile] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(RegistrationFormSchema),
    mode: "onChange",
  });
  const fileHandler = (e) => {
    console.log("File Handler");
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handleRegistrationSuccessfulPopupRedirect = () => {
    setIsRegistrationSuccessfulPopup(false);
    router.push("/sign-in");
  };

  const handleRegistrationSuccessfulPopupCancel = () => {
    setIsRegistrationSuccessfulPopup(false);
    router.push("/sign-in");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRegistrationSuccessfulPopup) {
        setIsRegistrationSuccessfulPopup(false);
        router.push("/sign-in");
      }
    }, 20000); // Redirect to sign-in page after 20 seconds if popup is not closed
    return () => clearTimeout(timer);
  }, [isRegistrationSuccessfulPopup]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (data.college != "other") {
      data.otherCollege = null;
    }

    const conditionalAmount =
      data.college === "Katihar Engineering College, Katihar" &&
      data.tShirt === "No"
        ? 250
        : data.college === "Katihar Engineering College, Katihar" &&
          data.tShirt === "Yes"
        ? 600
        : data.college != "Katihar Engineering College, Katihar" &&
          data.tShirt === "No"
        ? 300
        : data.college != "Katihar Engineering College, Katihar" &&
          data.tShirt === "Yes"
        ? 650
        : 300;

    // const conditionalAmount =
    //   data.college === "Katihar Engineering College, Katihar" ? 250 : 300;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.confirmPassword);
    formData.append("gender", data.gender);
    formData.append("college", data.college);
    formData.append("branch", data.branch);
    formData.append("batch", data.batch);
    formData.append("knowAbout", data.knowAbout);
    formData.append("accomodation", data.accomodation);
    formData.append("tShirtSize", "No");
    formData.append("paymentMethod", data.paymentMethod);
    formData.append(
      "ca_no",
      data.ca_no_ba == null ? data.ca_no_ca : data.ca_no_ba
    );
    formData.append(
      "transaction_id",
      data.trx_id == null ? data.ca_no_ca : data.trx_id
    );
    formData.append("screenshot", file);
    formData.append("registrationFee", conditionalAmount);

    const timeoutError = setTimeout(() => {
      toast.error("Request timed out. Please try again later.");
      setIsLoading(false);
    }, 120000);

    var toastId;

    try {
      toastId = toast.loading("Creating Account...");
      const { data } = await axios.post("/api/signup", formData);
      toast.dismiss(toastId);
      clearTimeout(timeoutError);
      setIsLoading(false);
      if (data.success) {
        toast.success("Registered Successfully!");
        setUser(data.savedUser);
        console.log(user);
        setIsRegistrationSuccessfulPopup(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      clearTimeout(timeoutError);
      toast.error("Something went wrong. Please try again later.");
      toast.dismiss(toastId);
      setIsLoading(false);
      console.log(err);
    }
  };

  // const fileRef = form.register('file', { required: true });

  return (
    <React.Fragment>
      {/*<div className="w-full p-2 mb-2 text-white text-center bg-blue-950">
    <span className="text-yellow-200">Registration deadline</span>: January 22, 2024, by 06:00 PM
    </div>*/}
      <div className="text-center mb-4 text-border flex-col">
        <h1
          className="font-bold text-[3rem] text-border-white"
          style={{ ...neonTextStyle }}
        >
          TechFusion&apos;25 Registration
        </h1>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 text-center bg-emerald-100">
          <CardHeader>
            <CardTitle>Already Registered ?</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="justify-center"
              variant=""
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              Sign In Now
            </Button>
          </CardContent>
        </Card>
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
                  <p className="text-sm font-medium leading-none">
                    Mohit Kumar
                  </p>
                  <a
                    href="https://wa.me/917257827104?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration."
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
                    href="https://wa.me/917004174269?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration."
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
        <Card className="mx-auto w-4/5 max-w-xl mb-8 text-left">
          <CardContent>
            <div className="flex items-center justify-center text-center pt-4 mb-8 mt-8">
              <p className="font-bold text-xl font-mono text-red-600">
                Oops! Registration is closed now!
              </p>
            </div>
            <div className="flex flex-col items-center pt-4">
              <p className="font-semibold font-mono mb-10">
                Having Issue with registration contact you Campus Ambassador
                below:
              </p>
              <Button
                className="justify-center mb-10"
                variant=""
                onClick={() => {
                  router.push("/torchbearers/campusambassador");
                }}
              >
                Find Your Campus Ambassador
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default RegistrationForm;
