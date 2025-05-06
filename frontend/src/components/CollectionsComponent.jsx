import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CollectionsComponent({products,setSortType}) {
    const navigate = useNavigate()
    
    const [prodData,setProdData] = useState([])
    useEffect(() => {
      setProdData(products)
    }, [products])
    
  return  (
    <div className='relative flex flex-col items-center gap-10 my-20'> 
    <select onChange={(e)=>setSortType(e.target.value)} className="absolute right-0 px-2 py-3 text-sm border-2 border-gray-300 outline-none lg::-top-8 -top-16"><option value="relavent">Sort by: Relavent</option><option value="low-high">Sort by: Low to High</option><option value="high-low">Sort by: High to Low</option></select>
          <div className='flex flex-col items-center gap-4'><h2 className='flex items-center gap-3 text-2xl md:text-3xl outfit'><span className='opacity-70'>ALL </span>  COLLECTIONS<span className='h-[2px] w-8 bg-black'></span></h2> 
        </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-5'>
             {
             prodData.length>0 &&  prodData.map((item,i)=>{
    
        return <div  onClick={()=>navigate(`/product/${item._id}`)} key={item._id} className='flex flex-col gap-2 text-xs cursor-pointer group'>
       <div className='overflow-hidden'><img src={item.image[0] ||item.image[1] ||item.image[2] } className='transition-all delay-50 group-hover:scale-110' alt="" /></div>
       <div className=' [&>p]:opacity-70 flex flex-col gap-1 px-2'><p className=''>{item.name}</p>
       <p className='font-bold'>${item.price}</p></div>
       
       </div>
    
    
       
       
               })
             }
           </div>
        </div>
  ) 
}

export default CollectionsComponent
