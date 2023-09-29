"use client"
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import qs from 'query-string'

import { useModel } from "@/hooks/use-model-store";
import { Check,Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../UserAvatar";
import { serverPropsWithMembers } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { IMember, IUser, Role } from "@/Models/schema-models";
import { useRouter } from "next/navigation";


const MemberModel = () => {

  const {isOpen , type , onClose , data , onOpen } = useModel()
  const [loadingId , setLoadingId] = useState("")
  const router = useRouter()
  
  const isModelOpen = isOpen && type === 'members'
  const {serializedServer} = data as {serializedServer: serverPropsWithMembers}
  const server = serializedServer

  const roleIconMap = {
    "GUEST":null,
    "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN":<ShieldAlert className="h-4 w-5 ml-2 text-rose-500"/>
  }
 
  const onRoleChange = async (memberId:string,role:Role) =>{
    try {
      // Optimistic update: Update the UI immediately.
    const updatedServer = { ...server };
    const memberIndex = updatedServer.members.findIndex(
      (m) => m._id.toString() === memberId
    );
    if (memberIndex !== -1) {
      updatedServer.members[memberIndex].role = role;
    }
    // Update the state with the optimistic change.
    onOpen("members", { serializedServer: updatedServer });

    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?._id,
      },
    });

    const response = await axios.patch(url, { role });

    // Update the state with the actual data from the server.
    onOpen("members", { serializedServer: response.data });
    } catch (error) {
      console.log("[ON_ROLE_CHANGE ERROR] AT MEMBER_MODEL" , error)
    }finally{
     setLoadingId("")
    }
  } 

  const onkICK = async (memberId:string) =>{
    try {


    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?._id,
      },
    });

    const response = await axios.delete(url);

    router.refresh()
    onOpen("members", { serializedServer: response.data });

    } catch (error) {
      console.log("[ON_kICK_MEMBER ERROR] AT MEMBER_MODEL" , error)
    }finally{
     setLoadingId("")
    }
  } 




  return (
    <Dialog open={isModelOpen} onOpenChange={onClose} >
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center font-bold text-2xl">
           Invite People
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
       <ScrollArea className="max-h-[420px] pr-6 mt-8">
          {server?.members?.map((member:IMember & { profileId: IUser})=>(
            <div className="flex items-center gap-x-2 mb-6">
              <UserAvatar key={member?._id.toString()} src={member?.profileId?.imageUrl}/>
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex item-center gap-x-1">
                   {member?.profileId?.name}
                   {roleIconMap[member.role]}
                </div>
                <p className="text-cs text-zinc-500">
                  {member.profileId?.email}
                </p>
              </div>
              {server.profileId !== member.profileId && loadingId!== member._id && (
                <div className="ml-auto">
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <MoreVertical className="text-zinc-500 h-4 w-4"/>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                           <DropdownMenuSubTrigger className="flex items-center">
                              <ShieldQuestion className="h-4 w-4 mr-2"/>
                              <span>Role</span>
                           </DropdownMenuSubTrigger>
                           <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                               <DropdownMenuItem onClick={() => onRoleChange(member?._id,Role.GUEST)}>
                                <Shield className="h-4 w-4 mr-2"/>
                                 Guest 
                                 {member?.role === 'GUEST' && (
                                  <Check className="h-4 w-4 ml-auto"/>
                                 )}
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => onRoleChange(member?._id,Role.MODERATOR)}>
                                <Shield className="h-4 w-4 mr-2"/>
                                 Moderator 
                                 {member?.role === 'MODERATOR' && (
                                  <Check className="h-4 w-4 ml-auto"/>
                                 )}
                               </DropdownMenuItem>
                            </DropdownMenuSubContent>
                           </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem 
                        onClick={() => onkICK(member?._id)}
                        >
                        <Gavel className="h-4 w-4 mr-2" />
                          kick
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member._id && (
                <Loader2 className="animate-spin h-4 w-4 ml-auto"/>
              )}
            </div>
          ))}
       </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModel;
