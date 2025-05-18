import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useAddOrderMutation, useGetCartQuery, useGetMeQuery } from '../services/createApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

function PlaceOrder() {
  const notify = (type, message) => {
                if (type === 'error') {
                  toast.error(message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  })
                } else if (type === 'success') {
                  toast.success(message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  })
                }
              }
const {data:userData,isSuccess : loggedIn} =useGetMeQuery()
        const dummyCart = useSelector(state=>state.Slice.items)
    
   
    const {data,isFetching,refetch} = useGetCartQuery()
    const subtotal =()=>{ 
        if (loggedIn && !isFetching && Array.isArray(data)) {
            return data.reduce((sum, item) => {
              return sum + Number(item.price) * Number(item.quantity);
            }, 0);
          }else{
            return dummyCart.reduce((sum, item) => {
                return sum + Number(item.price) * Number(item.quantity);
              }, 0);
          }
          return 0;
        }
    const navigate = useNavigate()
   const [addOrder,{isSuccess}] = useAddOrderMutation()
   const [values,setvalues] =useState({fName : '',
    lName : '',
    email : '',
    address : '',
    city : '',
    state : '',
    zipcode : '',
    country : '',
    phone : '',
    orderStatus : 'Order Placed',
    total : subtotal() + 10,
    payment : 'COD'

})
    const handleSubmit =async (e)=>{
e.preventDefault()
try {
    if (loggedIn && data && data.length>0){
         await addOrder(values)
         refetch()
         navigate('/orders')

    }else if (!loggedIn){
        notify('error',"You must Login to place orders")
    }else{
        
            notify('error',"No items in the cart to order")
        
    }
  
} catch (error) {
    console.log(error)
}
    }
  return (
    <>
   
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"><div className="flex flex-col gap-4 w-full sm:max-w-[480px]"><div className="my-3 text-xl sm:text-2xl"><div className="inline-flex items-center gap-2 mb-3"><p className="text-gray-500">DELIVERY <span className="font-medium text-gray-700">INFORMATION</span></p><p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p></div></div><div className="flex gap-3"><input required name="firstName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" onChange={(e)=>setvalues(prev=>({...prev,fName:e.target.value}))} value={values.fName}/><input onChange={(e)=>setvalues(prev=>({...prev,lName:e.target.value}))} value={values.lName} required name="lastName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" /></div><input required name="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" onChange={(e)=>setvalues(prev=>({...prev,email:e.target.value}))} value={values.email}/><input required name="street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" onChange={(e)=>setvalues(prev=>({...prev,address:e.target.value}))} value={values.address}/><div className="flex gap-3"><input required name="city" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" onChange={(e)=>setvalues(prev=>({...prev,city:e.target.value}))} value={values.city}/><input name="state" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" required placeholder="State" onChange={(e)=>setvalues(prev=>({...prev,state:e.target.value}))} value={values.state}/></div><div className="flex gap-3"><input required name="zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" onChange={(e)=>setvalues(prev=>({...prev,zipcode:Number(e.target.value)}))} value={values.zipcode}/><input required name="country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" onChange={(e)=>setvalues(prev=>({...prev,country:e.target.value}))} value={values.country}/></div><input required name="phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" onChange={(e)=>setvalues(prev=>
    ({...prev,phone:Number(e.target.value)}))} value={values.phone}/></div><div className="mt-8"><div className="mt-8 min-w-80"><div className="w-full"><div className="text-2xl"><div className="inline-flex items-center gap-2 mb-3"><p className="text-gray-500">CART <span className="font-medium text-gray-700">TOTALS</span></p><p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p></div></div><div className="flex flex-col gap-2 mt-2 text-sm"><div className="flex justify-between"><p>Subtotal</p><p>${subtotal().toFixed(2)}</p></div><hr/><div className="flex justify-between"><p>Shipping Fee</p><p>{data && data.length>0?"$10.00":"$0.00" }</p></div><hr/><div className="flex justify-between"><b>Total</b><b>$ {(subtotal() + 10).toFixed(2)}</b></div></div></div></div><div className="mt-12"><div className="inline-flex items-center gap-2 mb-3"><p className="text-gray-500">PAYMENT <span className="font-medium text-gray-700">METHOD</span></p><p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p></div><div className="flex flex-col gap-3 "><div onClick={(e)=>setvalues(prev=>({...prev,payment:"Stripe"}))}  className="flex items-center gap-3 p-2 px-3 border cursor-pointer"><p className={`min-w-3.5 h-3.5  border rounded-full ${values.payment==='Stripe'&&'bg-green-400'} `}></p><img className="h-5 mx-4 " src={assets.stripe_logo}alt=""/></div><div onClick={(e)=>setvalues(prev=>({...prev,payment:"Razorpay"}))} className="flex items-center gap-3 p-2 px-3 border cursor-pointer"><p className={`min-w-3.5 h-3.5 border rounded-full ${values.payment==='Razorpay'&&'bg-green-400'} `}></p><img className="h-5 mx-4" src={assets.razorpay_logo} alt=""/></div><div className="flex items-center gap-3 p-2 px-3 border cursor-pointer"  onClick={(e)=>setvalues(prev=>({...prev,payment:"COD"}))}><p className={`min-w-3.5 h-3.5 border rounded-full ${values.payment==='COD'&&'bg-green-400'} `}></p><p className="mx-4 text-sm font-medium text-gray-500">CASH ON DELIVERY</p></div></div><div className="w-full mt-8 text-end"><button type="submit" className="px-16 py-3 text-sm text-white bg-black">PLACE ORDER</button></div></div></div></form></>
  )
}

export default PlaceOrder
