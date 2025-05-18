import React from 'react'
import { useAdminChangeOrderStatusMutation, useGetAdminOrdersQuery, } from '../services/createApi'
import {assets} from "../assets/admin_assets/assets"
import { Oval } from 'react-loader-spinner'
function AdminOrders() {
        const [adminChangeOrderStatus,{isSuccess}] =useAdminChangeOrderStatusMutation()
        const {data,isFetching} =useGetAdminOrdersQuery()
        
    const changeStatus =async (orderId, newStatus)=>{
try {
   await adminChangeOrderStatus({orderId,newStatus})
} catch (error) {
    
}
    }
  return (
    <div className=" sm:mx-auto sm:ml-[max(5vw,25px)] sm:my-8 text-gray-600 text-base"><div><h3>Order Page</h3></div><div>
        {isFetching && <div className='flex items-center justify-center w-full my-14'>
              <Oval   visible={true}
            height="30"
            width="30"
            color="gray"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            strokeWidthSecondary={5}
            strokeWidth={5}/></div>}
{data && data.map((item,i)=>{
    return <div key={i} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"><img className="w-12" src={assets.parcel_icon} alt=""/><div><div> {item.ordersData.map((order,index)=>{
        return <p key={index} className="py-0.5"> {order.name} x {order.quantity} <span> {order.size} </span></p>
    })} </div><p className="mt-3 mb-2 font-medium">{item.fName} {item.lName}</p><div><p>{item.address},</p><p>{item.city}, {item.state}, {item.country}, {item.zipcode}</p></div></div><div><p className="text-sm sm:text-[15px]">Items : {item.ordersData.length}</p><p className="mt-3">Method : {item.payment}</p><p>Payment : Pending</p><p>Date : {item.createdAt.slice(0,10)}</p></div><p className="text-sm sm:text-[15px]">${item.total}</p><select onChange={(e)=>changeStatus(item._id,e.target.value)} className="p-2 font-semibold"><option value="Order Placed">Order Placed</option><option value="Packing">Packing</option><option value="Shipped">Shipped</option><option value="Out for delivery">Out for delivery</option><option value="Delivered">Delivered</option></select></div>
        
})}

        
        
        
        
        </div></div>
  )
}

export default AdminOrders 