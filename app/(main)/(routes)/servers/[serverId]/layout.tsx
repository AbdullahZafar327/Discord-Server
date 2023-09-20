import { Server } from "@/Models/schema-models";
import ConnectedToDb from "@/Utils/mongoose";
import ServerSidebar from "@/components/server/server-sidebar";
import CurrentProfile from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const ServerIdLayout = async ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { serverId: string };
  }) => {
    const profile = await CurrentProfile();
  
    if (!profile) {
      return redirectToSignIn();
    }
    
    await ConnectedToDb()
    const server = await Server.aggregate([
     {
        $match:{
          _id:params.serverId
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
          'matchingMembers.profileId': profile._id
        }
      },
       {
        $sort: { createdAt: -1 } // Sort by createdAt in descending order (newest first)
      },
      {
        $limit: 1 // Limit the result to the first document (newest server)
      }
    ]);

    if(!server){
      return redirect('/')
    }
  
    
  
    return ( 
      <div className="h-full">
        <div 
        className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
          <ServerSidebar serverId={params.serverId} />
        </div>
        <main className="h-full md:pl-60">
          {children}
        </main>
      </div>
     );
}

export default ServerIdLayout
