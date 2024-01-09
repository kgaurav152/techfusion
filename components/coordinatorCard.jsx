import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from "react-icons/io";

function CoordinatorCard({ index , data, eventLabel }) {
  return (
    <Card className="mx-auto max-w-xl text-left">
      <CardHeader>
        <CardTitle className="text-xl">{eventLabel}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 lg:gap-2">
        <div className="flex items-center justify-center">
          <img
            src={data.pictureUrl}
            alt={data.name}
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium mb-2">{data.name}</p>
          {data.mobile ? (
            <p className="flex flex-row items-center text-sm">
              
              <FaPhoneAlt className="hover:text-teal-500 mr-2"/>
              <a href={`tel:${data.mobile}`} className="text-blue-800 hover:underline">
                {data.mobile}
              </a>
            </p>
          ) : 
          <p className="flex flex-row items-center text-sm">
            
            <FaPhoneAlt className="hover:text-teal-500 mr-2"/>
            <span>not available</span>
          </p>}
          <div className="flex items-center mt-4">
            <a href={`mailto:${data.email}`} className="text-blue-800 hover:underline">
              <IoMdMail className="hover:text-sky-300"/>
            </a>
            <a
              href={data.instaId}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-blue-800 hover:underline"
            >              
              <FaInstagram className="hover:text-red-500"/>
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-blue-800 hover:underline"
            >
              <FaLinkedin className="hover:text-sky-300"/>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CoordinatorCard;
