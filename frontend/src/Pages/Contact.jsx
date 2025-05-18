import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Contact() {
  return (
    <div>
      <div><div className="pt-10 text-2xl text-center border-t"><div className="inline-flex items-center gap-2 mb-3"><p className="text-gray-500">CONTACT <span className="font-medium text-gray-700">US</span></p><p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p></div></div><div className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-28"><img className="w-full md:max-w-[480px]" src={assets.contact_img} alt=""/><div className="flex flex-col items-start justify-center gap-6"><p className="text-xl font-semibold text-gray-600">Our Store</p><p className="text-gray-500 ">54709 Willms Station <br/> Suite 350, Washington, USA (dummy)</p><p className="text-gray-500 ">Tel: (415) 555-0132 (dummy)<br/> Email: mudasir8482289@gmail.com</p><p className="text-xl font-semibold text-gray-600">Careers at Bigby's</p><p className="text-gray-500 ">Learn more about our teams and job openings.</p><button className="px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-black hover:text-white">Explore Jobs</button></div></div><div className="text-center "><p className="text-2xl font-medium text-gray-800">Subscribe now &amp; get 20% off</p><p className="mt-3 text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p><form onSubmit={(e)=>e.preventDefault()} className="flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2"><input className="w-full outline-none sm:flex-1" type="email" placeholder="Enter your email" required=""/><button type="submit" className="px-10 py-4 text-xs text-white bg-black">SUBSCRIBE</button></form></div></div>
    </div>
  )
}

export default Contact
