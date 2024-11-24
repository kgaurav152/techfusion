"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ResultPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <div className="text-4xl font-bold text-center">
        <h1 className="text-white mt-10 mb-2">Manage Result</h1>
      </div>
      <div className="grid md:grid-cols-2 max-w-xl mx-auto gap-5 mt-6 grid-cols-1">
        <Card className="">
          <CardContent className="grid justify-center">
            <span className="text-2xl font-medium text-center mt-4">
              View Result
            </span>
          </CardContent>
          <CardFooter className="flex flex-col justify-center">
            <div>
              <div>
                <Button
                  className="mt-2 w-full"
                  varient=""
                  type="button"
                  onClick={() => router.push("/admin/result/view")}
                >
                  <Eye className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="">
          <CardContent className="grid justify-center">
            <span className="text-2xl font-medium text-center mt-4">
              Create Result
            </span>
          </CardContent>
          <CardFooter className="flex flex-col justify-center">
            <div>
              <div>
                <Button
                  className="mt-2 w-full"
                  varient=""
                  type="button"
                  onClick={() => router.push("/admin/result/create")}
                >
                  <Pencil className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;
