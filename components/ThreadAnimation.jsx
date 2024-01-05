'use client'

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from "react-redux";


import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

const ThreadAnimation = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.profile);
  // const dispatch = useDispatch();
  const lottieRef = useRef(null);
  const [live, setLive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isScrolling;
    let lastScrollTop = 0;

    const handleScrollStart = () => {
      lottieRef.current.play();
    };

    const handleScrollEnd = () => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        lottieRef.current.pause();
      }, 150);
    };

    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const speed = Math.abs(st - lastScrollTop);
      const animationSpeed = (speed / 200) * 6.66;

      const direction = st > lastScrollTop ? 1 : -1;

      lottieRef.current.setPlayerSpeed(animationSpeed);
      lottieRef.current.setPlayerDirection(direction);

      lastScrollTop = st;
    };

    window.addEventListener("scroll", handleScrollStart);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollEnd);

    return () => {
      window.removeEventListener("scroll", handleScrollStart);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, []);

  
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className="relative block w-full h-[700vh]">
      <div className="flex justify-center items-center font-gsd h-screen sticky top-0 left-0 w-full">
        <div className=" absolute inset-0 w-full h-screen overflow-hidden mt-[140px] sm:mt-[90px] md:mt-[108px]">
          <div className="w-calc-100plus300 md:w-full max-w-[initial] h-auto ">
            <Player
              ref={lottieRef}
              src='/assets/StartBuilding_001.json'
              style={{
                position: "absolute",
                top: "50%",
                transform: "translate3d(0,-50%,0)",
              }}
              speed={1}
              loop
            ></Player>
            <img
              src='/assets/StartBuilding_001_BG.png'
              alt="Line background"
              loading="lazy"
              height="500"
              className="absolute top-1/2 left-0 -translate-y-1/2 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col relative items-center justify-center gap-14 z-10 px-6">
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold text-5xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              TechFusion&apos;24
            </h1>
            <p className="text-white text-xl md:text-4xl underline">
              25-28 January 2024
            </p>

            {live ? (
              <div>
                {user ? (
                  <Button
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
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
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-12 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
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
    </div>
  );
};

export default ThreadAnimation;
