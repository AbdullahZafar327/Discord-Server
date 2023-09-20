import { UserProfile } from "@/Models/schema-models";
import ConnectedToDb from "@/Utils/mongoose";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const initialProfile = async ()=>{
    try {
        await ConnectedToDb()
        const user = await currentUser()

        if(!user){
         return redirectToSignIn()
        }
        
        const profile = await UserProfile.findOne({userId:user.id})

        if(profile){
            return profile
        }

        const newProfile = new UserProfile({
            userId:user.id,
            name:`${user.firstName}${user.lastName}`,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress
        })

        await newProfile.save()

        return newProfile

    } catch (error) {
        console.log("InitialModel_ERROR",error)
    }
}