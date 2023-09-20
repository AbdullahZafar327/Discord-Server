"use client"
import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css'
import React from 'react'
import  Image   from 'next/image'
import { X } from 'lucide-react';

interface UploadThingProps {
    onChange : (url ?: string) => void;
    value:string;
    endPoint: "messageFile" | "serverImage"

}
const UploadFile = ({
    onChange,
    value,
    endPoint
}:UploadThingProps) => {
  const fileType = value?.split('.').pop()

  if(value && fileType !== 'pdf'){
    return (
      <div className="relative h-20 w-20">
         <Image
         fill
         src={value}
         alt="uploadImage"
         className="rounded-full"
         />
         <button 
         onClick={() =>onChange("")}
         type="button"
         className="bg-rose-500 text-white rounded-full absolute top-0 right-0"
         
         >
           <X className="h-4 w-4"/>
         </button>
      </div>
    )
  }
  return (
   <UploadDropzone
    endpoint={endPoint}
    onClientUploadComplete={(res) => {
      onChange(res?.[0].url)
    }}
    onUploadError={(error:Error) => {
      console.log(error)
    }}
   />
  )
}

export default UploadFile
