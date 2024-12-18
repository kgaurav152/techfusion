import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const QueryCard = () => {
  return (
    <Card className="mx-auto w-full max-w-xl mt-2 mb-2 text-left">
      <CardHeader>
        <CardTitle>For all your queries, feel free to contact:</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="grid gap-4 lg:gap-2 lg:grid-cols-2">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="avatar_02.png" />
              <AvatarFallback>KG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Kumar Gaurav</p>
              <a
                href="https://wa.me/917004174269?text=Hello!%20I%20have%20some%20Query%20related%20to%20Event%20Registration."
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-800"
              >
                +917004174269
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="avatar_02.png" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="gap-1">
              <p className="text-sm font-medium leading-none">Mohit Kumar</p>
              <a
                href="https://wa.me/917257827104?text=Hello!%20I%20have%20some%20Query%20related%20to%20Event%20Registration."
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-800"
              >
                +917257827104
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QueryCard;
