"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiConnector } from "@/helpers/apiConnector";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { schools, studentClasses, sections } from "@/public/constants";

import { columns as idColumns } from "@/app/(routes)/hospitality/school/_components/_idDetails/columns";
import { DataTable as IdDataTable } from "@/app/(routes)/hospitality/school/_components/_idDetails/data-table";
import { columns as paymentColumns } from "@/app/(routes)/hospitality/school/_components/_paymentDetails/columns";
import { DataTable as PaymentDataTable } from "@/app/(routes)/hospitality/school/_components/_paymentDetails/data-table";

export function Payment({
  allParticipantsData,
  allSchoolStatsData,
  fetchAllParticipants,
}) {
  return (
    <div className="flex flex-col mt-2">
      {/* <p className="text-xl font-semibold mb-2">Total Participants :</p>
      <p>Id: {allSchoolStatsData?.idCardAllocation?.total}</p>
      <p>Alloted Id Card: {allSchoolStatsData?.idCardAllocation?.yes}</p>
      <p>Pending Allocation: {allSchoolStatsData?.idCardAllocation?.no}</p> */}
      <div className="w-full text-center">
        <PaymentDataTable
          columns={paymentColumns(fetchAllParticipants)}
          data={allParticipantsData}
        />
      </div>
    </div>
  );
}

export function IdCard({
  fetchAllParticipants,
  allSchoolStatsData,
  allParticipantsData,
}) {
  return (
    <div className="flex flex-col mt-2">
      <p className="text-xl font-semibold mb-2">Total Participants :</p>
      <p>Id: {allSchoolStatsData?.idCardAllocation?.total}</p>
      <p>Alloted Id Card: {allSchoolStatsData?.idCardAllocation?.yes}</p>
      <p>Pending Allocation: {allSchoolStatsData?.idCardAllocation?.no}</p>
      <div className="w-full text-center">
        <IdDataTable
          columns={idColumns(fetchAllParticipants)}
          data={allParticipantsData}
        />
      </div>
    </div>
  );
}

export function SchoolStudentRegistrationForm({ fetchAllSchoolParticipants }) {
  const SchoolStudentRegistrationFormSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be 5 or more characters long" }),
    parentPhoneNumber: z
      .string()
      .min(10, { message: "Mobile no. must be 10 digits" })
      .max(10, { message: "Mobile no. must be 10 digits" })
      .optional(),
    gender: z.enum(["Male", "Female"], { message: "Select a valid option" }),
    school: z.string({ message: "Must be a valid School Name" }),
    otherSchool: z.string().optional(),
    studentClass: z.string({ message: "Must be a valid class" }),
    section: z.string().optional(),
    rollNo: z
      .string()
      .refine((val) => !isNaN(Number(val)), "Roll No must be a valid number"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccessfulPopup, setIsRegistrationSuccessfulPopup] =
    useState(false);
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(SchoolStudentRegistrationFormSchema),
    mode: "onChange",
  });

  const handleRegistrationSuccessfulClick = () => {
    setIsRegistrationSuccessfulPopup(false);
    fetchAllSchoolParticipants();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (data.college != "other") {
      data.otherCollege = null;
    }

    const conditionalAmount = 150;

    const obj = {
      name: data.name,
      parentPhoneNumber: data.parentPhoneNumber,
      gender: data.gender,
      school: data.school != "other" ? data.school : data.otherSchool,
      studentClass: data.studentClass,
      section: data.section,
      rollNo: data.rollNo.toString(),
      registrationFee: conditionalAmount,
    };

    const timeoutError = setTimeout(() => {
      toast.error("Request timed out. Please try again later.");
      setIsLoading(false);
    }, 120000);

    var toastId;

    try {
      toastId = toast.loading("Creating Student Account...");
      const { data } = await apiConnector(
        "POST",
        "/api/school/schoolStudentRegistration",
        obj
      );
      toast.dismiss(toastId);
      if (data.success) {
        toast.success("Student Registered Successfully!");
        console.log(data.data);
        setRegisteredStudent(data.data);
        setIsRegistrationSuccessfulPopup(true);
        form.reset();
      } else {
        toast.error(data.message);
      }
      clearTimeout(timeoutError);
      setIsLoading(false);
    } catch (err) {
      clearTimeout(timeoutError);
      toast.error("Something went wrong. Please try again later.");
      toast.dismiss(toastId);
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:gap-4 mb-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Full Name" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent&apos;s Mobile No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Parent's Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="flex flex-col md:mt-2.5">
                  <FormLabel>School*</FormLabel>
                  <Popover open={openPop} onOpenChange={setOpenPop}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? schools.find(
                                (school) => school.value === field.value
                              )?.label
                            : "Select School"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search School..." />
                        <CommandEmpty>No School found.</CommandEmpty>
                        <ScrollArea className="h-48 overflow-auto">
                          <CommandGroup>
                            {schools.map((school) => (
                              <CommandItem
                                value={school.label}
                                key={school.value}
                                onSelect={() => {
                                  form.setValue("school", school.value);
                                  setOpenPop(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    school.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {school.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    If you don&apos;t find your School in the list select other.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("school") === "other" && (
              <FormField
                control={form.control}
                name="otherSchool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter School Name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="studentClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentClasses &&
                        studentClasses.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sections &&
                        sections.map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item.value}
                          >{`${item.label}`}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rollNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll No*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Roll No"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Card className="mx-auto max-w-xl mb-4 text-left">
            <CardContent>
              <div className="flex items-center pt-4">
                <p className="font-semibold font-mono">
                  Participant needs to pay registration fee of{" "}
                  <span className="font-bold">Rs. 150/-</span>{" "}
                </p>
              </div>
            </CardContent>
          </Card>
          <Button
            type="submit"
            disabled={isLoading}
            className="transition mx-auto ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none"
          >
            Register Student
          </Button>
        </form>
      </Form>
      {isRegistrationSuccessfulPopup && registeredStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-md w-4/5 lg:w-2/5">
            <h2 className="mb-2 text-center font-extrabold">
              Student Registered Successfully!
            </h2>
            <p className="font-mono mb-2">
              Student&apos;s TechFusion Id:{" "}
              {registeredStudent.festId ? (
                <strong>{registeredStudent.festId}</strong>
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              Name:{" "}
              <b>
                {registeredStudent.name ? (
                  registeredStudent.name
                ) : (
                  <span className="text-rose-500">not available</span>
                )}
              </b>{" "}
              !
            </p>
            <p className="font-mono mb-2">
              Gender:{" "}
              {registeredStudent?.gender ? (
                registeredStudent.gender
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              School:{" "}
              {registeredStudent?.school ? (
                registeredStudent.school
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              Class:{" "}
              {registeredStudent?.studentClass ? (
                registeredStudent.studentClass
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              Section:{" "}
              {registeredStudent?.section ? (
                registeredStudent.section
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              Roll No:{" "}
              {registeredStudent?.rollNo ? (
                registeredStudent.rollNo
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              Parent Phone No:{" "}
              {registeredStudent?.parentPhoneNumber ? (
                registeredStudent.parentPhoneNumber
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              Registration Fee:{" "}
              {registeredStudent?.registrationFee ? (
                registeredStudent.registrationFee
              ) : (
                <span className="text-rose-500">not available</span>
              )}
            </p>
            <p className="font-mono mb-2">
              Payment Status:{" "}
              {registeredStudent?.isPaymentConfirmed === true ? (
                <span className="text-green-500">Paid</span>
              ) : (
                <span className="text-rose-500">Pending</span>
              )}
            </p>
            <div className="flex flex-row gap-6 mt-8 justify-center">
              <Button variant="" onClick={handleRegistrationSuccessfulClick}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default function SchoolHospitality() {
  const router = useRouter();
  const [allSchoolParticipantsData, setAllSchoolParticipantsData] = useState(
    []
  );
  const [
    allConfirmedSchoolParticipantsData,
    setAllConfirmedSchoolParticipantsData,
  ] = useState([]);
  const [allSchoolStatsData, setAllSchoolStatsData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAllSchoolParticipants = async () => {
    setLoading(true);
    try {
      const { data } = await apiConnector(
        "POST",
        "/api/school/getAllParticipants"
      );
      setLoading(false);
      if (data.success) {
        const unRestructuredUsers = data.data;
        const restructuredUsers = unRestructuredUsers.map((user) => ({
          label: `${user.festId} - ${user.name}`,
          value: user._id,
          createdAt: new Date(user.createdAt).toLocaleDateString("en-GB"),
          name: user.name,
          gender: user.gender,
          studentClass: user.studentClass,
          section: user.section,
          rollNo: user.rollNo,
          school: user.school,
          parentPhoneNumber: user.parentPhoneNumber,
          festId: user.festId,
          registrationFee: user.registrationFee,
          paymentStatus: user.isPaymentConfirmed,
          paymentReceivedBy: user.paymentReceivedBy,
          idCardAllocation: user.idCardAllocation,
          technical: user.technical,
          cultural: user.cultural,
        }));
        setAllSchoolParticipantsData(restructuredUsers);
        const confirmedPaymentRestructuredStudents = restructuredUsers.filter(
          (schoolStudent) => schoolStudent.paymentStatus === true
        );
        setAllConfirmedSchoolParticipantsData(
          confirmedPaymentRestructuredStudents
        );
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllSchoolStatsData = async () => {
    const { data } = await apiConnector(
      "POST",
      "/api/school/getAllSchoolStats"
    );
    setAllSchoolStatsData(data?.data);
  };

  const fetchAllDetails = () => {
    fetchAllSchoolParticipants();
    fetchAllSchoolStatsData();
  };

  useEffect(() => {
    fetchAllDetails();
  }, []);

  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <>
      <div className="flex justify-center gap-4 w-11/12 mx-auto mt-4 mb-8">
        {/* <Button onClick={(e) => handleClick(e, "/hospitality/school/details")}>
          View Allocation Details
        </Button> */}
        <Button
          onClick={(e) =>
            handleClick(e, "/hospitality/school/event-management")
          }
        >
          Manage School Event Participation
        </Button>
      </div>
      <div className="flex justify-center mt-4 mb-8 p-2">
        <Tabs defaultValue="studentRegistration" className="max-w-4xl w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="studentRegistration">Registration</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="idCard">Id Card</TabsTrigger>
          </TabsList>
          <TabsContent value="studentRegistration">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>School Student Registration</CardTitle>
                  <CardDescription>Register Student Below:</CardDescription>
                </CardHeader>
                <CardContent>
                  <SchoolStudentRegistrationForm
                    fetchAllSchoolParticipants={fetchAllSchoolParticipants}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="payment">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Related Details</CardTitle>
                  <CardDescription>
                    View and modify Payment related information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Payment
                    allParticipantsData={allSchoolParticipantsData}
                    allSchoolStatsData={allSchoolStatsData}
                    fetchAllParticipants={fetchAllDetails}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="idCard">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Id Card</CardTitle>
                  <CardDescription>
                    Allot Id Card and View Status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IdCard
                    allParticipantsData={allConfirmedSchoolParticipantsData}
                    allSchoolStatsData={allSchoolStatsData}
                    fetchAllParticipants={fetchAllDetails}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
