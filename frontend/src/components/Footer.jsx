import React from 'react'

import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
    <div className='flex flex-col gap-12 mt-20 mb-5 text-sm sm:gap-32 sm:flex-row outfit'>

        <div className='flex flex-col gap-6 '><img src={Logo} className='h-7 w-36' alt="" />
      <p className='opacity-85'>Get all types of top wear,bottom wear and foot wear on bigby's with the best customer services and regular updates and easy payment methods</p></div>
      
      <div className='flex flex-col gap-2 outfit [&>*]:opacity-90'> <h1 className='text-xl font-semibold'>COMPANY</h1> <Link className=''>Home</Link> <Link className=''>About us</Link><Link className=''>Delivery</Link><Link className=''>Privacy Policy</Link></div>
      <div className='flex flex-col outfit gap-2 [&>*]:opacity-90'> <h1 className='text-xl font-semibold'>GET IN TOUCH</h1><p className='outfit'>(415) 555-0132 (dummy) </p>
      <span>@mudasir8482289@gmail.com</span>
      </div>
      
     
    </div> <div className='py-3 text-xs text-center border-t border-black opacity-85 outfit'>Copyright 2025 © Mudasir Ahmed - All Rights Reserved</div></>
  )
}

export default Footer 
