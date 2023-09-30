import { Server } from '@/Models/schema-models'
import ConnectedToDb from '@/Utils/mongoose'
import CurrentProfile from '@/lib/current-profile'
import React from 'react'
import NavigationAction from './navigation-action'
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import NavigationItem from './navigation-item'
import { ModeToggle } from '../theme-toggle'
import { UserButton, redirectToSignIn } from '@clerk/nextjs'




const NavigationSidebar = async () => {
    const profile = await CurrentProfile()

    if(!profile){
       return redirectToSignIn()
    }
    await ConnectedToDb()
    const servers = await Server.aggregate([
        {
          $lookup: {
            from: 'members', 
            localField: 'members', 
            foreignField: '_id',
            as: 'membersData', 
          },
        },
        {
          $match: {
            'membersData.profileId': profile._id, 
          },
        },
      ]);

  



  return (
    <div className='h-full flex flex-col space-y-4 py-3 items-center text-primary w-full dark:bg-[#131F22]'>
       <NavigationAction/>
       <Separator className="h-[2px] bg-zinc-300 rounded-md mx-auto w-10 dark:bg-zinc-700" />
       <ScrollArea className="flex-1 w-full">
         {servers.map((server)=>(
            <div className='mb-4' key={server._id}>
               <NavigationItem
               name={server.name}
               id={server._id.toString()}
               imageUrl={server.imageUrl}
               />
            </div>
         ))}
       </ScrollArea>
       <div className="flex flex-col pb-3 mt-auto items-center space-y-4">
            <ModeToggle/>
            <UserButton afterSignOutUrl='/' appearance={{
              elements:{
                avatarBox:"h-[48px] w-[48px]"
              }
            }}/>
       </div>
    </div>
  )
}

export default NavigationSidebar
