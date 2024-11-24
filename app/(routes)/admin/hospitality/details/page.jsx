"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiConnector } from "@/helpers/apiConnector";
import { IdCardRelatedDetails } from "./id-card-details";
import { AccomodationRelatedDetails } from "./accomodation-details";
import { TshirtRelatedDetails } from "./tshirt-details";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HospitalityDetails() {
  const [allParticipantsData, setAllParticipantsData] = useState([]);
  const [allStatsData, setAllStatsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllParticipants = async () => {
    setLoading(true);
    try {
      const { data } = await apiConnector("POST", "/api/getAllParticipants");
      setLoading(false);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setAllParticipantsData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await apiConnector("POST", "/api/getAllStats");
      setLoading(false);
      if (data.success) {
        setAllStatsData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = () => {
    fetchAllParticipants();
    fetchStats();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center mt-4 mb-8 p-2">
      <Tabs defaultValue="idCardDetails" className="max-w-[95%]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="idCardDetails">Id Card Details</TabsTrigger>
          <TabsTrigger value="accomodationDetails">
            Accomodation Details
          </TabsTrigger>
          <TabsTrigger value="tShirtDetails">Sweat Shirt Details</TabsTrigger>
        </TabsList>
        <TabsContent value="idCardDetails">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Id Card Related Details</CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent>
                <IdCardRelatedDetails
                  allParticipantsData={allParticipantsData}
                  allStatsData={allStatsData}
                  setAllParticipantsData={setAllParticipantsData}
                  // fetchAllParticipants={fetchAllParticipants}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="accomodationDetails">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Accomodation Related Details</CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent>
                <AccomodationRelatedDetails
                  allParticipantsData={allParticipantsData}
                  allStatsData={allStatsData}
                  setAllParticipantsData={setAllParticipantsData}
                  fetchData={fetchData}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tShirtDetails">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Sweat Shirt Related Details</CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent>
                <TshirtRelatedDetails
                  allParticipantsData={allParticipantsData}
                  allStatsData={allStatsData}
                  setAllParticipantsData={setAllParticipantsData}
                  // fetchAllParticipants={fetchAllParticipants}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
