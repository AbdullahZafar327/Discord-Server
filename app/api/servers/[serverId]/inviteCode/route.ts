import { Server } from "@/Models/schema-models"
import ConnectedToDb from "@/Utils/mongoose"
import CurrentProfile from "@/lib/current-profile"
import {NextResponse} from 'next/server'
import { v4 as uuidv4 } from "uuid"

export const PATCH = async (req:Request,{params}:{params:{serverId:string}}) =>{
    await ConnectedToDb()
    try {
        const profile = await CurrentProfile()
        if(!profile){
            return new NextResponse("Unauthorized Profile",{status:404})
        }

        if(!params.serverId){
            return new NextResponse("ServerId is missing",{status:401})
        }

        const newInviteCode  = await Server.findOneAndUpdate({_id:params.serverId ,profileId:profile._id},{
            inviteCode: uuidv4()
        })
     
        return NextResponse.json(newInviteCode,{status:200})
    } catch (error) {
        return new NextResponse("Internal Server Server",{status:500})
    }
}