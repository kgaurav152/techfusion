"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import Link from "next/link";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/slices/profileSlice";
import { apiConnector } from "@/helpers/apiConnector";
Chart.register(...registerables);
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [stats, setStats] = useState();
  // const dispatch = useDispatch();
  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await apiConnector("POST", "/api/getAllStats");
      setStats(data?.data);
    };
    fetchStats();
  }, []);
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const accomodation = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [stats?.accomodation?.yes, stats?.accomodation?.no],
        backgroundColor: generateRandomColors(2),
      },
    ],
  };
  const tshirt = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [stats?.tshirt?.yes, stats?.tshirt?.no],
        backgroundColor: generateRandomColors(2),
      },
    ],
  };
  const colleges = {
    labels: stats?.collegeParticipation.map((col) => col.college),
    datasets: [
      {
        label: "Student By Colleges",
        data: stats?.collegeParticipation.map(
          (college) => college.totalStudent
        ),
        backgroundColor: generateRandomColors(
          stats?.collegeParticipation?.length
        ),
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
  };
  return (
    <div className="text-white w-11/12 mx-auto min-h-[100vh] relative">
      <p className="text-white text-2xl">
        Hello,{" "}
        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          {user?.name}
        </span>
      </p>
      {stats && (
        <div className="my-10">
          <div>
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <h5 className="font-semibold text-2xl">Colleges</h5>
              <Bar data={colleges} options={options} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 w-11/12 mx-auto lg:grid-cols-2">
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <h5 className="font-semibold text-xl">Accomodation</h5>
              <Pie data={accomodation} options={options} />
            </div>
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <h5 className="font-semibold text-xl">Tshirt</h5>
              <Pie data={tshirt} options={options} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
