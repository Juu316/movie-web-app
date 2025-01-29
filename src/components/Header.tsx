import React from 'react'
import { Film, Search, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <div className='fixed top-0 inset-x-0 z-20 h-[59px] flex items-center justify-center'>
      <div className="flex gap-2 text-indigo-700">
        <Film />
        <span className="text-indigo-700 font-bold italic ">Movie Z</span>
      </div>
      <div className='flex items-center gap-x-3'>
      <Button variant="outline"><Search/> </Button>
      <Button variant="outline"><Sun/> </Button>
        
        
      </div>
    </div>
  )
}

export default Header;
