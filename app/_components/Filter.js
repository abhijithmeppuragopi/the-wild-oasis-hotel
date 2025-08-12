"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Filter() {
    const searchParams=useSearchParams();
    const router=useRouter();
    const pathname=usePathname();
    console.log(pathname,'path');
    

    function handleClick(filter){
        const params=new URLSearchParams(searchParams);
        params.set('capacity',filter);
        router.replace(`${pathname}?${params}`)
    }
  return (
    <div className='border border-primary-700'>
         <button className='px-3 hover:bg-primary-500 py-3' onClick={()=>handleClick('all')}>All</button>
        <button className='px-3 hover:bg-primary-500 py-3' onClick={()=>handleClick('small')}>1-3 guests</button>
        <button className='px-3 hover:bg-primary-500 py-3' onClick={()=>handleClick('medium')}>3-7 guests</button>
        <button className='px-3 hover:bg-primary-500 py-3' onClick={()=>handleClick('big')}>8 or more guests</button>
    </div>
  )
}
