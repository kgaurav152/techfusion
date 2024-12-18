"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import InteractiveHoverButton from "./custom/interactive-hover-button";
import { Button } from "./ui/button";
import ShinyButton from "./custom/shiny-button";
import { Separator } from "./ui/separator";

const EventCard = ({ event, renderFor }) => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col z-10">
      <div className="max-w-[22rem] w-full relative  rounded overflow-hidden shadow-lg bg-gray-800 flex flex-col flex-1">
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
            <div>
              <p className="text-xl">{event.name}</p>
              <div className="flex mb-4 mt-1">
                <span className="inline-block w-20 h-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
              </div>
            </div>
            <p className="text-base">
              Event Id : <span className="text-sm"> {event.eventId} </span>
            </p>
            <p className="text-base">
              Event Type : <span className="text-sm"> {event.eventType} </span>
            </p>
            <div className="flex flex-row md:gap-2">
              <p className="text-base mb-1">Participant Allowed :</p>
              <div className="grid grid-cols-3 flex-1 gap-1 px-2">
                <p className="text-sm">min</p>
                <p className="text-sm">:</p>
                <p className="text-sm"> {event?.min}</p>
                {/* <p className="text-xs mb-1">|</p> */}
                <p className="text-sm">max</p>
                <p className="text-sm">: </p>
                <p className="text-sm">{event?.max}</p>
              </div>
            </div>
          </div>
          <Separator className="bg-muted-foreground my-3" />
          <p className="text-gray-300 text-base line-clamp-5">
            {event.description}
          </p>
        </div>
        <div className="h-20">
          <div className="grid absolute bottom-4 left-2 right-2 w-full grid-cols-2 sm:grid-cols-2 gap-1.5">
            {/* <ShinyButton> */}

            <Link
              className="w-full"
              href={
                renderFor == "college"
                  ? `/events/detail/${event._id}`
                  : `/events/school-events/detail/${event._id}`
              }
            >
              <Button className="w-full bg-gradient-to-br text-black from-purple-500 to-cyan-500 hover:from-cyan-500 hover:to-purple-500 duration-300">
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
