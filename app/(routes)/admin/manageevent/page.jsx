"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "@/app/(routes)/admin/manageevent/_components/columns";
import { DataTable } from "@/app/(routes)/admin/manageevent/_components/data-table";
import { CreateEventButton } from "@/app/(routes)/admin/manageevent/_components/buttonBar";
import { apiConnector } from "@/helpers/apiConnector";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const EventManagement = () => {
  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState([]);

  const fetchEventData = async () => {
    const toastId = toast.loading("Loading ...");
    setLoading(true);
    try {
      const { data } = await apiConnector("POST", "/api/event/getAllEvent");
      setLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setEventData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const meantFor = "College";

  return (
    <div className="flex flex-col w-11/12 mx-auto items-center mt-2 mb-8 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Link href="/admin/manageevent/manage-school-event">
          <Button className="flex-row justify-center gap-2">
            Manage School Event
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <CreateEventButton
          className="flex items-center"
          setEventData={setEventData}
          meantFor={meantFor}
        />
      </div>
      <h1 className="text-3xl text-white font-bold mt-8">List of All Events</h1>
      <div className="w-full">
        <DataTable
          columns={columns(fetchEventData, meantFor)}
          data={eventData}
        />
      </div>
    </div>
  );
};

export default EventManagement;
