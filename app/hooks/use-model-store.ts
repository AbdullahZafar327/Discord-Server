"use client"
import { create } from 'zustand'
import { serverPropsWithMembers } from '@/types';


export type ModelType = "createServer" | "invite" 

interface ModelData {
   server?:serverPropsWithMembers
}

interface ModelStore {
    type: ModelType | null;
    data:ModelData;
    isOpen: boolean;
    onOpen: (type:ModelType,data?: ModelData) => void;
    onClose: () => void;
}

export const useModel = create<ModelStore>((set)=>({
    type :null,
    data:{},
    isOpen:false,
    onOpen:(type,data={}) => set({isOpen:true,type,data}),
    onClose:() => set({isOpen:false,type:null})
}))
