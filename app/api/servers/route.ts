import {   ChannelType, Channels, Members, Server } from "@/Models/schema-models";
import ConnectedToDb from "@/Utils/mongoose"
import CurrentProfile from "@/lib/current-profile";
import { NextResponse } from 'next/server'
import { v4 as uuidv4} from 'uuid'


export const POST = async (req:Request) =>{
    await ConnectedToDb();
    try {
        const { name , imageUrl} = await req.json()
     
        const profile = await CurrentProfile();

    
      
        if(!profile){
            return new NextResponse("Unauthorized User",{status:401})
        }


        const member = new Members({
            role: 'ADMIN',
            profileId: profile._id,
        });
        await member.save()
        
        const channel = new Channels({
            name: "general",
            type: ChannelType.TEXT,
            profileId: profile._id,
        });
        await channel.save()

        const server = new Server({
            profileId:profile._id,
            name,
            imageUrl,
            inviteCode: uuidv4(),
            channels: [channel],
            members: [member]
        })

        await server.save()

        return NextResponse.json(server)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}