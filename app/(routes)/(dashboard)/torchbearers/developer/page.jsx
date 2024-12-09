"use client";

import React, { useEffect, useState } from "react";
import { eventCoordinators } from "@/public/coordinators";
import DeveloperCard from "./devCard";

export const DeveloperPage = () => {
  // const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([]);

  const mapDevDetails = () => {
    if (eventCoordinators) {
      const selectedDev = eventCoordinators.find((dev) => dev.eventId === "WD");
      // console.log(selectedDev);
      if (selectedDev) {
        setDevelopers(selectedDev.coordinators);
        // console.log(developers)
      } else {
        setDevelopers([]);
      }
    }
  };

  useEffect(() => {
    mapDevDetails();
  }, []);

  return (
    <div className="mt-2 mb-8 min-h-screen w-11/12 mx-auto text-center">
      <div
        className="flex flex-wrap gap-5 items-center justify-center"
        id="developers"
      >
        {developers.length > 0 && (
          <div className="developers">
            <h4 className="text-2xl font-bold mb-10 mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              TechFusion&apos;24 Website Developers:
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {developers.length > 0 &&
                developers.map((developer, index) => (
                  <DeveloperCard key={index} data={developer} />
                ))}
            </div>
          </div>
        )}
        ;
      </div>
    </div>
  );
};

export default DeveloperPage;
