import React from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountDownTimer from "./custom/countdown-timer";

const SelectedEventCard = ({ selectedForEventDetail }) => {
  const router = useRouter();

  const handleClick = (e, path) => {
    e?.preventDefault();
    router?.push(path);
  };

  return (
    <Card className="mx-auto max-w-xl rounded-lg shadow-md overflow-hidden mb-6">
      <CardHeader className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <img
          src={selectedForEventDetail?.posterUrl}
          alt={selectedForEventDetail?.name}
          className="w-full h-auto"
        />
        <div>
          <CardTitle className="text-2xl font-bold mb-2">
            {selectedForEventDetail?.name}
          </CardTitle>
          <CardDescription className="space-y-5">
            <p className="text-lg">
              Type of Event :{"  "}
              <span className="font-bold text-black ">
                {selectedForEventDetail?.eventType}
              </span>
            </p>
            <div className="border p-3 rounded-lg shadow-lg bg-amber-200">
              <p>
                A minimum of{" "}
                <span className="font-bold text-black">
                  {selectedForEventDetail?.min}
                </span>{" "}
                and a maximum of{" "}
                <span className="font-bold text-black">
                  {" "}
                  {selectedForEventDetail?.max}{" "}
                </span>{" "}
                participants are allowed.
              </p>
            </div>
            {/* <p className="text-lg mb-1">Participant Allowed-</p>
                <p className="text-lg mb-1">
                  min: {selectedForEventDetail?.min},
                </p>
                <p className="text-lg mb-1">
                  max: {selectedForEventDetail?.max}
                </p> */}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {selectedForEventDetail?.eventRegistrationDateTime && (
          <CountDownTimer
            registrationCloseTime={
              selectedForEventDetail?.eventRegistrationDateTime
            }
          />
        )}

        {/* {selectedForEventDetail?.description.substr(0, 150)}... */}
      </CardContent>
      <CardFooter>
        <button
          onClick={(e) =>
            handleClick(e, `/events/detail/${selectedForEventDetail?._id}`)
          }
          className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </button>
      </CardFooter>
    </Card>
  );
};

export default SelectedEventCard;
