"use client"
import React from 'react'
import ActionToolTip from '../action-tooltip'
import { cn } from '@/lib/utils'
import { useParams , useRouter } from 'next/navigation'
import Image from 'next/image'

interface NavigationItemProps{
    name:string,
    imageUrl:string,
    id:string
}


const NavigationItem = ({
    name, id , imageUrl
}:NavigationItemProps) => {
    const params = useParams();
    const router = useRouter()

    const onClick = () =>{
      router.push(`/servers/${id}`)
    }

  return (
    <ActionToolTip
    side="right"
    align="center"
    label={name}
    >
     <button 
     onClick={onClick}
     className={cn("relative group flex items-center")}
     >
      <div className={cn("absolute left-0 rounded-r-full bg-primary transition-all w-[4px]",
      params?.serverId !== id && "group-hover:h-[20px]",
      params?.serverId === id ? "h-[36px]" : "h-[8px]"
      )} />
          <div className={cn("relative group flex mx-3 rounded-[24px] group-hover:rounded-[16px] h-[48px] w-[48px] transition-all overflow-hidden",
            params?.serverId === id &&  "bg-primary/10 text-primary rounded-[16px]"
          )}>
              <Image
              src={imageUrl}
              alt="serverImage"
              fill
              />
          </div>
     </button>
    </ActionToolTip>
  )
}

export default NavigationItem
