import React from 'react'
import {products} from "../assets/frontend_assets/assets"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetProductsQuery } from '../services/createApi'

function LatestCollection() {
        const navigate = useNavigate()
            const {isfetching,data=[]} = useGetProductsQuery()
        
const productData = data
if (isfetching){return <p>Loading</p>}
    
  return (
    <div className='flex flex-col items-center gap-10 mb-20'>
      <div className='flex flex-col items-center gap-4'><h2 className='flex items-center gap-3 text-2xl md:text-3xl outfit'><span className='opacity-70'>LATEST </span>  COLLECTIONS<span className='h-[2px] w-8 bg-black'></span></h2> <p className='opacity-70'>explore our latest collections!</p>
    </div>
   <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-5'>
         {
           productData.map((item,i)=>{
if (i<=9){
    return <div  onClick={()=>navigate(`/product/${item._id}`)} key={item._id} className='flex flex-col gap-2 text-xs cursor-pointer group'>
       <div className='overflow-hidden'><img src={item.image[0] ||item.image[1] ||item.image[2] } className='transition-all delay-50 group-hover:scale-110' alt="" /></div>
   <div className=' [&>p]:opacity-70 flex flex-col gap-1 px-2'><p className=''>{item.name}</p>
   <p className='font-bold'>${item.price}</p></div>
   
   </div>
}

   
   
           })
         }
       </div>
    </div>
  )
}

export default LatestCollection
