
import { Cancel } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assets } from '../assets/frontend_assets/assets'
import { actions } from '../services/slice'
import { useGetCartQuery, useGetMeQuery, useRemovefromCartMutation, useUpdateCartMutation } from '../services/createApi'
import { useNavigate } from 'react-router-dom'


function CartComponent({showCart,setShowCart}) {
    

const {data:userData,isSuccess} =useGetMeQuery()
        const dummyCart = useSelector(state=>state.Slice.items)
    
    const navigate = useNavigate()
    const {data,isFetching} = useGetCartQuery()
    const [removefromCart] =useRemovefromCartMutation()
 const [updateCart] =  useUpdateCartMutation()
    const dispatch =useDispatch()
    const cart = data ?? []
    const deleteItem = (itemId)=>{
if (isSuccess){
    removefromCart(itemId)

}else{
dispatch(actions.removeItem(itemId))
}

    }
    const updateItem = (itemId,quantity)=>{
  if (isSuccess){
    quantity >0 && updateCart({itemId,quantity})

  }else{
    dispatch(actions.updateItemQuantity({itemId,quantity}))

  }
    }
    const subtotal =()=>{ 
        if (isSuccess && !isFetching && Array.isArray(cart)) {
            return cart.reduce((sum, item) => {
              return sum + Number(item.price) * Number(item.quantity);
            }, 0);
          }else{
            return dummyCart.reduce((sum, item) => {
                return sum + Number(item.price) * Number(item.quantity);
              }, 0);
          }
          return 0;
        }
    useEffect(() => {
           
            window.sessionStorage.setItem("items",JSON.stringify(dummyCart))
            }, [dummyCart])
        
  return (
    <div >
    <div className="border-t pt-14"><div className="mb-3 text-2xl "><div className="inline-flex items-center gap-2 mb-3"><p className="text-gray-500">YOUR <span className="font-medium text-gray-700">CART</span></p><p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p></div></div>
    
    
    <div className=''>
{ isSuccess && !isFetching && Array.isArray(cart) &&  cart.map((item,i)=>{
return <div key={i} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"><div className="flex items-start gap-6 "><button  onClick={()=>navigate(`/product/${item.productId}`)}><img className="w-16 sm:w-20" src={item.imgUrl} alt=""/></button><div><p className="text-xs font-medium sm:text-lg">{item.name}</p><div className="flex items-center gap-5 mt-2"><p>${item.price}</p><p className="px-2 border sm:px-3 sm:py-1 bg-slate-50">{item.size}</p></div></div></div><div className='flex'><button onClick={()=>updateItem(item._id,Number(item.quantity)+1)} className='p-1.5 font-bold text-white bg-black'>+</button><input className="px-1 py-1 text-center border max-w-10 sm:max-w-20 sm:px-2" type="number" min={'1'} disabled value={item.quantity}/><button onClick={()=>updateItem(item._id,Number(item.quantity)-1)} className='p-2 font-bold text-white bg-black'>-</button></div><button onClick={()=>deleteItem(item._id)}><img className="w-4 mr-4 cursor-pointer sm:w-5" src={assets.bin_icon} alt=""/></button></div>})}



{ !isSuccess && dummyCart &&  dummyCart.map((item,i)=>{
return <div key={i} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"><div className="flex items-start gap-6 "><button  onClick={()=>navigate(`/product/${item.productId}`)}><img className="w-16 sm:w-20" src={item.imgUrl} alt=""/></button><div><p className="text-xs font-medium sm:text-lg">{item.name}</p><div className="flex items-center gap-5 mt-2"><p>${item.price}</p><p className="px-2 border sm:px-3 sm:py-1 bg-slate-50">{item.size}</p></div></div></div><div className='flex'><button onClick={()=>updateItem(item._id,Number(item.quantity)+1)} className='p-1.5 font-bold text-white bg-black'>+</button><input className="px-1 py-1 text-center border max-w-10 sm:max-w-20 sm:px-2" type="number" min={'1'} disabled value={item.quantity}/><button onClick={()=>updateItem(item._id,Number(item.quantity)-1)} className='p-2 font-bold text-white bg-black'>-</button></div><button onClick={()=>deleteItem(item._id)}><img className="w-4 mr-4 cursor-pointer sm:w-5" src={assets.bin_icon} alt=""/></button></div>})}







    </div>
    
    
    <div className="flex justify-end my-20"><div className="w-full sm:w-[450px]"><div className="w-full"><div className="text-2xl"><div className="inline-flex items-center gap-2 mb-3"><p className="text-gray-500">CART <span className="font-medium text-gray-700">TOTALS</span></p><p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p></div></div><div className="flex flex-col gap-2 mt-2 text-sm"><div className="flex justify-between"><p>Subtotal</p><p>${subtotal().toFixed(2)}</p></div><hr/><div className="flex justify-between"><p>Shipping Fee</p><p>{dummyCart && dummyCart.length>0 || cart && cart.length>0?"$10.00":"$0.00" }</p></div><hr/><div className="flex justify-between"><b>Total</b><b>${(subtotal() + ((dummyCart && dummyCart.length>0 || cart && cart.length>0) ? 10 : 0)).toFixed(2)}</b></div></div></div><div className="w-full text-end"><button onClick={()=>{navigate('/place-order');dispatch(actions.addOrderItem({}))}} disabled={cart.length<=0 && dummyCart.length<=0} className="px-8 py-3 my-8 text-sm text-white bg-black disabled:opacity-50 disabled:cursor-not-allowed">PROCEED TO CHECKOUT</button></div></div></div></div>
    </div>
  )
}

export default CartComponent
