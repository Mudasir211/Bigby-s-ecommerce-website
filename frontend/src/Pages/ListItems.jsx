import React, { useEffect, useState } from 'react'
import { useDeleteProductMutation, useGetProductsQuery } from '../services/createApi'
import { toast, ToastContainer } from 'react-toastify'

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
    <><ToastContainer position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
     />
      <div className=" mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base"><p className="mb-2">All Products List</p>
      
      <div className="flex flex-col gap-2">
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm"><b>Image</b><b>Name</b><b>Category</b><b>Price</b><b className="text-center">Action</b></div>

  {isFetching && <p>Loading...</p>}
  
   { data &&  data.map((item,i)=>{
  return <div key={item._id} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"><img className="w-12" src={item.image[0]} alt=""/><p>{item.name}</p><p>{item.category}</p><p>${item.price}</p><p onClick={()=>{handleDelete(i,item._id)}} className="text-lg text-right cursor-pointer md:text-center">X</p></div>

  })
      
}
      </div>
      </div></>
    
  )
}

export default ListItems
