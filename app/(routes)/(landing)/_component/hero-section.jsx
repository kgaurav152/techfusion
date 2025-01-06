import CertDownloader from "@/components/certificateDownload";
import { Button } from "@/components/ui/button";
import { Vortex } from "@/components/ui/vortex";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import InteractiveHoverButton from "@/components/custom/interactive-hover-button";
import { TypewriterEffectSmooth } from "@/components/custom/typewriter-effect";

const HeroSection = ({ live }) => {
  const router = useRouter();

  const { user } = useSelector((state) => state.profile);
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  const regDeadlineWords = [
    {
      text: "Registration Deadline Extended till : ",
      className: "text-white dark:text-white",
    },
    // {
    //   text: "Deadline ",
    //   className: "text-white dark:text-white",
    // },
    // {
    //   text: "Extended ",
    //   className: "text-white dark:text-white",
    // },
    // {
    //   text: "till : ",
    //   className: "text-white dark:text-white",
    // },
    // {
    //   text: ": ",
    //   className: "text-white dark:text-white",
    // },
    {
      text: " 08 Jan, 11:59 PM",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="relative text-center h-screen flex items-center justify-center overflow-hidden">
      {/* <div className="z-0"> */}
      {/* <Image
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
        /> */}

      <Vortex
        particleCount={400}
        baseSpeed={0}
        rangeY={1000}
        // baseHue={120}
      >
        <div className="py-20 flex h-full items-center justify-center flex-col lg:py-10">
          <h1 className="font-extrabold text-5xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            TechFusion&apos;25
          </h1>
          <div className="flex flex-col items-center">
            <p className="text-xl md:text-4xl mb-5 mt-4 underline">
              10-13 January 2025
            </p>
            {live ? (
              <div>
                {user ? (
                  <Button
                    className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                    onClick={(e) => handleClick(e, "/eventregistration")}
                  >
                    <div className="flex items-center">
                      <span className="ml-3">Event Registration</span>
                    </div>
                  </Button>
                ) : (
                  // <div className="flex flex-row gap-4 z-20">
                  //   <Button
                  //     className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                  //     onMouseEnter={() => {
                  //       setIsHovered(true);
                  //     }}
                  //     onMouseLeave={() => {
                  //       setIsHovered(false);
                  //     }}
                  //     onClick={(e) => handleClick(e, "/resultview")}
                  //   >
                  //     <div className="flex items-center">
                  //       <span className="ml-3">View Result</span>
                  //     </div>
                  //   </Button>
                  //   <CertDownloader user={user} />
                  // </div>
                  <React.Fragment>
                    <div className="flex flex-col justify-center items-center my-20">
                      <TypewriterEffectSmooth words={regDeadlineWords} />
                    </div>
                    <div className="flex flex-col justify-center items-center md:flex-row gap-8 md:gap-8 mt-20">
                      <Button
                        className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                        onMouseEnter={() => {
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                        }}
                        onClick={(e) => handleClick(e, "/registration")}
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
                          <span className="ml-3">Register Now</span>
                        </div>
                      </Button>
                      <Link
                        // className="rounded-md px-2 md:px-5 py-1 md:py-3 bg-blue-500 text-black"
                        href={"/sign-in"}
                      >
                        <InteractiveHoverButton
                          text="Sign In"
                          className="text-black"
                        />
                      </Link>
                      {/* <Button
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
                      </Button> */}
                    </div>
                  </React.Fragment>
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                <Image
                  src="/registrationStartsFrom_19_dec.svg"
                  width={850}
                  height={200}
                  alt="TechFusion'25 Registration from 19th dec"
                />
              </div>
            )}
          </div>
        </div>
      </Vortex>

      {/* </div> */}
    </div>
  );
};

export default HeroSection;
