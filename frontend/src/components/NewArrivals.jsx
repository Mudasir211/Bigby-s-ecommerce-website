import React from 'react'
import newArrivalsImg from "../assets/frontend_assets/hero_img.png"
function NewArrivals() {
  return (
    <div className='flex flex-col items-center mb-10 border border-gray-400 sm:flex-row'>
      <div className='flex flex-col justify-center gap-2 sm:items-center sm:w-1/2 my-9'>

      <div>
        <p className='flex items-center gap-4 text-sm outfit text-opacity-60'><span className='h-[2px] w-8 bg-black'></span>OUR BESTSELLERS</p>
        <h1 className='text-3xl md:text-5xl opacity-70 prata'>Latest Arrivals</h1>
        <p className='flex items-center gap-4 text-sm outfit text-opacity-90'>SHOP NOW<span className='h-[2px] w-8 bg-black'></span></p>
      </div></div>
      <img src={newArrivalsImg} className='sm:w-1/2' alt="" />
    </div>
  )
}

export default NewArrivals
