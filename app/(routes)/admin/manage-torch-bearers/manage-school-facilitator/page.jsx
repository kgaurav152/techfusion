"use client";

import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { CreateSchoolFacilitatorButton } from "./_components/buttonBar";
import { apiConnector } from "@/helpers/apiConnector";

export const SchoolFacilitatorManagement = () => {
  const [loading, setLoading] = useState(false);

  const [schoolFacilitatorData, setSchoolFacilitatorData] = useState([]);

  const fetchSchoolFacilitatorData = async () => {
    setLoading(true);

    try {
      // const toastId = toast.loading("Loading ....");
      const { data } = await apiConnector(
        "POST",
        "/api/admin/schoolFacilitator/getAllSchoolFacilitator"
      );
      setLoading(false);
      // toast.dismiss(toastId);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setSchoolFacilitatorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchoolFacilitatorData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-2 text-center">
      <CreateSchoolFacilitatorButton
        className="flex items-center"
        setSchoolFacilitatorData={setSchoolFacilitatorData}
      />
      <h1 className="text-3xl text-white font-bold mt-8">
        List of All School Facilitators
      </h1>
      <div className="w-full">
        <DataTable
          columns={columns(setSchoolFacilitatorData)}
          data={schoolFacilitatorData}
        />
      </div>
    </div>
  );
};

export default SchoolFacilitatorManagement;
