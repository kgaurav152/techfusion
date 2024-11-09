"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiConnector } from "@/helpers/apiConnector";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isTokenvalid, setIsTokenvalid] = useState(false);
  const [error, setError] = useState("");

  const form = useForm();

  const checkTokenValidity = async () => {
    setChecking(true);
    try {
      const formattedValues = {
        token: token,
      };
      const { data } = await apiConnector(
        "POST",
        "/api/resetPassword/checkToken",
        formattedValues
      );
      if (data.success) {
        setIsTokenvalid(true);
      } else {
        console.log(data.message);
        // setIsTokenvalid(false);
      }
    } catch (err) {
      console.log(err);
    }
    setChecking(false);
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const onSubmit = async (formData) => {
    if (formData.newPassword !== formData.confirmnewPassword) {
      setError("New password and Confirm new password do not match");
      return;
    }
    setLoading(true);
    const formattedValues = {
      token: token,
      newPassword: formData.newPassword,
    };
    const { data } = await apiConnector(
      "POST",
      "/api/resetPassword/reset",
      formattedValues
    );
    setLoading(false);
    if (data.success) {
      toast.success("Password Reset Successful");
      router.push("/sign-in");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [form.watch("newPassword"), form.watch("confirmnewPassword")]);

  if (checking === true) {
    return (
      <React.Fragment>
        <Loader2 className="h-6 w-6 animate-spin mx-auto mt-16" />;
        <div className="flex items-center justify-center mt-3">
          <h3>Checking...</h3>
        </div>
      </React.Fragment>
    );
  }

  if (isTokenvalid == true) {
    return (
      <div className="w-11/12 mx-auto mt-16">
        <div className="max-w-[500px] border rounded-lg shadow-lg p-3 mx-auto">
          <h6 className="border-b py-2 text-center font-semibold text-lg">
            Change your Password
          </h6>
          <div className="my-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter New Password"
                          type="password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmnewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Confirm New Password"
                          type="password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{error}</FormMessage>
                    </FormItem>
                  )}
                />

                <Button className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <> Reset Password </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto mt-16">
      <div className="max-w-[500px] border rounded-lg shadow-lg p-3 mx-auto">
        <h6 className="border-b py-2 text-center font-semibold text-lg">
          Invalid or Expired Token
        </h6>
        <p className="text-center text-red-600">
          The token is either invalid or has expired. Please request a new
          password reset link.
        </p>
        <div className=" flex items-center justify-center m-4">
          <Button
            className="flex flex-row gap-2 text-center"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            Forgot Password
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
