import { DomainVerification } from '@mui/icons-material'
import React from 'react'
import Men from "../assets/mens-collection.jpg"
import Women from "../assets/womens-collection.jpg"
function Sections() {
  return (
    <div className='w-[full]  flex gap-8 mx-28  h-[3.9%] my-8 '>



        <div className=' relative overflow-hidden group w-1/2 h-[100%]'><img src={Women} alt="" className='group-hover:scale-105 w-full h-full transition-all delay-50 group-hover:blur-[2px]'/><button className={`bg-[white] font-bold -bottom-20 opacity-0  group-hover:opacity-100 transition-all delay-100 group-hover:bottom-8 left-6 p-3 px-5 text-sm absolute`}>Women's collection
            <p className='text-xs font-normal underline text-opacity-85'>Explore Now</p>
            </button></div>
            
            <div className=' relative overflow-hidden group w-1/2 h-[100%]'><img src={Men} alt="" className='group-hover:scale-105 transition-all delay-50 group-hover:blur-[2px] w-full h-full'/><button className={`bg-[white] font-bold -bottom-20 opacity-0  group-hover:opacity-100 transition-all delay-100 group-hover:bottom-8 left-6 p-3 px-5 text-sm absolute`}>Men's collection
            <p className='text-xs font-normal underline text-opacity-85'>Explore Now</p>
            </button></div>
              
    </div>
  )
}

export default Sections
