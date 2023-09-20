import { Server } from "@/Models/schema-models";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

import React from "react";
import InitialModel from "@/components/models/initial-model";
import ConnectedToDb from "@/Utils/mongoose";

const SetupPage = async () => {
  const profile = await initialProfile();

  await ConnectedToDb()
    const server = await Server.aggregate([
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
    
  
    if (server.length > 0) {
     return redirect(`/servers/${server[0]._id}`);
    } 

  return <InitialModel />;
};

export default SetupPage;
