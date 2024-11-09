import React, { useEffect, useRef, useState } from "react";
import { getBaseUrl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useMutation } from "@tanstack/react-query";
// import { apiConnector } from "@/lib/api-connector";
import { apiConnector } from "@/helpers/apiConnector";
import CheckAnimation from "@/components/custom/check-animation";
import { Loader2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

const ForgotPassword = () => {
  const ref = useRef(null);
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const path = getBaseUrl() + "/reset-password";

  const onSubmit = async () => {
    setLoading(true);
    const formattedValues = {
      clientUrl: path,
      email: email,
    };
    // forgotPassword.mutate(formattedValues);
    const { data } = await apiConnector(
      "POST",
      "/api/forgotPassword",
      formattedValues
    );
    setLoading(false);
    if (data.success) {
      setIsEmailSend(true);
      setTimeout(() => {
        setOpen(false);
        setIsEmailSend(false);
      }, 3000);
    } else {
      // toast.error(data.message);
      setError(
        "Either the given email is invalid or not registered, Please check your input!"
      );
    }
  };

  useEffect(() => {
    setError("");
  }, [email]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button variant="secondary" className="w-full mt-2">
          Forgot Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        {isEmailSend ? (
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <CheckAnimation />
            <DialogHeader className="my-5">
              <DialogTitle>Reset link has been sent to your email</DialogTitle>
            </DialogHeader>
          </div>
        ) : (
          <>
            <DialogHeader className="my-5">
              <DialogTitle>Forgot Password</DialogTitle>
              <DialogDescription>
                Enter your email here to receive a reset link.
              </DialogDescription>
            </DialogHeader>
            <Input
              ref={ref}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <p className="text-red-500">{error}</p>
            <Button disabled={loading} onClick={onSubmit}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>Reset Password</>
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
