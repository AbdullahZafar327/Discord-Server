"use client"
import { Plus } from 'lucide-react'
import React from 'react'
import ActionToolTip from '../action-tooltip'
import { useModel } from '@/app/hooks/use-model-store'



const NavigationAction = () => {
  const {onOpen} = useModel()

  return (
    <div>
        <ActionToolTip
        label="Add a Server"
        side="right"
        align="center"
        >
        <button 
        onClick={() =>onOpen("createServer")}
        className="group items-center flex">
            <div className="w-[48px] h-[48px] mx-3 rounded-[24px] group-hover:rounded-[16px] bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 flex items-center justify-center transition-all">
            <Plus size={25} className="group-hover:text-white transition text-emerald-500 "/>
            </div>
        </button>
        </ActionToolTip>
    </div>
  )
}

export default NavigationAction
