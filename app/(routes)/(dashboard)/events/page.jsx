"use client";

import React from "react";

import EventCard from "@/components/eventCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShinyButton from "@/components/custom/shiny-button";

import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

export const EventList = () => {
  const { event } = useSelector((state) => state.event);
  const renderFor = "college";
  // const [eventList, setEventList] = useState(event);

  // console.log("Redux",event)
  // const fetchEventList = async () => {
  //     try{
  //         const toastId = toast.loading("Loading ....")
  //         const { data } = await apiConnector("POST", "/api/event/getAllEvent");
  //         toast.dismiss(toastId);
  //         if (data.success) {
  //         setEventList(data.data);
  //         } else {
  //         toast.error(data.message);
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  // useEffect(() => {
  // // fetchEventList();
  // }, []);

  return (
    <div className="px-6 py-10 mx-auto w-11/12 ">
      <Link href="/events/school-events" className="mb-8 flex justify-center">
        <ShinyButton className="flex-row justify-center gap-2" dark>
          View School Events
          <ArrowRight className="h-4 w-4" />
        </ShinyButton>
      </Link>
      <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
        Events
      </h1>

      <div className="flex justify-center mx-auto mt-2">
        <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
        <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
        <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
      </div>
      <br />
      <div className="flex flex-wrap justify-center mt-6">
        {event?.map((e) => {
          return <EventCard key={e._id} event={e} renderFor={renderFor} />;
        })}
      </div>
    </div>
  );
};

export default EventList;
