"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const VerifyCertificateID = () => {

    const {festId} = useParams();
  return (
    <div className='text-white my-10'>VerifyCertificateID- {festId}</div>
  )
}

export default VerifyCertificateID