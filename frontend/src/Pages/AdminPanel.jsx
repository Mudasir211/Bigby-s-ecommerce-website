import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'
import AddProduct from './AddProduct'
import ListItems from './ListItems'
import AdminOrders from './AdminOrders'
import { useAdminLogoutMutation, useGetAdminQuery } from '../services/createApi'
import AdminLogin from './AdminLogin'
import { ToastContainer } from 'react-toastify'
function AdminPanel() {
    const [adminLogout] =useAdminLogoutMutation()
    const [render,setrender] =useState(<AddProduct/>)
    const [active,setActive] =useState(1)
    const {data,isFetching,isSuccess,refetch} =useGetAdminQuery()
    const logout = async()=>{
        try {
            await adminLogout()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
  return isSuccess ? (
    <>  
    <div className="min-h-screen bg-gray-50"><div className="Toastify"></div><div className="flex items-center py-2 px-[4%] justify-between"><img className="w-[max(10%,80px)]" src={Logo} alt=""/><button onClick={async ()=>{await localStorage.removeItem("adminToken");window.location.reload()}} className="px-5 py-2 text-xs text-white bg-gray-600 rounded-full sm:px-7 sm:py-2 sm:text-sm">Logout</button></div><hr/><div className="flex w-full"><div className="w-[18%] min-h-screen border-r-2"><div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]"><button  onClick={()=>{setrender(<AddProduct/>);setActive(1)}} className={`flex ${active===1 ?  ' bg-[#ffebf5] border-[#c586a5] ': 'border-gray-300'}items-center gap-3 px-3 py-2 border border-r-0 rounded-l`} ><img className="w-5 h-5" src={assets.add_icon} alt=""/><p className="hidden md:block">Add Items</p></button><button  onClick={()=>{setrender(<ListItems/>);setActive(2)}} className={`flex ${active===2 ?  ' bg-[#ffebf5] border-[#c586a5] ': 'border-gray-300'}items-center gap-3 px-3 py-2 border border-r-0 rounded-l`}><img className="w-5 h-5" src={assets.order_icon} alt=""/><p className="hidden md:block">List Items</p></button><button  onClick={()=>{setrender(<AdminOrders/>);setActive(3)}} className={`flex ${active===3 ?  ' bg-[#ffebf5] border-[#c586a5] ': 'border-gray-300'}items-center gap-3 px-3 py-2 border border-r-0 rounded-l`} href="/orders"><img className="w-5 h-5" src={assets.order_icon} alt=""/><p className="hidden md:block">Orders</p></button></div></div><div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">{render}</div></div></div></>
  ) : <AdminLogin/>
}

export default AdminPanel
