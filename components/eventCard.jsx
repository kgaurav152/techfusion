import Image from "next/image";
import Link from "next/link";

const EventCard = ({event}) => {
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
        {/* // Uncomment below when event descriptions and registration exist */}
        <br />
        <div className="px-6 pb-4 mt-auto mb-3">
          <Link
            className="rounded-md px-5 py-3 bg-blue-400 text-black mr-3"
            href={`/events/detail/${event._id}`}
          >
            Read more
          </Link>
          <Link
            className="rounded-md px-5 py-3 bg-blue-500 text-black"
            href="/eventregerestration"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
