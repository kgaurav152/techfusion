"use client"
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardFooter } from '@/components/ui/card'
import { Eye, Pencil } from 'lucide-react'
import { useRouter } from "next/navigation";
import React from 'react'

const ResultPage = () => {
    const router=useRouter();
  return (
    <>
        <div className="text-4xl font-bold text-center mb-12">
            <h1 className="text-white mt-10 mb-2">Manage Result</h1>
        </div>
        <div className='my-5 flex gap-8 lg:gap-6 flex-col lg:flex-row items-center justify-center'>
            <Card className="lg:w-[250px] w-[190px]">
            <CardContent className="grid justify-center">
                <span className="text-2xl font-medium text-center mt-4">View Result</span>
                
            </CardContent>
            <CardFooter className="flex flex-col justify-center">
                <div> 
                <div>
                    <Button className="mt-2 w-full"
                    varient=""
                    type="button"
                    onClick={() => router.push("/admin/result/view")}
                    >
                    <Eye className="h-8 w-8" /></Button>
                </div>
                </div>
            </CardFooter>
            </Card>
            <Card className="lg:w-[250px] w-[190px]">
            <CardContent className="grid justify-center">
                <span className="text-2xl font-medium text-center mt-4">Create Result</span>
                
            </CardContent>
            <CardFooter className="flex flex-col justify-center">
                <div> 
                <div>
                    <Button className="mt-2 w-full"
                    varient=""
                    type="button"
                    onClick={() => router.push("/admin/result/create")}
                    >
                    <Pencil className="h-8 w-8" /></Button>
                </div>
                </div>
            </CardFooter>
            </Card>
        </div>
    </>
  )
}

export default ResultPage