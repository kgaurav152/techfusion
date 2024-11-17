"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PageMenubar({ buttons }) {
  return (
    <nav className="w-full p-4">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {buttons?.map((button, index) => (
          <Link
            key={index}
            href={button.redirectUrl}
            className="md:w-auto"
          >
            <Button
              className="w-full md:w-auto text-gray-800"
              variant="outline"
            >
              {button.buttonTitle}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
