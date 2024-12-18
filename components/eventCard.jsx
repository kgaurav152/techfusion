"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import InteractiveHoverButton from "./custom/interactive-hover-button";
import { Button } from "./ui/button";
import ShinyButton from "./custom/shiny-button";

const EventCard = ({ event, renderFor }) => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col z-10">
      <div className="max-w-[22rem] relative  rounded overflow-hidden shadow-lg bg-gray-800 flex flex-col flex-1">
        <Image
          className="w-full aspect-auto object-cover"
          src={event.posterUrl}
          alt={event.name}
          loading="lazy"
          width={500}
          height={500}
        />
        <div className="px-6 py-4">
          <div className="text-white font-bold mb-3 gap-2">
            <p className="text-xl mb-2">{event.name}</p>
            <p className="text-base">
              Event Id: <span className="text-sm"> {event.eventId} </span>
            </p>
            <p className="text-base">
              Event Type: <span className="text-sm"> {event.eventType} </span>
            </p>
            <div className="flex flex-col md:gap-2 md:flex-row">
              <p className="text-base mb-1">Participant Allowed:</p>
              <div className="flex flex-row items-center gap-1">
                <p className="text-sm mb-1">min: {event?.min}</p>
                <p className="text-xs mb-1">|</p>
                <p className="text-sm mb-1">max: {event?.max}</p>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-base line-clamp-5">
            {event.description}
          </p>
        </div>
        <div className="h-20">
          <div className="grid absolute bottom-5 left-2 right-2 w-full grid-cols-2 sm:grid-cols-2 gap-1.5">
            {/* <ShinyButton> */}

            <Link
              className="w-full"
              href={
                renderFor == "college"
                  ? `/events/detail/${event._id}`
                  : `/events/school-events/detail/${event._id}`
              }
            >
              <Button className=" bg-gradient-to-br text-black from-purple-500 to-cyan-500 hover:from-cyan-500 hover:to-purple-500 duration-300">
                Read more
              </Button>
            </Link>
            {/* </ShinyButton> */}

            {renderFor && renderFor == "college" && (
              <Link
                // className="rounded-md px-2 md:px-5 py-1 md:py-3 bg-blue-500 text-black"
                href={user ? "/eventregistration" : "/registration"}
              >
                <InteractiveHoverButton text="Register now" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
