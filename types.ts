
import { IServer, IMember, IChannel, IUser } from "./Models/schema-models";


export type serverPropsWithMembers = IServer & {
  members: (IMember & { profileId : IUser})[],
  channels:IChannel[]
};


