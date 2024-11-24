"use client";
import { apiConnector } from "@/helpers/apiConnector";
import React, { useEffect, useState } from "react";
import ParticipationCard from "./participation-card";
import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const neonTextStyle = {
  marginTop: "5vh",
  marginBottom: "5vh",
  fontFamily: "Helvetica Neue, sans-serif",
  // backgroundColor: '#010a01',
  // textTransform: 'uppercase',
  textAlign: "center",
  fontWeight: 100,
  textShadow:
    "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa",
  animation: "flicker 1.5s infinite alternate",
  color: "#fff",
};

const ParticipationPage = () => {
  const [loading, setLoading] = useState(false);
  const [participatingEventsData, setParticipatingEventsData] = useState([]);

  const fetchParticipatingEventsData = async () => {
    setLoading(true);
    try {
      const { data } = await apiConnector("POST", "/api/myEventDetails");
      if (data.success) {
        setParticipatingEventsData([
          ...data.data?.technical,
          ...data.data?.cultural,
        ]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipatingEventsData();
  }, []);

  return (
    <div className="min-h-screen w-11/12 mb-5 mx-auto max-w-2xl">
      <h1
        className="font-bold text-[2rem] md:text-[3rem] text-border-white"
        style={{ ...neonTextStyle }}
      >
        My Enrolled Events
      </h1>
      <div className="space-y-3">
        {loading ? (
          <Loader />
        ) : participatingEventsData.length > 0 ? (
          participatingEventsData.map((data) => (
            <ParticipationCard key={data?._id} data={data} />
          ))
        ) : (
          <div className="text-white text-2xl text-center">
            <p className="my-5">
              It seems you’re not enrolled in any events yet.
            </p>
            <Link
              href="/eventregistration"
              className="bg-white text-base p-3 rounded-lg text-black"
            >
              Enroll in an Event Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipationPage;
