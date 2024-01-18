import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
  import { buttonVariants } from "@/components/ui/button"
  
  import { FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
  import { IoMdMail } from "react-icons/io";
import Link from "next/link";
  
  function DeveloperCard({ data }) {
    return (
      <Card className="mx-auto max-w-lg rounded-lg shadow-md overflow-hidden">
        <div className="p-6 text-center">
          <CardTitle className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{data.label}</CardTitle>
          <div className="flex justify-center items-center mb-2">
            <Avatar className="w-32 h-32">
                <AvatarImage src={data.pictureUrl} 
              alt={data.name} 
              className="rounded-full object-cover mb-2"/>
                <AvatarFallback>{data.name}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold mb-1 mx-4 px-4">{data.name}</p>
            <p className="text-lg font-semibold mb-4"><span className="mr-4">{data.branch}</span><span>{data.batch}</span></p>
            <div className="flex justify-center items-center mb-8">
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
          <div className="flex justify-center items-center mb-6">
            <a href={`mailto:${data.email}`} className="hover:underline mr-4">
              <IoMdMail className="text-3xl hover:text-purple-600" />
            </a>
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
          <div className="mb-5">
            <div className="flex justify-center items-center mb-4">
              <Link className={buttonVariants({ variant: "outline" })} href={data.knowMoreUrl} target="_blank">Know More</Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  export default DeveloperCard;
  