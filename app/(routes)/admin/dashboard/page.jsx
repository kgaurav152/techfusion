"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import Link from "next/link";
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
import { Separator } from "@/components/ui/separator";

import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/slices/profileSlice";
import { apiConnector } from "@/helpers/apiConnector";
import PageMenubar from "@/components/pageMenuBar";
Chart.register(...registerables);
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [stats, setStats] = useState();
  const [schoolStats, setSchoolStats] = useState();
  // const dispatch = useDispatch();
  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await apiConnector("POST", "/api/getAllStats");
      setStats(data?.data);
    };
    fetchStats();
    const fetchSchoolStats = async () => {
      const { data } = await apiConnector(
        "POST",
        "/api/school/getAllSchoolStats"
      );
      setSchoolStats(data?.data);
    };
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
  const schools = {
    labels: schoolStats?.schoolParticipation.map((sch) => sch?.school),
    datasets: [
      {
        label: "Student By Schools",
        data: schoolStats?.schoolParticipation.map(
          (school) => school?.totalStudent
        ),
        backgroundColor: generateRandomColors(
          schoolStats?.schoolParticipation?.length
        ),
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
  };

  const menuButtons = [
    {
      buttonTitle: "Manage Torch Bearers",
      redirectUrl: "/admin/manage-torch-bearers",
    },
    {
      buttonTitle: "Manage Coordinator",
      redirectUrl: "/admin/manage-torch-bearers/manage-coordinator",
    },
    {
      buttonTitle: "Manage CA",
      redirectUrl: "/admin/manage-torch-bearers/manage-campus-ambassador",
    },
    // { buttonTitle: "Manage ", redirectUrl: "/products" },
    // { buttonTitle: "Contact", redirectUrl: "/contact" },
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
        <div className="mt-6 flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col">
              <Table>
                <TableCaption>
                  Hospitality Management Insight - College
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Matrix</TableHead>
                    <TableHead>Total/Opted</TableHead>
                    <TableHead>Alloted/Approved</TableHead>
                    <TableHead>Pending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="flex-col textcenter">
                  <TableRow>
                    <TableCell className="font-medium">Participant</TableCell>
                    <TableCell>{stats?.allParticipants?.total}</TableCell>
                    <TableCell>{stats?.allParticipants?.approved}</TableCell>
                    <TableCell>{stats?.allParticipants?.pending}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Id Card</TableCell>
                    <TableCell>{stats?.idCardAllocation?.total}</TableCell>
                    <TableCell>{stats?.idCardAllocation?.yes}</TableCell>
                    <TableCell>{stats?.idCardAllocation?.no}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Accomodation</TableCell>
                    <TableCell>{stats?.totalAccomodation?.total}</TableCell>
                    <TableCell>{stats?.totalAccomodation?.alloted}</TableCell>
                    <TableCell>{stats?.totalAccomodation?.pending}</TableCell>
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
            {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
          </Card>
          {/* <Card>
          <CardHeader>
            <CardTitle>Total Amount Collected</CardTitle> 
          </CardHeader>
          <CardContent>
             
            <div className="text-5xl text-center">
              {"₹"}{stats.totalAmount}
            </div>
          </CardContent> 
        </Card> */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-6">
            <Card className="">
              <CardHeader>
                <CardTitle>Accomodation</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <Pie data={accomodation} options={options} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tshirt</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <Pie data={tshirt} options={options} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {stats && (
        <div className="my-10">
          <div>
            <div className=" hidden lg:flex md:flex flex-col gap-y-2 items-center justify-center">
              <h5 className="font-semibold text-2xl">Colleges</h5>
              <Bar data={colleges} options={options} />
            </div>
          </div>
        </div>
      )}
      {schoolStats && (
        <div className="my-10">
          <div>
            <div className=" hidden lg:flex md:flex flex-col gap-y-2 items-center justify-center">
              <h5 className="font-semibold text-2xl">Schools</h5>
              <Bar data={schools} options={options} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
