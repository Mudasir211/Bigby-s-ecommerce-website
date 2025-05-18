import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Category } from '@mui/icons-material'
function Filters({setCategory,setSubCategory,subCategory,category}) {
    const [filter,setFilter]=useState(false)
    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter((item)=>item!==e.target.value))
        }else {
            setCategory(prev=>[...prev,e.target.value])
        }
    }
    const toggleSubCategory = (e)=>{
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=>prev.filter((item)=>item!==e.target.value))
        }else {
            setSubCategory(prev=>[...prev,e.target.value])
        }
    }
  return (
    <div><button onClick={()=>setFilter(p=>!p)} className='flex items-center gap-2 my-5 text-xl'>FILTERS<img className={`h-3 sm:hidden ${filter&&'rotate-90'}`} src={assets.dropdown_icon}/></button>
    <div className={`sm:flex ${filter?'flex':'hidden'} flex-col gap-4`}>
      <div className='flex flex-col gap-3 p-6 py-3 text-sm border border-gray-400 rounded-sm md:pr-24 opacity-80 '>
        <h1 className='font-bold'>CATEGORIES</h1>
        <label className='flex items-center gap-2' htmlFor="">
            <input onChange={toggleCategory} type="checkbox" value={'Men'} /> Men </label>
            <label className='flex items-center gap-2' htmlFor="">
            <input onChange={toggleCategory} type="checkbox" value={'Women'} /> Women </label>
            <label className='flex items-center gap-2' htmlFor="">
            <input onChange={toggleCategory} type="checkbox"  value={'Kids'}/> Kids </label>

      </div>
      <div className='flex flex-col gap-3 p-6 py-3 text-sm border border-gray-400 rounded-sm opacity-80 '>
<h1 className='font-bold'>TYPE</h1>

        <label className='flex items-center gap-2' htmlFor="">
            <input type="checkbox" onChange={toggleSubCategory} value={'Topwear'}/> Topwear </label>
            <label className='flex items-center gap-2' htmlFor="">
            <input type="checkbox" onChange={toggleSubCategory}  value={'Bottomwear'}/> Bottomwear </label>
            <label className='flex items-center gap-2' htmlFor="">
            <input type="checkbox" onChange={toggleSubCategory}  value={'Winterwear'}/> Winterwear </label>

      </div>
    </div></div>
  )
}

export default Filters
