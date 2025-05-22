import { Cancel } from '@mui/icons-material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'

function MenuComponent({showMenu,setShowMenu}) {
  return (
     <div className={`fixed bg-[White] sm:hidden w-[100%] top-0 ${showMenu} transition-all delay-0 z-40 h-[100vh]`}>
         <button onClick={()=>setShowMenu(false)} className='absolute text-white right-5 top-5 '> <img src={assets.cross_icon} className='w-4 h-4' alt="" /> </button>

         <div className='flex  p-5 py-10 text-xl  flex-col gap-5 outfit [&>*]:opacity-80'> <NavLink onClick={()=>setShowMenu(false)} to={'/'} className=''>HOME</NavLink> <NavLink onClick={()=>setShowMenu(false)} to={'/Collection'} className=''> COLLECTION</NavLink><NavLink onClick={()=>setShowMenu(false)} to={'/orders'} className=''>CONTACT</NavLink><NavLink  onClick={()=>setShowMenu(false)} to={'/About'} className=''>ABOUT</NavLink><NavLink onClick={()=>setShowMenu(false)} to={'/Contact'} className=''>CONTACT</NavLink></div>
       </div>
  )
}

export default MenuComponent
