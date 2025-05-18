import React, { useEffect, useState } from 'react'
import { useDeleteProductMutation, useGetProductsQuery } from '../services/createApi'
import { toast, ToastContainer } from 'react-toastify'
import { assets } from '../assets/frontend_assets/assets'
import { Oval } from 'react-loader-spinner'

function ListItems() {
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
        const [deleteProduct,{isSuccess,isError,error}] =useDeleteProductMutation()
    
    const {data,isFetching,refetch} =useGetProductsQuery()
     useEffect(() => {
                        if (isError && error) {
                          notify('error',error?.data.message)
                          
                        }else if (isSuccess){
                            notify('success','Item removed Successfully') 
                            
                           }
                      }, [isError, error,isSuccess]);



const handleDelete = (i,id)=>{
if(i>51){
    deleteProduct(id);refetch()
}else{
    notify('error','You are not allowed to delete the products added by other admins')
}

}


  return (
    <>
      <div className=" sm:mx-auto sm:ml-[max(5vw,25px)] sm:my-8 text-gray-600 text-base"><p className="mb-2">All Products List</p>
      
      <div className="flex flex-col gap-2">
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm"><b>Image</b><b>Name</b><b>Category</b><b>Price</b><b className="text-center">Action</b></div>

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
  
   { data &&  data.map((item,i)=>{
  return <div key={item._id} className="grid relative grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"><img className="w-12" src={item.image[0]} alt=""/><p className='text-xs sm:text-base'>{item.name}</p><p className='text-xs text-center sm:text-start sm:text-base'>{item.category}</p><p className='text-xs sm:text-base'>${item.price}</p><button className='absolute right-0 bottom-3 sm:bottom-6 lg:right-8 xl:right-11 md:right-5' onClick={()=>handleDelete(i,item._id)}><img className="w-4 mr-4 cursor-pointer sm:w-4" src={assets.bin_icon} alt=""/></button></div>

  })
      
}
      </div>
      </div></>
    
  )
}

export default ListItems
