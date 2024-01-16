'use client'

import {useState, useEffect} from "react";
import { usePathname } from 'next/navigation';
// import toast from "react-hot-toast";
// import { apiConnector } from '@/helpers/apiConnector';
import {useSelector } from "react-redux";
import {eventCoordinators} from "@/public/coordinators";
import CoordinatorCard from "@/components/coordinatorCard";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const EventDetailPage = () => {

  const { user } = useSelector((state) => state.profile);

  const pathname = usePathname();
  const parts = pathname.split('/');
  const eventId = parts[parts.length - 1];
  // const [eventList, setEventList] = useState([]);
  const [eventDetail, setEventDetail] = useState(null);
  const [eventCoordinator, setEventCoordinator] = useState({});

    const {event} = useSelector((state)=>state.event);

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

    const filterByEventId = (eventId) => {
    if (event.length > 0) {
        setEventDetail(event.find((e) => e._id === eventId));
      }
    };

    const mapCoordinatorsDetails = () => {
      setEventCoordinator({});
      if (eventDetail && eventDetail.eventId) {
          // console.log(value.label.split(' - ')[0])
          const selectedEvent = eventCoordinators.find(
              (event) => event.eventId === eventDetail.eventId
          );
          if (selectedEvent) {
              setEventCoordinator(selectedEvent);
          }
      }
    };

  useEffect(() => {
      mapCoordinatorsDetails();
  }, [eventDetail]);

    // useEffect(() => {
    //     fetchEventList();
    //   }, []);
    
      useEffect(() => {
        filterByEventId(eventId);
      }, [event, eventId]);
      
    // console.log(eventId)
    // console.log(event)

  return (
    <section>
        
    {eventDetail && (
      <article className="max-w-4xl px-6 py-24 mx-auto space-y-12 min-h-[60vh] text-white">
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
            Event Type: {event.eventType}
          </h2>
          <h2 className="font-bold leading-tight text-2xl md:text-4xl">
            Participation Type: {event.participationMode}
          </h2>
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
            <Link
              className="rounded-md p-3 bg-blue-400 text-black text-xl relative z-10"
              href={user ? "/eventregistration" : "/registration"}
            >
              Register now
            </Link>
          </div>
        </div>
        {eventDetail && eventDetail.eventId && eventCoordinator.coordinators && (
          <div className="coordinators mt-10">
            <h4 className="text-2xl text-center font-bold text-white mb-10 mt-4">Event Coordinators:</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {eventCoordinator.coordinators.map((coordinator, index) => (
                <CoordinatorCard key={index} data={coordinator} eventLabel={`${eventDetail.eventId} - ${eventDetail.name}`}/>
              ))}
            </div>
          </div>
        )}
      </article>
    )}
    </section>
  );
}

export default EventDetailPage;
