import { IMember, IServer, IUser } from "./Models/schema-models"

export type serverPropsWithMembers = IServer & {
members:IMember & {
  profileId: IUser
}}