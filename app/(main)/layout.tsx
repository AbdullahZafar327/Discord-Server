import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import React from 'react'

const MainLayout = async ({children}:{children:React.ReactNode}) => {
  return (
    <div className="h-full">
        <div className="hidden md:flex flex-col inset-y-0 fixed z-30 w-[72px] h-full">
        <NavigationSidebar/>
        </div>
        <main className="md:pl-[72px] h-full">
        {children}
        </main>
    </div>
  )
}

export default MainLayout
