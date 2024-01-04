'use client'

import Image from "next/image";
import Link from "next/link";
import {useSelector } from "react-redux";

const EventCard = ({event}) => {
    
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col z-10">
      <div className="max-w-[22rem] rounded overflow-hidden shadow-lg bg-gray-800 m-4 flex flex-col flex-1">
        <Image
          className="w-full aspect-auto object-cover"
          src={event.posterUrl}
          alt={event.name}
          loading="lazy"
          width={500}
          height={500}
        />
        <div className="px-6 py-4">
          <div className="text-white font-bold text-xl mb-2">
            {event.name} 
            <br/>
            <p className="text-base">Event Id: {event.eventId}</p>
          </div>
          <p className="text-gray-300 text-base line-clamp-5">
            {event.description}
          </p>
        </div>
        <br />
        <div className="flex flex-row gap-6 mb-3 justify-center">
          <Link
            className="rounded-md px-2 md:px-5 py-1 md:py-3 bg-blue-400 text-black"
            href={`/events/detail/${event._id}`}
          >
            Read more
          </Link>
          <Link
            className="rounded-md px-2 md:px-5 py-1 md:py-3 bg-blue-500 text-black"
            href={user ? "/eventregistration" : "/registration"}
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
