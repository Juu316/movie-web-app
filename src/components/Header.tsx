import React from 'react'
import { Film } from 'lucide-react';
const Header = () => {
  return (
    <div>
      <div className="flex gap-2 text-indigo-700">
        <Film />
        <span className="text-indigo-700 ">Movie Z</span>
      </div>
    </div>
  )
}

export default Header
