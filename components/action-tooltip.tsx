import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
interface ActionToolTipProps{
    label:string,
    children:React.ReactNode,
    side?: 'right'|'left' | 'top' | 'bottom',
    align?: "center" | "start" | "end"
}


const ActionToolTip = ({
    label,
    children,
    side,
    align
}: ActionToolTipProps) => {
  return (
    <TooltipProvider>
    <Tooltip delayDuration={50}>
      <TooltipTrigger asChild>
          {children}
      </TooltipTrigger>
      <TooltipContent align={align} side={side}>
        <p className='dark:text-white font-semibold text-sm capitalize'>
            {label.toLowerCase()}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  
  )
}

export default ActionToolTip
