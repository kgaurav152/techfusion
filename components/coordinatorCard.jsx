

import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  
import { Icon } from 'your-icon-library'; // Adjust accordingly

function CoordinatorCard({ data }) {
  return (
    <Card className="mx-auto max-w-xl text-left">
      <CardHeader>
        <CardTitle>{data.event}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="grid gap-4 lg:gap-2 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            src={data.pictureUrl}
            alt={data.name}
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium">{data.name}</p>
          {data.mobile ? (
            <p className="text-sm">
              <a href={`tel:${data.mobile}`} className="text-blue-800 hover:underline">
                {data.mobile}
              </a>
            </p>
          ) : null}
          <div className="flex items-center mt-4">
            <a href={`mailto:${data.mail}`} className="text-blue-800 hover:underline">
              <Icon icon={MailIcon} />
            </a>
            <a
              href={`https://www.instagram.com/${data.instaId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-blue-800 hover:underline"
            >
              <Icon icon={InstagramIcon} />
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-blue-800 hover:underline"
            >
              <Icon icon={LinkedInIcon} />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CoordinatorCard;
