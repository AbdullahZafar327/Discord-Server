"use client"
import React, { useState } from "react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useModel } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy, CopyCheck, RefreshCcw } from "lucide-react";
import UseOrigin from "@/hooks/use-origin";
import axios from "axios";


const InviteFriend = () => {
  const [isCopied , setIsCopied] = useState(false)
  const[isLoading , setIsLoading] = useState(false)
  const {isOpen , type , onClose , data , onOpen } = useModel()
  const linkOrigin = UseOrigin()
  
  const isModelOpen = isOpen && type === 'invite'
  const server = data?.serializedServer
  const InviteLink = `${linkOrigin}/invite/${server?.inviteCode}`

  const onCopy = () =>{
    navigator.clipboard.writeText(InviteLink)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000);
  }


  const NewLink = async () =>{
    try {
      setIsLoading(true)

      const response = await axios.patch(`/api/servers/${server?._id}/inviteCode`)

      console.log(response)
      onOpen("invite",{serializedServer:response.data})
      
    } catch (error) {
      console.log("[NEW LINK GENERATE ERROR",error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose} >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center font-bold text-2xl">
           Invite People
          </DialogTitle>
        </DialogHeader>
       <div className="p-6">
          <Label className="font-bold text-zinc-500 text-xs dark:text-secondary/70 uppercase">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-t gap-x-2">
           <Input
           value={InviteLink}
           className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black bg-zinc-300/50"
           />
           <Button  onClick={onCopy} size="icon">
            {isCopied ? <Check className="w-5 h-5"/> :   <Copy className="w-5 h-5"/>}
           </Button>
          </div>
          <Button disabled={isLoading} onClick={NewLink} size="sm" variant="link" className="text-black mt-2">
              Generate Invite Link
             <RefreshCcw className="h-5 w-5 ml-2" />
          </Button>
       </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFriend;
