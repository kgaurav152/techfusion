'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HomeIcon } from 'lucide-react';

const Notfound = () => {
  
  const router=useRouter();

  const handleClick = (e,path) => {
    e.preventDefault()
    router.push(path)
  };

  return (
    <div className="flex flex-col items-center text-center justify-center">
      <p className="mb-10 mt-40">Not-Found</p>
      <Button className="hover:text-teal-500 animate-bounce mt-4" onClick={(e) => handleClick(e, "/")}>
        Return Home <HomeIcon className="w-6 h-6 ml-2"/>
      </Button>
    </div>
  )
}

export default Notfound