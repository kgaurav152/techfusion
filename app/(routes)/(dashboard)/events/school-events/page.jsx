"use client";

import React from "react";

import EventCard from "@/components/eventCard";
import { useSelector } from "react-redux";
import Loader from "@/components/custom/loader";

export const EventList = () => {
  const { schoolEvent } = useSelector((state) => state.schoolEvent);
  const renderFor = "school";

  return (
    <div className="px-6 py-10 mx-auto min-h-screen w-11/12 ">
      <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
        School Events
      </h1>

      <div className="flex justify-center mx-auto mt-2">
        <span className="inline-block w-44 h-1 bg-blue-500 rounded-full"></span>
        <span className="inline-block w-8 h-1 mx-1 bg-blue-500 rounded-full"></span>
        <span className="inline-block w-3 h-1 bg-blue-500 rounded-full"></span>
      </div>
      <br />
      <div className="flex flex-wrap justify-center mt-6">
        {schoolEvent ? schoolEvent?.map((e) => {
          return <EventCard key={e._id} event={e} renderFor={renderFor} />;
        }) : <Loader/>}
      </div>
    </div>
  );
};

export default EventList;
