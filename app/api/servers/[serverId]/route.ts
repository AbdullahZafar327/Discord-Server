import { Server } from "@/Models/schema-models"
import ConnectedToDb from "@/Utils/mongoose"
import CurrentProfile from "@/lib/current-profile"
import { NextResponse } from 'next/server'

interface updateServerProps{
    params:{
        serverId:string
    }
}

export const PATCH = async (req:Request,{params}:updateServerProps) =>{
try {
    await ConnectedToDb()
    const profile = await CurrentProfile();
    const {name , imageUrl} = await req.json()

    if(!profile){
        return new NextResponse("unAuthorized",{status:401})
    }

    if(!params.serverId){
        return new NextResponse("Server Id is missing",{status:404})
    }

    const updatedServer = await Server.findOneAndUpdate({
        _id: params.serverId,
        profileId:profile._id
    },{
        name,
        imageUrl
    })

    return new NextResponse(updatedServer,{status:200})
} catch (error) {
    console.log("[SERVER_UPDATE_ERROR_BACKEND]",error)
    return new NextResponse("Internal Server Error",{status:500})
}
}