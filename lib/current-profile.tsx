import { UserProfile } from "@/Models/schema-models";
import ConnectedToDb from "@/Utils/mongoose";
import { auth } from "@clerk/nextjs"


const CurrentProfile = async () => {
 const {userId} = auth();
 await ConnectedToDb()
try {
    if(!userId){
        return null;
    }

    const profile = await UserProfile.findOne({ userId: userId })

    return profile;
} catch (error) {
    console.log("[CURRENT_PROFILE_ERROR]",error)
}
}

export default CurrentProfile
