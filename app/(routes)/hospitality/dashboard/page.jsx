"use client";

import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "@/helpers/apiConnector";
import PageMenubar from "@/components/pageMenuBar";
import { Separator } from "@/components/ui/separator";
Chart.register(...registerables);
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [stats, setStats] = useState();
  const [schoolStats, setSchoolStats] = useState();
  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await apiConnector("POST", "/api/getAllStats");
      setStats(data?.data);
    };
    const fetchSchoolStats = async () => {
      const { data } = await apiConnector(
        "POST",
        "/api/school/getAllSchoolStats"
      );
      setSchoolStats(data?.data);
    };
    fetchStats();
    fetchSchoolStats();
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
    labels: ["Alloted", "Pending"],
    datasets: [
      {
        data: [
          stats?.totalAccomodation?.alloted,
          stats?.totalAccomodation?.pending,
        ],
        backgroundColor: generateRandomColors(2),
      },
    ],
  };
  const tshirt = {
    labels: ["Alloted", "Pending"],
    datasets: [
      {
        data: [
          stats?.totalTshirtDetails?.alloted,
          stats?.totalTshirtDetails?.pending,
        ],
        backgroundColor: generateRandomColors(2),
      },
    ],
  };
  const idCard = {
    labels: ["Alloted", "Pending"],
    datasets: [
      {
        data: [stats?.idCardAllocation?.yes, stats?.idCardAllocation?.no],
        backgroundColor: generateRandomColors(2),
      },
    ],
  };
  const colleges = {
    labels: stats?.collegeParticipation.map((col) => col?.college),
    datasets: [
      {
        label: "Student By Colleges",
        data: stats?.collegeParticipation.map(
          (college) => college?.totalStudent
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

  const menuButtons = [
    {
      buttonTitle: "Manage College Hospitality",
      redirectUrl: "/hospitality/college",
    },
    {
      buttonTitle: "Manage School Hospitality",
      redirectUrl: "/hospitality/school",
    },
  ];

  return (
    <div className="text-white w-11/12 mx-auto min-h-[100vh] relative">
      <p className="text-white text-2xl">
        Hello,{" "}
        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          {user?.name}
        </span>
      </p>
      <PageMenubar buttons={menuButtons} />
      {stats && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col">
              {/* <div className="overflow-x-auto my-8"> */}
              <Table>
                <TableCaption>
                  Hospitality Management Insight - College
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Matrix</TableHead>
                    <TableHead>Total/Opted</TableHead>
                    <TableHead>Alloted</TableHead>
                    <TableHead>Pending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="flex-col textcenter">
                  <TableRow>
                    <TableCell className="font-medium">Accomodation</TableCell>
                    <TableCell>{stats?.totalAccomodation?.total}</TableCell>
                    <TableCell>{stats?.totalAccomodation?.alloted}</TableCell>
                    <TableCell>{stats?.totalAccomodation?.pending}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Id Card</TableCell>
                    <TableCell>{stats?.idCardAllocation?.total}</TableCell>
                    <TableCell>{stats?.idCardAllocation?.yes}</TableCell>
                    <TableCell>{stats?.idCardAllocation?.no}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TShirt</TableCell>
                    <TableCell>{stats?.totalTshirtDetails?.total}</TableCell>
                    <TableCell>{stats?.totalTshirtDetails?.alloted}</TableCell>
                    <TableCell>{stats?.totalTshirtDetails?.alloted}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Separator className="my-8" />
              {schoolStats && (
                <Table>
                  <TableCaption>
                    Hospitality Management Insight - School
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Matrix</TableHead>
                      <TableHead>Total/Opted</TableHead>
                      <TableHead>Alloted/Paid</TableHead>
                      <TableHead>Pending</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="flex-col textcenter">
                    <TableRow>
                      <TableCell className="font-medium">Id Card</TableCell>
                      <TableCell>
                        {schoolStats?.idCardAllocation?.total}
                      </TableCell>
                      <TableCell>
                        {schoolStats?.idCardAllocation?.yes}
                      </TableCell>
                      <TableCell>{schoolStats?.idCardAllocation?.no}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Payment Status
                      </TableCell>
                      <TableCell>
                        {schoolStats?.allSchoolStudents?.total}
                      </TableCell>
                      <TableCell>
                        {schoolStats?.allSchoolStudents?.approved}
                      </TableCell>
                      <TableCell>
                        {schoolStats?.allSchoolStudents?.pending}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      {stats && (
        <div className="grid grid-cols-1 gap-3 my-2 md:grid-cols-3 w-11/12 mx-auto lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>ID Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={idCard} options={options} />
            </CardContent>
            <CardFooter className="font-semibold text-lg">
              Total : {stats?.idCardAllocation?.total}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accomodation</CardTitle>
            </CardHeader>
            <CardContent className=" flex items-center justify-center">
              <Pie data={accomodation} options={options} />
            </CardContent>
            <CardFooter className="font-semibold text-lg">
              Total Opted : {stats?.totalAccomodation?.total}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tshirt</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={tshirt} options={options} />
            </CardContent>
            <CardFooter className="font-semibold text-lg">
              Total Opted : {stats?.totalTshirtDetails?.total}
            </CardFooter>
          </Card>
        </div>
      )}
      {stats && (
        <div className=" hidden lg:flex md:flex flex-col gap-y-2 items-center justify-center">
          <h5 className="font-semibold text-2xl">Colleges</h5>
          <Bar data={colleges} options={options} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
