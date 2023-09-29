"use client"
import React, { useEffect, useState } from 'react'
import CreateServerModel from '../models/create-server-model';
import InviteFriend from '../models/invite-friend-model';
import EditServerModel from '../models/edit-server';
import MemberModel from '../models/member-model';
import CreateChannel from '../models/create-channel';


const ModelProvider = () => {
    const [isMounted , setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

  return (
  <>
   <CreateServerModel/>
   <InviteFriend/>
   <EditServerModel/>
   <MemberModel/>
   <CreateChannel/>
  </>
  )
}

export default ModelProvider
