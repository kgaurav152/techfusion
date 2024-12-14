"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Page = () => {
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
  return (
    <div className="text-center mb-4 text-border w-11/12 mx-auto flex-col">
      <h1
        className="font-bold text-[2.5rem] md:text-[3.5rem] text-border-white"
        style={{ ...neonTextStyle }}
      >
        TechFusion&apos;25 Registration
      </h1>
      <Card className="mx-auto w-full max-w-xl mt-2 mb-2 text-left">
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
                <p className="text-sm font-medium leading-none">Mohit Kumar</p>
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
                <p className="text-sm font-medium leading-none">Kumar Gaurav</p>
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
      <Card className="mx-auto max-w-xl mb-8 text-left">
        <CardContent>
          <div className="flex items-center justify-center text-center pt-4 mb-8 mt-8">
            <p className="font-bold text-xl font-mono text-red-600">
              Oops! Event Participation is closed now!
            </p>
          </div>
          <div className="flex flex-col items-center pt-4">
            <p className="font-semibold font-mono mb-10">
              Having Issue with Participation contact Event coordinator
            </p>
            {/* <Button className='justify-center mb-10' variant="" onClick={()=>{router.push('/torchbearers/campusambassador')}}>Find Your Campus Ambassador</Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
