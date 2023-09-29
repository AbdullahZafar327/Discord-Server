import { Members, Server } from "@/Models/schema-models"
import ConnectedToDb from "@/Utils/mongoose"
import CurrentProfile from "@/lib/current-profile"
import { NextResponse } from "next/server"

interface MemberIdProps{
  params: { memberId: string}
}

export const PATCH = async (req:Request , {params}:MemberIdProps) =>{
    try {
        await ConnectedToDb()
        const profile = await CurrentProfile()
        const { searchParams} = new URL(req.url)
        const { role } = await req.json()

        const serverId = searchParams.get("serverId")

        if(!profile){
            return new NextResponse("unAuthorized",{status:401})
        }

        if(!serverId){
            return new NextResponse("Server Id is Missing",{status:500})
        }

        if(!params.memberId){
            return new NextResponse("Member Id is Missing",{status:500})
        }

        const member = await Members.findByIdAndUpdate({
            _id:params.memberId,
            profileId: { $ne: profile._id }
        },{
            role
        })

        const server = await Server.findOneAndUpdate({
            _id:serverId,
            profileId:profile._id
        },{
            members: { member }
        }).populate({
            path: 'members',
            populate: { path: 'profileId' },
            options: { sort: { role: 1 } }
          })
          .exec();

        return new NextResponse(server,{status:200})

    } catch (error) {
        return new NextResponse("internal Server Error",{status:500})
    }
}

export const DELETE = async (req:Request , {params}:MemberIdProps) =>{
    try {
        await ConnectedToDb()
        const profile = await CurrentProfile()
        const { searchParams} = new URL(req.url)

        const serverId = searchParams.get("serverId")

        if(!profile){
            return new NextResponse("unAuthorized",{status:401})
        }

        if(!serverId){
            return new NextResponse("Server Id is Missing",{status:500})
        }

        if(!params.memberId){
            return new NextResponse("Member Id is Missing",{status:500})
        }

        const member = await Members.findByIdAndDelete({
            _id:params.memberId,
            profileId: { $ne: profile._id }
        })

        const server = await Server.findOneAndUpdate({
            _id:serverId,
            profileId:profile._id
        },{
            members: { member }
        }).populate({
            path: 'members',
            populate: { path: 'profileId' },
            options: { sort: { role: 1 } }
          })
          .exec();

        return new NextResponse(server,{status:200})

    } catch (error) {
        return new NextResponse("internal Server Error",{status:500})
    }
}