import React from 'react'
import eStar from "../assets/emptystar.png"
import fStar from "../assets/fullstar.png"
import hStar from "../assets/halfstar.png"
function AverageStars({averageRating}) {
    const ratingStar = Array.from({length:5},(_,index)=>{
        let number = index + 0.5
        return(
            <span key={index}>
            {
                averageRating >= index + 1 ? <img src={fStar} className='w-4 h-4' alt="" /> : averageRating >= number ? <img src={hStar} className='w-4 h-4' alt="" />: <img src={eStar} className='w-4 h-4' alt="" />
            }

            </span>
        )
    })
  return (
    <div className='flex gap-1'>
  {ratingStar}
    </div>
  )
}

export default AverageStars
