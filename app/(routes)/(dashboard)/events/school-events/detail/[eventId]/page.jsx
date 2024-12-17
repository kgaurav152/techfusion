"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const EventDetailPage = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const eventId = parts[parts.length - 1];
  const [eventDetail, setEventDetail] = useState(null);

  const { schoolEvent } = useSelector((state) => state.schoolEvent);

  const filterByEventId = (eventId) => {
    if (schoolEvent.length > 0) {
      setEventDetail(schoolEvent.find((e) => e._id === eventId));
    }
  };

  useEffect(() => {
    filterByEventId(eventId);
  }, [schoolEvent, eventId]);

  return (
    <section>
      {eventDetail && (
        <article className="max-w-4xl py-20 w-11/12 mx-auto space-y-12 min-h-[60vh] text-white">
          <div className="w-full mx-auto space-y-4 text-center">
            <h1 className="font-bold leading-tight text-5xl md:text-7xl text-white">
              {eventDetail.name}
            </h1>
          </div>

          <Image
            className="w-full rounded-md aspect-auto"
            src={eventDetail.posterUrl}
            alt={eventDetail.name}
            width={500}
            height={500}
          />
          <div className="w-full mx-auto space-y-4">
            <h2 className="font-bold leading-tight text-2xl md:text-4xl">
              Event Id: {eventDetail.eventId}
            </h2>
            <h2 className="font-bold leading-tight text-2xl md:text-4xl">
              Event Type: {eventDetail.eventType}
            </h2>
            <div className="flex flex-row gap-2 font-bold leading-tight text-2xl md:text-4xl">
              <h2 className="text-xl mb-1">Participant Allowed:</h2>
              <div className="flex flex-row justify-center items-center gap-2">
                <p className="text-base mb-1">min: {eventDetail?.min}</p>
                <p className="text-sm mb-1">|</p>
                <p className="text-base mb-1">max: {eventDetail?.max}</p>
              </div>
            </div>
          </div>
          <div className="dark:text-gray-100 prose lg:prose-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {eventDetail.description}
            </ReactMarkdown>
          </div>
          <div className="pb-12 border-b dark:border-gray-700">
            <div className="flex flex-row gap-6 justify-center pt-4 space-x-4 align-center">
              <Link
                className="rounded-md p-3 bg-blue-400 text-black text-xl relative z-10"
                href={eventDetail.ruleBook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rulebook
              </Link>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default EventDetailPage;
