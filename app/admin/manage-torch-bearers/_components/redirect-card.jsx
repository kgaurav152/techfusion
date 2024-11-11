"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function RedirectCard({ cardTitle, redirectUrl, cardInfo }) {
  const router = useRouter();
  const redirectHandler = (redirectUrl) => {
    router.push(redirectUrl);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-y-1.5 items-center gap-2">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <p className="text-sm font-medium leading-none">{cardInfo}</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => redirectHandler(redirectUrl)}
          className="flex-row gap-2"
        >
          {cardTitle}
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
