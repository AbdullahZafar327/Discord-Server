"use client"
import { useEffect, useState } from "react"

const UseOrigin = () => {
    const [isMounted , setIsMounted] = useState(false)
    useEffect(()=>{
      setIsMounted(true)
    },[])

    const Origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

    if(!isMounted){
        return ""
    }
  return Origin
}

export default UseOrigin
