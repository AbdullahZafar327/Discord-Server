import { Channels, Members, Role, Server } from "@/Models/schema-models"
import ConnectedToDb from "@/Utils/mongoose"
import CurrentProfile from "@/lib/current-profile"
import { NextResponse } from "next/server"

export const POST = async (req:Request) =>{
try {
    await ConnectedToDb()
    const profile = await CurrentProfile()
    const {searchParams} = new URL(req.url)
    const {name, type} = await req.json()

    const serverId = searchParams.get("serverId")

    if(!profile){
        return new NextResponse("unAuthorized",{status:401})
    }

    if(!serverId){
        return new NextResponse("Server Id is Missing",{status:500})
    }
    
    if(name === 'general'){
        return new NextResponse("Name cannot be general",{status:400})
    }

    const channel = new Channels({
        profileId:profile._id,
        name,
        type
    })

    await channel.save()


    const member = await Members.aggregate([
      {
        $match: {
            role: { $in: [Role.ADMIN, Role.MODERATOR] }
        }
    },
      {
        $lookup : {
          from:'userprofiles',
          localField:'profileId',
          foreignField:'_id',
          as:"matchingProfile"
        }
      },{
        $match: {
            'matchingProfile._id': profile._id
        }
    },{
      $limit:1
    }
    ])

    console.log(member)

    const server = await Server.findOneAndUpdate(
        {
          _id: serverId,
          profileId: member[0].profileId
        },
        {
          $push:{
            channels: channel
          }
        },
        { new: true }
      );
  console.log(server)


 return new NextResponse(server,{status:200})
} catch (error) {
    return new NextResponse("Internal server Error",{status:500})
}
}