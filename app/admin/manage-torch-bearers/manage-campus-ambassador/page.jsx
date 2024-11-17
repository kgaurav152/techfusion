"use client";

import React, { useEffect, useState } from "react";
// import axios from "axios";
import {toast} from 'sonner'
import { columns } from "@/app/admin/manage-torch-bearers/manage-campus-ambassador/_components/columns";
import { DataTable } from "@/app/admin/manage-torch-bearers/manage-campus-ambassador/_components/data-table";
import { CreateCampusAmbassadorButton } from "@/app/admin/manage-torch-bearers/manage-campus-ambassador/_components/buttonBar";
import { apiConnector } from "@/helpers/apiConnector";

export const CampusAmbassadorManagement = () => {
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);

  const [campusAmbassadorData, setCampusAmbassadorData] = useState([]);

  const fetchCampusAmbassadorData = async () => {
    setLoading(true);

    try {
      const toastId = toast.loading("Loading ....");
      const { data } = await apiConnector(
        "POST",
        "/api/campusAmbassador/getAllCampusAmbassador"
      );
      setLoading(false);
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setCampusAmbassadorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCampusAmbassadorData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-2 text-center">
      <CreateCampusAmbassadorButton
        className="flex items-center"
        setCampusAmbassadorData={setCampusAmbassadorData}
      />
      <h1 className="text-3xl text-white font-bold mt-8">
        List of All Campus Ambassadors
      </h1>
      <div className="container mt-4 mb-20 w-4/5">
        <DataTable
          columns={columns(setCampusAmbassadorData)}
          data={campusAmbassadorData}
        />
      </div>
    </div>
  );
};

export default CampusAmbassadorManagement;
