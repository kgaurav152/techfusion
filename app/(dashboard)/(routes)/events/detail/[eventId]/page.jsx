'use client'

import {useState, useEffect} from "react";
import { usePathname } from 'next/navigation';
import toast from "react-hot-toast";
import {useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import { apiConnector } from '@/helpers/apiConnector';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const EventDetailPage = () => {

  const { user } = useSelector((state) => state.profile);

  const pathname = usePathname();
  const parts = pathname.split('/');
  const eventId = parts[parts.length - 1];
  const [eventList, setEventList] = useState([]);
  const [event, setEvent] = useState(null);

    const fetchEventList = async () => {
        try{
            const toastId = toast.loading("Loading ....")
            const { data } = await apiConnector("GET", "/api/event/getAllEvent");
            toast.dismiss(toastId);
            if (data.success) {
            setEventList(data.data);
            } else {
            toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const filterByEventId = (eventId) => {
    if (eventList.length > 0) {
        setEvent(eventList.find((e) => e._id === eventId));
      }
    };

    useEffect(() => {
        fetchEventList();
      }, []);
    
      useEffect(() => {
        filterByEventId(eventId);
      }, [eventList, eventId]);
      
    console.log(eventId)
    console.log(event)

  return (
    <section>
        
    {event && 
      <article className="max-w-4xl px-6 py-24 mx-auto space-y-12 text-white">
        <div className="w-full mx-auto space-y-4 text-center">
          <h1 className="font-bold leading-tight text-5xl md:text-7xl text-white">
            {event.name}
          </h1>
        </div>

        <Image
          className="w-full rounded-md aspect-auto"
          src={event.posterUrl}
          alt={event.name}
          width={500}
          height={500}
        />
        <div className="w-full mx-auto space-y-4">
          <h2 className="font-bold leading-tight text-2xl md:text-4xl">
            Event Id: {event.eventId}
          </h2>
        </div>
        <div className="dark:text-gray-100 prose lg:prose-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {event.description}
          </ReactMarkdown>
        </div>
        <div className="pb-12 border-b dark:border-gray-700">
          <div className="flex flex-row gap-6 justify-center pt-4 space-x-4 align-center">
            <Link
              className="rounded-md p-3 bg-blue-400 text-black text-xl relative z-10"
              href={event.ruleBook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Rulebook
            </Link>
            <Link
              className="rounded-md p-3 bg-blue-400 text-black text-xl relative z-10"
              href={user ? "/eventregistration" : "/registration"}
            >
              Register now
            </Link>
          </div>
        </div>
      </article>
    }
    </section>
  );
}

export default EventDetailPage;
