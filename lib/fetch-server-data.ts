import { Server } from '@/Models/schema-models'; 
import ConnectedToDb from '@/Utils/mongoose';


async function fetchServerData(serverId:string) {
    await ConnectedToDb()
  try {
    // Use Mongoose to find the server by _id and populate members and channels
    // const server = await Server.findOne({ _id: serverId })
    //   .populate({
    //     path: 'members',
    //     model: 'Members',
    //     options: { sort: { role: 1 } },
    //   })
    //   .populate({
    //     path: 'channels',
    //     model: 'Channels',
    //     options: { sort: { createdAt: 1 } },
    //   });
    const server = await Server.findOne({ _id: serverId })
    .populate({
      path: 'channels',
      options: { sort: { createdAt: 1 } }
    })
    .populate({
      path: 'members',
      populate: { path: 'profileId' },
      options: { sort: { role: 1 } }
    })
    .exec();

    return server; 
  } catch (error) {
    console.error('Error fetching server data:', error);
    throw error; 
  }
}

export default fetchServerData;
