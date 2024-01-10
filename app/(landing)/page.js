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

const LandingPage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.profile);
  // const dispatch = useDispatch();

  const [live, setLive] = useState(false);
  // const [clampAbout, setClampAbout] = useState(true);

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className="text-white text-center min-h-[100vh] bg-[#00040F] relative">
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
                  <Button
                    className="z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
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
          <div className="flex justify-center">
            <Image
              src="/comingSoon.svg"
              width={900}
              height={200}
              alt="TechFusion'24 Coming Soon"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
