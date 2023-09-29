import { Members, Server } from '@/Models/schema-models'
import ConnectedToDb from '@/Utils/mongoose'
import CurrentProfile from '@/lib/current-profile'
import { initialProfile } from '@/lib/initial-profile'
import {  redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface invitePageProps {
    params : {
        inviteCode:string
    }
}
const InvitePage = async ({params}:invitePageProps) => {
              
    const profile = await initialProfile()
    console.log(params.inviteCode)
    await ConnectedToDb()

    if(!profile){
        return redirectToSignIn()
    }


    const existingUserWithServer = await Server.aggregate([
        {
           $match:{
             inviteCode:params.inviteCode
           }
        },
         {
           $lookup: {
             from: 'members',
             localField: 'members',
             foreignField: '_id', // Match with the server field in the Members collection
             as: 'matchingMembers'
           }
         },
         {
           $match: {
             'matchingMembers.profileId': profile?._id
           }
         },
       ]);


 
    if(!params.inviteCode){
        return redirect("/")
    }

    if(existingUserWithServer.length > 0){
        return redirect(`/servers/${existingUserWithServer[0]._id}`)
    }
    
    const existingMember = await Members.findOne({profileId:profile._id})
    let member;
    if(existingMember){
        member = existingMember
    }else{
        member = new Members({
          role:'GUEST',
          profileId:profile._id
        })

        await member.save()
    }

    const server =  await Server.findOneAndUpdate({
      inviteCode: params.inviteCode
    }, {
      $push: { members: member._id } 
    },{
      new:true
    })

    if(server){
      return redirect(`/servers/${server._id}`)
    }else{
      console.log("server not found")
    }
    
  return null
}

export default InvitePage
