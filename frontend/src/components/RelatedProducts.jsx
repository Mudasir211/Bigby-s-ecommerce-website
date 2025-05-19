import React, { useEffect, useState } from 'react'
import {products} from "../assets/frontend_assets/assets"
import { json, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetProductsQuery } from '../services/createApi'
import { useGetReviewsQuery } from '../services/createApi'
import { useParams } from 'react-router-dom';
function RelatedProducts({category}) {
    const {productId} = useParams()
    const { refetch } = useGetReviewsQuery(productId);
    const {isfetching,data=[]} = useGetProductsQuery()
    const productData = data
    if (isfetching){return <p>Loading</p>}


const [products,setProducts]=useState([...productData])
            const navigate = useNavigate()

            const applyRelatedProducts =()=>{
                if(products.length>0){
             let copyProducts =products.slice()
            copyProducts = copyProducts.filter((item)=>item.category.includes(category))
            setProducts(copyProducts)
           }
           
            }
           
           
           useEffect(() => {
             applyRelatedProducts()
           }, [category])
           
  return (
    <div className='flex flex-col items-center gap-10 mt-20 mb-20'>
          <div className='flex flex-col items-center gap-4'><h2 className='flex items-center gap-3 text-2xl md:text-3xl outfit'><span className='opacity-70'>RELATED </span>  PRODUCTS<span className='h-[2px] w-8 bg-black'></span></h2> 
        </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-5'>
             {
               products.map((item,i)=>{
    if (i<=4){
        return <div  onClick={async ()=>{await refetch();navigate(`/product/${item._id}`); window.scrollTo({ top: 0, behavior: 'smooth' });}} key={item._id} className='flex flex-col gap-2 text-xs cursor-pointer group'>
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

export default RelatedProducts
