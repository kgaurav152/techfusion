"use client";

import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { CreateHospitalityUserButton } from "./_components/buttonBar";
import { apiConnector } from "@/helpers/apiConnector";

export const HospitalityUserManagement = () => {
  const [loading, setLoading] = useState(false);

  const [hospitalityUserData, setHospitalityUserData] = useState([]);

  const fetchHospitalityUserData = async () => {
    setLoading(true);

    try {
      // const toastId = toast.loading("Loading ....");
      const { data } = await apiConnector(
        "POST",
        "/api/admin/hospitality/getAllHospitalityUser"
      );
      setLoading(false);
      // toast.dismiss(toastId);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setHospitalityUserData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHospitalityUserData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-2 text-center">
      <CreateHospitalityUserButton
        className="flex items-center"
        setHospitalityUserData={setHospitalityUserData}
      />
      <h1 className="text-3xl text-white font-bold mt-8">
        List of All Hospitality Users
      </h1>
      <div className="w-full">
        <DataTable
          columns={columns(setHospitalityUserData)}
          data={hospitalityUserData}
        />
      </div>
    </div>
  );
};

export default HospitalityUserManagement;
