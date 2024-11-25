"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const CertificateVerificationForm = () => {
  const neonTextStyle = {
    marginTop: "5vh",
    marginBottom: "5vh",
    fontFamily: "Helvetica Neue, sans-serif",
    textAlign: "center",
    fontWeight: 100,
    textShadow:
      "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa",
    animation: "flicker 1.5s infinite alternate",
    color: "#fff",
  };

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const CertificateVerificationFormSchema = z.object({
    certId: z
      .string({
        required_error: "Certificate Id is required",
        invalid_type_error:
          "Certificate Id must be a combination of characters and numbers",
      })
      .min(2, { message: "Certificate Id must be 13 characters long" })
      .max(13, {
        message: "Certificate Id cannot be longer than 13 characters",
      }),
  });

  const form = useForm({
    resolver: zodResolver(CertificateVerificationFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    router.push(`/verifycertificate/${data.certId}`);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <div className="text-center w-11/12 mx-auto mb-4 text-border flex-col">
        <h1
          className="font-bold text-[2rem] md:text-[3rem] text-border-white"
          style={{ ...neonTextStyle }}
        >
          Verify TechFusion&apos;24 Participation Certificate
        </h1>
        <Card className="mx-auto w-full max-w-xl mb-8 mt-20 text-left">
          <CardHeader>
            <CardTitle>
              <h2 className="font-bold text-xl">
                Enter TechFusion&apos;24 Certificate Id Below To Verify
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className="w-full max-w-md mx-auto space-y-5"
              >
                <FormField
                  control={form.control}
                  name="certId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Id*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Certificate Id" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="transition mx-auto ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
                >
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CertificateVerificationForm;
