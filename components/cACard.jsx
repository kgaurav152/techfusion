import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from "react-icons/io";

function CACard({ data }) {
  return (
    <Card className="mx-auto max-w-xl rounded-lg shadow-md overflow-hidden">
      <div className="p-6 text-center">
        <CardTitle className="mb-5 flex ">
          <div className="flex items-center justify-center">
            <img
              src="/techfusion_logo_black.svg"
              alt="TechFusion'24 Logo"
              width="w-[120vh]"
            />
          </div>
          </CardTitle>
        <div className="flex justify-center items-center mb-2">
          {/* <img
            src={data.pictureUrl}
            alt={data.name}
            className="w-32 h-32 rounded-full object-cover mb-2"
          /> */}
          <Avatar className="w-32 h-32">
              <AvatarImage src={data.pictureUrl} 
            alt={data.name[0]} 
            className="rounded-full object-cover mb-2"/>
              <AvatarFallback>{data.name}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">{data.name}</p>
          <p className="text-lg font-semibold mb-2">CA Id: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{data.caId}</span></p>
          <p className="text-lg font-semibold mb-2">{data.branch}<span className="ml-4">{data.batch}</span></p>
          <p className="text-lg font-semibold mb-3">{data.college}</p>
          <div className="flex justify-center items-center mb-4">
            {data.mobile ? (
              <a href={`tel:${data.mobile}`} className="flex items-center text-blue-800 hover:underline">
                <FaPhoneAlt className="mr-2" />
                {data.mobile}
              </a>
            ) : (
              <span className="flex items-center hover:underline">
              <FaPhoneAlt className="mr-2" /> not available</span>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center mb-5 gap-10">
          <a href={`mailto:${data.email}`} className="hover:underline mr-4">
            <IoMdMail className="text-3xl hover:text-purple-600" />
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

export default CACard;
