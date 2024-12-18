/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BG1fgH33mii
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CountDownTimer({ registrationCloseTime }) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const targetDate = new Date(registrationCloseTime).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [registrationCloseTime]);
  return (
    <div className="flex flex-col gap-3 my-5 items-center justify-center">
      <div className="md:text-2xl font-medium text-rose-500">
        !!! Limited Time Left to Register !!!
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shadow-md">
          <div className="text-3xl sm:text-4xl text-center font-bold">
            {timeRemaining.days}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">
            Days
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-1  rounded-lg shadow-md">
          <div className="text-3xl sm:text-4xl font-bold text-center">
            {timeRemaining.hours}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">
            Hours
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shadow-md">
          <div className="text-3xl sm:text-4xl font-bold text-center">
            {timeRemaining.minutes}
          </div>
          <div className=" text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">
            Minutes
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shadow-md">
          <div className="text-3xl sm:text-4xl font-bold text-center">
            {timeRemaining.seconds}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">
            Seconds
          </div>
        </div>
      </div>
      {/* <div className="flex gap-4">
        <Button variant="outline">Start</Button>
        <Button variant="outline">Pause</Button>
        <Button variant="outline">Reset</Button>
      </div> */}
    </div>
  );
}
