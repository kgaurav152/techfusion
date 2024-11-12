"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { colleges } from "@/public/constants";
// import { campusAmbassadors } from "@/public/coordinators";
import CACard from "@/components/cACard";
import { coordinatordetails } from "@/public/coordinators";
import CoordinatorCard from "@/components/coordinatorCard";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from '@/components/ui/card'
// import { Building, Mail, Phone } from 'lucide-react';
import { ChevronsUpDown, Check } from "lucide-react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setCampusAmbassador } from "@/redux/slices/campusAmbassadorSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "@/helpers/apiConnector";

export const CAPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [openPop, setOpenPop] = useState(false);
  const [value, setValue] = useState({});
  const [selectedCampusAmbassador, setSelectedCampusAmbassador] = useState([]);
  const [caContactPerson, setCaContactPerson] = useState({});

  useEffect(() => {
    const fetchCampusAmbassador = async () => {
      try {
        const { data } = await apiConnector(
          "POST",
          "/api/campusAmbassador/getAllCampusAmbassador"
        );
        // console.log(data?.data)
        dispatch(setCampusAmbassador(data?.data));
      } finally {
        setLoading(false);
      }
    };
    fetchCampusAmbassador();
  }, [dispatch]);

  const { campusAmbassador } = useSelector(
    (state) => state.campusAmbassador || { campusAmbassador: [] }
  );

  const mapCADetails = () => {
    if (value) {
      const selectedCA = campusAmbassador.filter((ca) => ca.college === value);
      if (selectedCA.length > 0) {
        console.log(selectedCA);
        setSelectedCampusAmbassador(selectedCA);
      } else {
        setSelectedCampusAmbassador([]);
      }
    }
  };

  useEffect(() => {
    mapCADetails();
  }, [value]);

  const selectedCP = coordinatordetails.find((cp) => cp.name === "Krishan Raj");

  // const mapCAContactDetails = () => {
  //     setCaContactPerson(selectedCP);
  //     if (selectedCP) {
  //         console.log(selectedCP)
  //         setCaContactPerson(selectedCP);
  //     }
  // };

  // useEffect(() => {
  //     mapCAContactDetails();
  //     console.log(caContactPerson);
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-2 mb-8 text-center">
      <div
        className="flex flex-col items-center mt-4 p-4 w-4/5 text-center"
        id="campusAmbassdors"
      >
        <h3 className="text-xl text-white font-bold mb-4">
          Select your College below to get contact details of your
          college&apos;s <span className="">TechFusion&apos;24</span> Campus
          Ambassador:
        </h3>
        <div className="container mt-4 mb-5">
          <Popover open={openPop} onOpenChange={setOpenPop}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openPop}
                className={cn(
                  "justify-between",
                  !value && "text-muted-foreground"
                )}
              >
                {value.length > 0
                  ? colleges.find((college) => college.value === value)?.label
                  : "Select College"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search College..." />
                <CommandEmpty>No College found.</CommandEmpty>
                <ScrollArea className="h-48 overflow-auto">
                  <CommandGroup>
                    {colleges.map((college) => (
                      <CommandItem
                        value={college.label}
                        key={college.value}
                        onSelect={() => {
                          setSelectedCampusAmbassador("");
                          setValue(college.value);
                          // console.log(value)
                          setOpenPop(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === college.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {college.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {value && selectedCampusAmbassador.length > 0 ? (
          <div className="campusAmbassadors">
            <h4 className="text-xl font-bold text-white mb-10 mt-4">
              TechFusion&apos;24 Campus Ambassdor:
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {selectedCampusAmbassador.length > 0 &&
                selectedCampusAmbassador.map((ca, index) => (
                  <CACard key={index} data={ca} />
                ))}
            </div>
          </div>
        ) : (
          <>
            {value.length > 0 && (
              <div className="mt-8">
                <p className="text-white mb-4 mt-2">
                  <span className="text-red-500">Oops!</span> We don&apos;t have
                  our <span className="text-yellow-300">Torch Bearer</span> from
                  you College Yet!
                </p>
                <p className="text-white mb-4 mt-8">
                  Want to be our{" "}
                  <span className="text-yellow-300">Torch Bearer</span> for your
                  College ? contact:
                </p>
                {selectedCP && (
                  <CoordinatorCard
                    data={selectedCP}
                    eventLabel={"Contact Person"}
                  />
                )}
              </div>
            )}
          </>
        )}
        ;
      </div>
    </div>
  );
};

export default CAPage;
