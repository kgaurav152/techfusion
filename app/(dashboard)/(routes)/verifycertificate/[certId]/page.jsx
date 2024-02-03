'use client'

import React, {useState, useEffect} from "react";
import { usePathname } from 'next/navigation';
import toast from "react-hot-toast";
import { apiConnector } from '@/helpers/apiConnector';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { SkeletonCard } from "@/components/SkeletonCard";

export const CertificateDetailPage = () => {
  
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();
    const parts = pathname.split('/');
    const certId = parts[parts.length - 1];
  
    const fetchCertificateDetails = async () => {
        try{
            const toastId = toast.loading("Loading ....")
            const { data } = await apiConnector("POST", "/api/verifyCertificate",{certId:certId});
            toast.dismiss(toastId);
            setLoading(false)
            if (data.success) {
            setCertificateDetails(data.data);
            } else { 
            }
        } catch (err) {
            console.log(err);
        }
    };
  
    useEffect(() => {
        fetchCertificateDetails();
    }, []);
 
  
    return (
        <React.Fragment>
            <div className="text-center mb-4 text-border flex-col min-h-screen">
                <Card className="mx-auto w-4/5 lg:w-2/5 max-w-xl mb-8 mt-20 text-left min-h-[400px] flex items-center justify-center">
                    <CardContent>    
                   {
                    loading ? <div className="flex items-center justify-center">
                    <SkeletonCard/>
            </div> : certificateDetails ? 
                    <>
                    <div className="mb-8 mt-8 text-center"><h2 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Certificate Verified!</h2></div>
                    <div className='grid grid-cols-8'><span className="col-span-2">Certificate ID</span> <span>-</span> <span className="font-semibold col-span-5">{certificateDetails.certId}</span> </div>
                    <div  className='grid grid-cols-8'><span className="col-span-2">Name</span> - <span className="font-semibold col-span-5">{certificateDetails.name}</span> </div>
                    <div  className='grid grid-cols-8'><span className="col-span-2">College</span> - <span className="font-semibold col-span-5">{certificateDetails.college}</span> </div>
                    <div className='mt-3'>
                        <p className="text-2xl">Participated In :</p>
                         <ul className="list-disc ml-10">
                            {
                                certificateDetails.participatedIn.map((item,i) =>(
                                    <li key={i}>{item.event.name}</li>
                                ))
                            }
                         </ul>
                         </div>


                    </> : <div className="text-red-500 text-xl font-semibold">We {"didn't"} find any details about this certificate</div>
                }
                </CardContent>
                </Card>
            </div>
        </React.Fragment>
    );
  }
  
  export default CertificateDetailPage;