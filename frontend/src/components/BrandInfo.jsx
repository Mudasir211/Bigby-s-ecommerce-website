import React from 'react'
import {assets} from "../assets/frontend_assets/assets"
function BrandInfo() {
  return (
    <div className='flex flex-col items-center mb-20 text-xs md:text-base sm:justify-center sm:flex-row md:gap-32 lg:gap-40 sm:gap-28 gap-14'>
      <div className="flex flex-col items-center gap-1">
        <img className='w-12 h-12' src={assets.exchange_icon} alt="" />
<p className='font-semibold'>Easy Exchange Policy</p>
<p className='text-center opacity-65'>We offer hasle free exchange policy</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <img className='w-12 h-12' src={assets.quality_icon} alt="" />
<p className='font-semibold'>7 Days Return Policy</p>
<p className='text-center opacity-65'>We provide 7 days free policy</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <img className='w-12 h-12' src={assets.support_img} alt="" />
<p className='font-semibold'>Best Customer Support</p>
<p className='text-center opacity-65'>We provide 24/7  customer support</p>
      </div>
    </div>
  )
}

export default BrandInfo 
