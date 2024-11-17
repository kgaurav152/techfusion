import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { DeleteButton } from "./delete-button";
import { useSelector } from "react-redux";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { AlertCircle, CircleDot, Dot, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const ParticipationCard = ({ data }) => {
  const { user } = useSelector((state) => state.profile);

  return (
    <Card className="p-5">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 p-0">
        <img
          loading="lazy"
          src={data?.event?.posterUrl}
          alt={data?.event?.name}
          className="aspect-auto"
        />
        <div className="md:px-3 relative col-span-2 w-full">
          <CardTitle className="text-xl lg:text-2xl flex justify-between">
            <p>
              {data?.event?.eventId} - {data?.event?.name}
            </p>
            <div className="absolute -right-5 -top-1 md:-top-5">
              {data?.participants[0]?._id === user?._id ? (
                <DeleteButton />
              ) : (
                <AskTeamLeader />
              )}
            </div>
          </CardTitle>
          <CardDescription>
            {data?.event?.eventType} - {data?.event?.participationMode}
          </CardDescription>
          <div className="mt-4 bg-amber-100 rounded-lg p-3">
            <p className="text-xl font-semibold text-center">
              {data?.event?.participationMode === "Group" && "Team Member"}
            </p>
            <ul>
              {data?.participants.map((member, i) => (
                <li key={member._id} className="flex gap-2 items-center">
                  <Dot className="w-5 h-5" />
                  {member.name}
                  <span className="text-amber-700 font-semibold text-xs">
                    {" "}
                    {i == 0 &&
                      data?.event?.participationMode === "Group" &&
                      "Team Leader"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipationCard;

const AskTeamLeader = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost">
          <ShieldAlert className="text-amber-500 w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-sm bg-amber-50 px-2 py-2 rounded-lg">
        Ask Team Leader to Delete.
      </PopoverContent>
    </Popover>
  );
};
