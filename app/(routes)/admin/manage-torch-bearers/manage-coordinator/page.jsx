"use client";

import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { CreateCoordinatorButton } from "./_components/buttonBar";
import { apiConnector } from "@/helpers/apiConnector";

export const CoordinatorManagement = () => {
  const [loading, setLoading] = useState(false);

  const [coordinatorData, setCoordinatorData] = useState([]);

  const fetchCoordinatorData = async () => {
    setLoading(true);

    try {
      // const toastId = toast.loading("Loading ....");
      const { data } = await apiConnector(
        "POST",
        "/api/admin/coordinator/getAllCoordinator"
      );
      setLoading(false);
      // toast.dismiss(toastId);
      if (data.success) {
        toast.success("Data Fetched Successfully!");
        setCoordinatorData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoordinatorData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-2 text-center">
      <CreateCoordinatorButton
        className="flex items-center"
        setCoordinatorData={setCoordinatorData}
      />
      <h1 className="text-3xl text-white font-bold mt-8">
        List of All Coordinators
      </h1>
      <div className="w-full">
        <DataTable
          columns={columns(setCoordinatorData)}
          data={coordinatorData}
        />
      </div>
    </div>
  );
};

export default CoordinatorManagement;
