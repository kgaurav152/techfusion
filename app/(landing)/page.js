"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/slices/profileSlice";

const LandingPage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  // const handleHover = () => {
  //   setIsHovered(true);
  // };

  // const handleLeave = () => {
  //   setIsHovered(false);
  // };

  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data } = await axios.get("/api/userDetails");
      console.log(data);
      dispatch(setUserDetails(data?.data));
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="text-white text-center min-h-[100vh] bg-[#00040F] relative">
      {/* Provided Decorative Elements */}
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
            <h1 className="font-extrabold text-5xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              TechFest&apos;24
            </h1>
            <p className="text-xl md:text-4xl mb-5 mt-4 underline">
              22-26 January 2024
            </p>
            {user ? (
              <Button
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
                onClick={(e) => handleClick(e, "/eventregistration")}
              >
                <div className="flex items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-500 border-white border-2 ${
                      isHovered ? "bg-purple-500" : "bg-white"
                    }`}
                  ></div>
                  <span className="ml-3">Event Registration</span>
                </div>
              </Button>
            ) : (
              <Button
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center"
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
        </div>
      </div>
      {/* Events Section */}
      <section style={{ marginBottom: "40px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Events</h2>
          {/* Brief Info of Events */}
          <div>
            {/* Event Cards/Posters */}
            {/* Example: */}
            {/* <EventCard title="Event 1" poster="poster1.jpg" /> */}
            {/* <EventCard title="Event 2" poster="poster2.jpg" /> */}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section style={{ marginBottom: "40px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Sponsors</h2>
          {/* Sponsor Details */}
          <div>
            {/* Sponsor Logos */}
            {/* Example: */}
            {/* <SponsorLogo src="sponsor1.png" /> */}
            {/* <SponsorLogo src="sponsor2.png" /> */}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section style={{ marginBottom: "40px" }}>
        <div id="aboutus">
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>About Us</h2>
          {/* Brief Info */}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
