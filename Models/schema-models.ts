import mongoose, { Schema, Types, model, models } from 'mongoose';


export interface IUser {
userId:string,
name:string,
email:string,
imageUrl:string,
server:Types.ObjectId[],
members:Types.ObjectId[],
channels:Types.ObjectId[]
}

const UserProfileSchema = new Schema<IUser>({
    userId: { type: String, unique: true },
    name: String,
    email: {type:String,index:true , unique:true},
    imageUrl: {type: String,index:true},
    
    server:[{type:Schema.Types.ObjectId,ref:'Server'}],
    members:[{type:Schema.Types.ObjectId,ref:'Members'}],
    channels:[{type:Schema.Types.ObjectId,ref:'Channels'}]
}, {
    timestamps: true
});

const UserProfile  = models?.['UserProfile'] || model<IUser>('UserProfile', UserProfileSchema);






export interface IServer {
  _id:string,
name:string,
imageUrl:string,
inviteCode:string,
profileId:Types.ObjectId,
channels:Types.ObjectId[],
members:Types.ObjectId[]
}

const serverSchema = new Schema<IServer>({
    name: String,
    imageUrl: { type: String, index: true },
    inviteCode: { type: String, unique: true , index:true },

    profileId: { type: Schema.Types.ObjectId, ref: 'UserProfile', index: true },
    channels:[{type: Schema.Types.ObjectId,ref:'Channels'}],
    members:[{type: Schema.Types.ObjectId,ref:'Members'}],
    
},{
    timestamps:true
});

const Server = models?.['Server'] || model<IServer>('Server', serverSchema);



export interface IMember {
    _id:string,
    role: Role;
    profileId: Types.ObjectId;
    server: Types.ObjectId[];
  }
  
  export enum Role {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    GUEST = 'GUEST',
  }
  
  const MemberSchema = new Schema<IMember>({
    role: { type: String, default: Role.GUEST, enum: Object.values(Role), index: true },
    profileId: { type: Schema.Types.ObjectId, ref: 'UserProfile', index: true },
    server: [{ type: Schema.Types.ObjectId, ref: 'Server' }],
  }, {
    timestamps: true,
  });
  
const Members = models?.['Members'] ||  model<IMember>("Members",MemberSchema)





export interface IChannel {
    name:string,
    type:ChannelType,
    profileId:Types.ObjectId,
    server:Types.ObjectId[]
}

 export enum ChannelType {
    TEXT = 'TEXT',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO'
}

const ChannelSchema  = new Schema<IChannel>({
    name:String,
    type:{ type: String , default:ChannelType.TEXT,required:true,enum:Object.values(ChannelType),index:true},

    profileId: { type: Schema.Types.ObjectId, ref: 'UserProfile', index: true },
    server:[{type: Schema.Types.ObjectId,ref:'Server'}]
},{
    timestamps:true
})


const Channels = models?.['Channels']||  model<IChannel>("Channels",ChannelSchema)





export { UserProfile, Server , Members , Channels };