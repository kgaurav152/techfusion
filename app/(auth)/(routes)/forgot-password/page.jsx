"use client"

import * as React from "react";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

const ForgotPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router=useRouter();

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        // Make a POST request to your forgot password endpoint with the provided username
        const response = await axios.get(`${process.env.BASE_URL}/account/forgot`, {
          body: formData,
        });
  
        // Check if the reset email was successfully sent (This may need to adjust based on API response)
        if (response.status === 201) {
          // Display a success message
          setSuccessMessage('Reset email sent successfully.');
  
          // Clear the form data
          setFormData({ username: '' });
        } else {
          // Handle unsuccessful reset email request (e.g., display an error message)
          setErrorMessage(response.data.messages.error);
        }
      } catch (error) {
        // Handle any network or request errors
        console.error('Forgot password error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleClick = (e,path) => {
      e.preventDefault()
      router.replace(path)
    };    

    return(
    <div className="p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Reset your Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                  <div className="grid gap-1">
                      <Input
                      id="username"
                      placeholder="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      />
                  </div>
                  <Button disabled={isLoading}>
                      Send Reset Email
                  </Button>
              </div>
              </form>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                      Landed here by mistake ?
                  </span>
                  </div>
              </div>
                <Button variant="outline" type="button" disabled={isLoading} onClick={(e) => handleClick(e, "/sign-in")}>
                  <ChevronLeft className="h-4 w-4" />Back to Login
                </Button>
            </div>
          </div>
    </div>
    )
}

export default ForgotPasswordPage;