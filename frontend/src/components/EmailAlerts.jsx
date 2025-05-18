import React from 'react'

function EmailAlerts() {
  return (
    <div className='flex flex-col items-center gap-5 mb-32'>
      <h2 className='text-2xl font-semibold opacity-90 outfit'>Subscribe now & get 20% off </h2>
      <p className='text-sm opacity-65'>subcribe now to get latest updates about our products</p>
      <form onSubmit={(e)=>e.preventDefault()} className='flex w-full h-12 border border-gray-400 sm:w-1/2' action=""><input placeholder='Enter your email id' className='w-full h-full px-2 outline-none' type="email" /><button className='p-3 px-8 text-xs text-white bg-black'>SUBSCRIBE</button></form>
    </div>
  )
}
 
export default EmailAlerts
