"use client";

import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import RiveAnimationComponent from "@/components/riveAnimation";
import EventCarousel from "@/components/eventCarousel";
import About from "@/components/about";
import CertDownloader from "@/components/certificateDownload";
import { eventCoordinators } from "@/public/coordinators";
import DeveloperCard from "../(dashboard)/torchbearers/developer/devCard";
import Sponsors from "./_component/sponsor";
import HeroSection from "./_component/hero-section";

const LandingPage = () => {
  // const dispatch = useDispatch();

  const [live, setLive] = useState(false);
  const developer = eventCoordinators.find(
    (coordinator) => coordinator.eventId === "WD"
  );
  // const [clampAbout, setClampAbout] = useState(true);

  return (
    <div className="text-white text-center min-h-[100vh] bg-[#00040F] relative">
      <HeroSection live={live} />
      {/*Star Wars Animation*/}
      <RiveAnimationComponent live={live} />

      {/* Events Section */}
      <section className="mb-10">
        <div>
          {/* {live ? (
            <EventCarousel />
          ) : (
            <>
              <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Events</h2>
              <div className="flex justify-center">
                <Image
                  src="/comingSoon.svg"
                  width={900}
                  height={200}
                  alt="TechFusion'25 Coming Soon"
                />
              </div>
            </>
          )} */}
          <EventCarousel />
        </div>
      </section>

      <About />
      {/* Sponsors Section */}
      <Sponsors />
      {/* <div className="flex flex-row flex-wrap my-5 max-w-[800px]">
        { developer.coordinators.map((dev)=>(

          <DeveloperCard key={dev.batch} data = {dev} /> 
        ))
        }
      </div> */}
    </div>
  );
};

export default LandingPage;
