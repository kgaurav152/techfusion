import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function CoordinatorCard({ data, eventLabel }) {
  return (
    <Card className="mx-auto max-w-xl w-full rounded-lg shadow-md overflow-hidden">
      <div className="p-6 text-center">
        <CardTitle className="text-xl font-bold mb-4">{eventLabel}</CardTitle>
        <div className="flex justify-center items-center mb-2">
          {/* <img
            src={data.pictureUrl}
            alt={data.name}
            className="w-32 h-32 rounded-full object-cover mb-2"
          /> */}
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={data.pictureUrl}
              alt={data.name[0]}
              className="rounded-full object-cover mb-2"
            />
            <AvatarFallback>{data.name}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">{data.name}</p>
          <div className="flex justify-center items-center mb-4">
            {data.gender == "Male" ? (
              <a
                href={`tel:${data.mobile}`}
                className="flex items-center text-blue-800 hover:underline"
              >
                <FaPhoneAlt className="mr-2" />
                {data.mobile}
              </a>
            ) : (
              <span className="flex items-center hover:underline">
                <FaPhoneAlt className="mr-2" /> not available
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 mb-5">
          {/* <a href={`mailto:${data.email}`} className="hover:underline mr-4">
            <IoMdMail className="text-3xl hover:text-purple-600" />
          </a> */}
          <a
            href={data.instaId}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline mr-5"
          >
            <FaInstagram className="text-3xl hover:text-red-500" />
          </a>
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <FaLinkedin className="text-3xl hover:text-blue-600" />
          </a>
        </div>
      </div>
    </Card>
  );
}

export default CoordinatorCard;
