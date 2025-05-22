import React, { useState } from 'react'
import StarRating from './StarRating'
import { useAddReviewMutation, useDeleteReviewMutation, useGetMeQuery } from '../services/createApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Stars from './Stars';
import editIcon from "../assets/frontend_assets/editIcon.png"
import {assets} from "../assets/frontend_assets/assets"
function AddReview({colorMapping,reviews,timeAgo,refetch}) {
    const [addReview] =useAddReviewMutation()
    const [reviewTitle,setReviewTitle] = useState('')
    const [reviewDesc,setReviewDesc] = useState('')
  const [rating,setRating] = useState(5)

        const {productId} = useParams()
    const [deleteReview] =useDeleteReviewMutation()
    
       const { data : userData, isLoading, isError,isSuccess, } = useGetMeQuery();
       const userReview =isSuccess && reviews.find(item=>item.userId === userData.user.userId)
    const [edit,setEdit] =useState(false)

       useEffect(() => {
        if (userReview){
setRating(userReview.rating)
         setReviewDesc(userReview.reviewDesc)
         setReviewTitle(userReview.reviewTitle)
        }
         
       }, [userReview])
       
      
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        
    };
 
  const   handleSubmit = (e)=>{
e.preventDefault()
addReview({
    prodId : productId,
    userName : userData.user.name,
      reviewTitle,
      reviewDesc,
      rating,
    

})

  }
  const showAddReview = (!userReview && !edit) ? true : false
  return (
    <div>
        {isError && <p className='text-center text-red-600'>You must Login to give reviews</p>}
     {
       userReview && !edit && isSuccess && (<div 
                     
                     className="relative w-full p-3 py-5 space-y-6 bg-white border rounded-xl"
                   >
                     <div className="flex items-center gap-2 space-y-1">
                       <div
                         className={`flex items-center justify-center w-8 h-8 text-white ${
                           colorMapping[userReview.userName[0]?.toUpperCase()] || 'bg-gray-400'
                         } rounded-full`}
                       >
                         {userReview.userName[0]?.toUpperCase()}
                       </div>
                       <div className="flex flex-col">
                         <h1>{userReview?.userName}</h1>
                         <span className="text-[10px] opacity-70">
                           {timeAgo(userReview?.createdAt)}
                         </span>
                       </div>
                     </div>
                     <Stars rating={userReview?.rating} />
                     <h1 className="font-semibold text-">{userReview.reviewTitle}</h1>
                     <p className="break-words text-">{userReview?.reviewDesc}</p>
                     <button className='absolute top-0 right-4' onClick={()=>setEdit(true)}><img className='w-5 h-5' src={editIcon}/></button><button className='absolute top-0 right-12' onClick={async ()=>{await deleteReview(productId);refetch()}}><img className='w-5 h-5' src={assets.bin_icon}/></button>
                   </div>)}



     {(edit || showAddReview) && isSuccess && (<div  className='relative w-full p-3 space-y-4 bg-white border-2 rounded-xl'> <div className="flex items-center gap-2 space-y-1"><div className={`flex items-center justify-center w-8 h-8 text-white ${colorMapping[Array.from(userData.user.name)[0].toUpperCase()]} rounded-full`}>{Array.from(userData.user.name)[0].toUpperCase()}</div><div className='flex flex-col'><h1 className='capitalize'>{userData.user.name}</h1></div></div> <form onSubmit={handleSubmit} action="" className='space-y-4 '><StarRating rating={rating} onRatingChange={handleRatingChange}/> <input   value={reviewTitle} onChange={(e)=>setReviewTitle(e.target.value)} type="text" className='p-2 border-2 outline-none' placeholder='Title' /> <textarea value={reviewDesc}  onChange={(e)=>setReviewDesc(e.target.value)}  name="" className='w-full p-2 border-2 outline-none' placeholder='Description' id=""></textarea><div className='flex justify-end w-full'><button className='bottom-0 right-0 p-2 px-12 text-white bg-black '>{userReview?"Update":"Add"}</button></div></form>{edit && <button onClick={()=>setEdit(false)} className='absolute top-0 right-4'><img src={assets.cross_icon} alt="" className='w-5 h-5' /></button>}</div>)  }
    </div>
  )
}

export default AddReview
