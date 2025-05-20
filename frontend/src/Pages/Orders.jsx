import React from 'react'
import { useGetOrdersQuery } from '../services/createApi'
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function Orders() {
            const navigate = useNavigate()

    const {data,isFetching} =useGetOrdersQuery()
    const allOrderedItems = data?.flatMap(order =>
        order.ordersData.map(item => ({
          ...item,
          status: order.orderStatus,
           method:order.payment
        }))
      ) || [];
    
    
  return isFetching ? (<div className='flex items-center justify-center w-full my-14'>
    <Oval   visible={true}
  height="30"
  width="30"
  color="gray"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  strokeWidthSecondary={5}
  strokeWidth={5}/></div>) : (
    <div className="pt-16 border-t"><div className="text-2xl"><div className="inline-flex items-center gap-2 mb-3"><p className="text-gray-500">MY <span className="font-medium text-gray-700">ORDERS</span></p><p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p></div></div><div>
        
        
        {allOrderedItems && allOrderedItems.map((item,i)=>{

        return <div key={i} className="flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-6 text-sm"><img onClick={()=>navigate(`/product/${item.productId}`)} className="w-16 cursor-pointer sm:w-20" src={item.imgUrl} alt=""/><div><p className="font-medium sm:text-base">{item.name}</p><div className="flex items-center gap-3 mt-1 text-base text-gray-700"><p>${item.price}</p><p>Quantity: {item.quantity}</p><p>Size: {item.size}</p></div><p className="mt-1">Date: <span className="text-gray-400 ">{item.createdAt?.slice(0,10)}</span></p><p className="mt-1">Payment: <span className="text-gray-400 ">{item.method}</span></p></div></div><div className="flex justify-between md:w-1/2"><div className="flex items-center gap-2"><p className="h-2 bg-green-500 rounded-full min-w-2"></p><p className="text-sm md:text-base">{item.status}</p></div><button className="px-4 py-2 text-sm font-medium border rounded-sm">Track Order</button></div></div>
        


        })}
        
        
        
        
        
        </div></div>
  )
}

export default Orders
