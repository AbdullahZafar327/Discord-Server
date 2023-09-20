import { ChannelType, IChannel, IMember, Server } from '@/Models/schema-models';
import ConnectedToDb from '@/Utils/mongoose';
import CurrentProfile from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs';
import {redirect} from 'next/navigation'
import ServerHeader from './server-header';

interface serverSidebarProps{
    serverId:string
}


const ServerSidebar = async ({serverId}:serverSidebarProps) => {
    const profile = await CurrentProfile();

     if(!profile){
        return redirectToSignIn()
     }

    await ConnectedToDb()

    const server = await Server.findOne({
        _id: serverId
      })
      .populate({
        path: 'members',
        model: "Members",
        select: '-_id', // Retrieve all fields except _id
        options: { sort: { role: 1 } }
      })
      .populate({
        path: 'channels',
        model: "Channels",
        select: '-_id', // Retrieve all fields except _id
        options: { sort: { createdAt: 1 } }
      }) ;

      console.log(server)
    const textChannel = server?.channels?.filter((channel:IChannel) => channel.type === ChannelType.TEXT) 
    const videoChannel = server?.channels?.filter((channel:IChannel) => channel.type === ChannelType.VIDEO) 
    const audioChannel = server?.channels?.filter((channel:IChannel) => channel.type === ChannelType.AUDIO) 
    const members = server?.members?.filter((member:IMember)=> member.profileId.toString() !== profile._id.toString())

    const role  = server.members?.find((member:IMember) => member.profileId.toString() === profile._id.toString())?.role
    

    if(!server){
        return redirect('/')
    }

  return (
    <div className="flex flex-col w-full h-full dark:bg-[#2B2D31] bg-[F2F3F5]">
      <ServerHeader role={role} server={server}/>
    </div>
  )
}

export default ServerSidebar
