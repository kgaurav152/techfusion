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

export const CertificateDetailPage = () => {
  
    const [certificateDetails, setCertificateDetails] = useState(null);

    const pathname = usePathname();
    const parts = pathname.split('/');
    const certId = parts[parts.length - 1];
  
    const fetchCertificateDetails = async () => {
        try{
            const toastId = toast.loading("Loading ....")
            const { data } = await apiConnector("POST", "/api/verifyCertificate",{certId:certId});
            toast.dismiss(toastId);
            if (data.success) {
            setCertificateDetails(data.data);
            } else {
            toast.error(data.message);
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
            <div className="text-center mb-4 text-border flex-col">
                <Card className="mx-auto w-4/5 lg:w-2/5 max-w-xl mb-8 mt-20 text-left">
                    <CardContent>    
                        <div className="mb-8 mt-8 text-center"><h2 className="font-bold">Certificate Verified!</h2></div>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment>
    );
  }
  
  export default CertificateDetailPage;