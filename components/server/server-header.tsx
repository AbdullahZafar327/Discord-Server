"use client"
import { serverPropsWithMembers } from "@/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react'
import { Role } from "../../Models/schema-models"
import { useModel } from "@/app/hooks/use-model-store"



interface serverHeaderProps{
    server:serverPropsWithMembers,
    role?:Role
}



const ServerHeader = ({
    server,
    role
}:serverHeaderProps) => {
  const { onOpen  } = useModel()

  const isAdmin = role === Role.ADMIN
  const isModerator = isAdmin || role === Role.MODERATOR
  
 
  
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="focus:outline-none" asChild>
      <button className="h-12 w-full text-md px-3 font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-zinc-900/10 dark:hover:bg-zinc-900/50 flex items-center border-b-2">
        {server.name}
        <ChevronDown className="h-5 w-5 ml-auto"/>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="text-xs font-medium w-56 items-center text-black space-y-[2px] dark:text-neutral-400 ">
      {isModerator && (
      <DropdownMenuItem 
      // onClick={()=> onOpen('invite',{server})}
      className="px-3 py-2 text-sm cursor-pointer">
        Invite People
        <UserPlus className='h-4 w-5 ml-auto'/>
      </DropdownMenuItem>
      )}
      {isAdmin && (
      <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
        Server settings 
        <Settings className='h-4 w-4 ml-auto'/>
      </DropdownMenuItem>
      )}
      {isAdmin && (
      <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
        Manage Members
        <Users className='h-4 w-4 ml-auto'/>
      </DropdownMenuItem>
      )}
      {isAdmin && (
      <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
         create Channel
        <PlusCircle className='h-4 w-4 ml-auto'/>
      </DropdownMenuItem>
      )}
      {isModerator && (
      <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
        <DropdownMenuSeparator className='dark:bg-zinc-600 w-full rounded-md'/>
      </DropdownMenuItem>
      )}
       {isAdmin && (
      <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
         Delete Server
        <Trash className='h-4 w-4 ml-auto '/>
      </DropdownMenuItem>
      )}
       {!isAdmin && (
      <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
         Leave Server
        <LogOut className='h-4 w-4 ml-auto '/>
      </DropdownMenuItem>
      )}

    </DropdownMenuContent>
  </DropdownMenu>
  
  )
}

export default ServerHeader


