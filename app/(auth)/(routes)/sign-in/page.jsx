"use client"

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

const SignInPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState();
    const router=useRouter();
    const [open, setOpen] = useState(true);
    // const dispatch = useDispatch();

 
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      var obj = {username:formData.username,password:formData.password}
     new Network().hit("account" , "login" , obj , (responseData)=>{
      // Redirect the user to the dashboard page
      if (responseData.api_key){
          router.push('/dashboard');


      }
      setIsLoading(false);
    });
      
      
    };
    const handleClick = (e,path) => {
      e.preventDefault()
      router.push(path)
    };

    return(
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
                    <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    disabled={isLoading}
                    />
                </div>
                <Button disabled={isLoading}>
                    Sign In
                </Button>
                
                {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
                // alert(errorMessage.success)
                )}
            </div>
            </form>
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
            <Button variant="outline" type="button" disabled={isLoading} onClick={(e) => handleClick(e, "/forgot-password")}>
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
    )
}


export default SignInPage;