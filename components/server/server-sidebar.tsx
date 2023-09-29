import { ChannelType, IChannel, IMember, Server } from '@/Models/schema-models';
import CurrentProfile from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs';
import {redirect} from 'next/navigation'
import ServerHeader from './server-header';
import fetchServerData from '@/lib/fetch-server-data';


interface serverSidebarProps{
    serverId:string
}

const ServerSidebar = async ({serverId}:serverSidebarProps) => {
    const profile = await CurrentProfile();
    const server = await fetchServerData(serverId)

     if(!profile){
        return redirectToSignIn()
     }
     if(!server){
      return redirect('/')
  }
    
    const textChannel = server?.channels?.filter((channel:IChannel) => channel.type === ChannelType.TEXT) 
    const videoChannel = server?.channels?.filter((channel:IChannel) => channel.type === ChannelType.VIDEO) 
    const audioChannel = server?.channels?.filter((channel:IChannel) => channel.type === ChannelType.AUDIO) 
    const members = server?.members?.filter((member:IMember)=> member.profileId._id.toString() !== profile._id.toString())

    const role  = server.members?.find((member:IMember) => member.profileId._id.toString() === profile._id.toString())?.role
    const serializedServer = JSON.parse(JSON.stringify(server))
  return (
    <div className="flex flex-col w-full h-full dark:bg-[#2B2D31] bg-[F2F3F5]">
      <ServerHeader role={role} serializedServer={serializedServer} />
    </div>
  )
}


export default ServerSidebar
