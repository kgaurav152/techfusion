"use client";

import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios";
// import { setUserDetails } from "@/redux/slices/profileSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import RiveAnimationComponent from "@/components/riveAnimation";
import EventCarousel from "@/components/eventCarousel";
// import AboutUs from "@/components/aboutUs";
import About from "@/components/about";
import CertDownloader from "@/components/certificateDownload";
import { eventCoordinators } from "@/public/coordinators";
import DeveloperCard from "../(dashboard)/(routes)/torchbearers/developer/devCard";

const LandingPage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.profile);
  // const dispatch = useDispatch();

  const [live, setLive] = useState(true);
  const developer = eventCoordinators.find((coordinator) => coordinator.eventId === 'WD');
  // const [clampAbout, setClampAbout] = useState(true);

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className="text-white text-center min-h-[100vh] bg-[#00040F] relative">
      {/* {!user && (
        <div className="w-full p-2 text-white text-center bg-blue-950">
          <span className="text-yellow-200">Registration deadline</span>:
          January 22, 2024, by 06:00 PM
        </div>
      )} */}
      <div className="relative text-center mb-8 lg:min-h-[80vh]">
        <div className="z-0">
          <img
            alt="Light ray background"
            fetchpriority="high"
            width="1000"
            height="1000"
            decoding="async"
            data-nimg="1"
            className="pointer-events-none absolute -top-20 left-0 right-0 z-0 mx-auto hidden h-full w-full select-none md:block"
            style={{ color: "transparent" }}
            srcset="/bghero.png 1x, /bghero.png 2x"
            src="/bghero.png"
          />
          <div className="flex flex-col items-center mt-20">
            <h1 className="font-extrabold text-5xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              TechFusion&apos;24
            </h1>
            <p className="text-xl md:text-4xl mb-5 mt-4 underline">
              25-28 January 2024
            </p>
            {live ? (
              <div>
                {user ? (
                  // <Button
                  //   className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                  //   onMouseEnter={() => {
                  //     setIsHovered(true);
                  //   }}
                  //   onMouseLeave={() => {
                  //     setIsHovered(false);
                  //   }}
                  //   onClick={(e) => handleClick(e, "/eventregistration")}
                  // >
                  //   <div className="flex items-center">
                  //     <span className="ml-3">Event Registration</span>
                  //   </div>
                  // </Button>
                  <div className="flex flex-row gap-4 z-20">
                    <Button
                      className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                      onMouseEnter={() => {
                        setIsHovered(true);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                      }}
                      onClick={(e) => handleClick(e, "/resultview")}
                    >
                      <div className="flex items-center">
                        <span className="ml-3">View Result</span>
                      </div>
                    </Button>
                    <CertDownloader user={user} />
                  </div>
                ) : (
                  // <Button
                  //   className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                  //   onMouseEnter={() => {
                  //     setIsHovered(true);
                  //   }}
                  //   onMouseLeave={() => {
                  //     setIsHovered(false);
                  //   }}
                  //   onClick={(e) => handleClick(e, "/registration")}
                  // >
                  //   <div className="flex items-center">
                  //     <div
                  //       className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-500 border-white border-2 ${
                  //         isHovered ? "bg-purple-500" : "bg-white"
                  //       }`}
                  //     >
                  //       <MoveUpRight
                  //         className={`w-4 h-4 ${
                  //           isHovered ? "text-white" : "text-gray-700"
                  //         }`}
                  //       />
                  //     </div>
                  //     <span className="ml-3">Register Now</span>
                  //   </div>
                  // </Button>
                  <Button
                    className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                    onClick={(e) => handleClick(e, "/sign-in")}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-500 border-white border-2 ${
                          isHovered ? "bg-purple-500" : "bg-white"
                        }`}
                      >
                        <MoveUpRight
                          className={`w-4 h-4 ${
                            isHovered ? "text-white" : "text-gray-700"
                          }`}
                        />
                      </div>
                      <span className="ml-3">Sign In</span>
                    </div>
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                <Image
                  src="/registrationStartsFrom.svg"
                  width={850}
                  height={200}
                  alt="TechFusion'24 Registration from 6th jan"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    
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
                  alt="TechFusion'24 Coming Soon"
                />
              </div>
            </>
          )} */}
          <EventCarousel />
        </div>
      </section>
      <section className="mb-5">
        <div id="aboutus">
          <h2 className=" text-5xl mb-10">About Us</h2>
          <About />
        </div>
      </section>
      {/* Sponsors Section */}
      <section className="mb-5">
        <div>
          <h2 className=" text-5xl mb-10">Sponsors</h2>
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Title Sponsor
            </h2>
            <Image
              src="/assets/sponsor/techvein_logo.png"
              width={250}
              height={40}
              alt="TechVein It Solutions Pvt. Ltd. Logo"
            />
          </div>
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Associated With
            </h2>
            <Image
              src="/assets/sponsor/ipg_mall_logo.jpg"
              width={250}
              height={40}
              alt="IPG Mall The Pride of Katihar"
            />
          </div>
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl mt-2 mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Beverage Partner
            </h2>
            <Image
              src="/assets/sponsor/tork_swadesi.jpg"
              width={250}
              height={40}
              alt="Tork Swadesi"
            />
          </div>
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl mt-2 mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Skill Partner
            </h2>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
              <Image
                src="/assets/sponsor/nds.jpg"
                width={250}
                height={40}
                alt="NDS"
              />
              <Image
                src="/assets/sponsor/skilldarpan.png"
                width={250}
                height={40}
                alt="Skill Darpan"
              />
            </div>
          </div>
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Food Partner
            </h2>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-12 sm:items-center">
              <Image
                src="/assets/sponsor/dominos.png"
                width={250}
                height={40}
                alt="Dominos"
              />
              <Image
                src="/assets/sponsor/thegardenkitchen.png"
                width={250}
                height={25}
                alt="The Garden Kitchen"
              />
              <Image
                src="/assets/sponsor/gameoffoods.jpg"
                width={250}
                height={40}
                alt="Game of Foods"
              />
            </div>
          </div>
          {/* <div className="flex justify-center">
            <Image
              src="/comingSoon.svg"
              width={900}
              height={200}
              alt="TechFusion'24 Coming Soon"
            />
            <p></p>
          </div> */}
        </div>
      </section>
      {/* <div className="flex flex-row flex-wrap my-5 max-w-[800px]">
        { developer.coordinators.map((dev)=>(

          <DeveloperCard data = {dev} /> 
        ))
        }
      </div> */}
    </div>
  );
};

export default LandingPage;
