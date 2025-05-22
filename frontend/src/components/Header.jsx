import React, { useState } from 'react'
import Logo from '../assets/Logo.png'


import Cart from "../assets/frontend_assets/cart_icon.png"
import Menu from "../assets/frontend_assets/menu_icon.png"

import MenuComponent from './MenuComponent'
import SearchIcon from "../assets/frontend_assets/search_icon.png"
import AccountIcon from  "../assets/frontend_assets/profile_icon.png"
import CrossIcon from "../assets/frontend_assets/cross_icon.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetCartQuery, useGetMeQuery, useLogoutMutation } from '../services/createApi'

function Header({showForm,setShowForm,setShowDropdown,showDropdown}) {
            const dummyCart = useSelector(state=>state.Slice.items)
    
    const { data : userData, isLoading, isError,isSuccess, refetch } = useGetMeQuery();
    const [logout]=useLogoutMutation()
    const navigate = useNavigate()
    const {data:cartData,isFetching} = useGetCartQuery()

    const [showMenu,setShowMenu] =useState(false)
    const cartTotal =()=>{ 
        if (isSuccess && !isFetching && Array.isArray(cartData)) {
            return cartData.reduce((sum, item) => {
              return sum +  Number(item.quantity);
            }, 0);
          }else{ return dummyCart.reduce((sum, item) => {
            return sum +  Number(item.quantity);
          }, 0);
          }
          return 0;
        }
       
    
  return (
    <>
    <div className={`py-7 border-b border-gray-400 flex justify-between relative items-center`} >
       
        <MenuComponent setShowMenu={setShowMenu} showMenu={showMenu?"left-0":"-left-[100%]"}/>
      <img onClick={()=>navigate('/')} src={Logo} className='h-6 cursor-pointer' alt="" />

    <div className='sm:flex text-sm  hidden gap-5 outfit [&>*]:opacity-90'> <NavLink to={'/'} className=''>HOME</NavLink> <NavLink to={'Collection'} className=''> COLLECTION</NavLink><NavLink to={'/About'} className=''>ABOUT</NavLink><NavLink to={'Contact'} className=''>CONTACT</NavLink></div>

     <div className='relative flex items-center gap-6 '>
     
      <button onClick={()=>{setShowForm(true);navigate('/collection')}} className={`w-5  h-5`}><img className='w-full h-full' src={SearchIcon} alt="" /></button>
      <button   onClick={() => {
    if (isLoading) return;

    if (isSuccess && userData?.user) {
      setShowDropdown(prev=>!prev);
    } else {
      navigate('/Login');
    }
  }} className='w-5 h-5 '><img className='w-full h-full ' src={ AccountIcon } alt="" />  </button>
      <button onClick={()=>navigate('/Cart')} className='relative w-5 h-5'> <img src={Cart} alt=""  className='w-full h-full'/> <span className='absolute -bottom-1.5 -right-1.5 text-white bg-black text-[8px] flex justify-center items-center w-3.5 h-3.5 rounded-full'>{cartTotal()}</span> </button>

      <button onClick={()=>setShowMenu(true)} className='w-5 sm:hidden h-3.5'><img className='w-full h-full' src={Menu} alt="" /></button>{showDropdown && userData?.user &&<div   className={`absolute flex z-50 flex-col gap-2 px-5 py-3 text-gray-500 rounded -bottom-32 outfit right-20 sm:right-10 w-36 bg-slate-100`}><p className="cursor-pointer hover:text-black">Source Code</p><p onClick={()=>navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p><p onClick={async ()=>{await localStorage.removeItem("token");window.location.reload()}} className="cursor-pointer hover:text-black">Logout</p></div>}</div>
    </div>
    
   
    </>
  )
}

export default Header
