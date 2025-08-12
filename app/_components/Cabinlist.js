import React from 'react'
import CabinCard from './CabinCard';
import { getCabins } from '../_lib/data-service';

export default async function Cabinlist({filter}) {
    const cabins = await getCabins();
    let displayedCabins;
    if(filter==='all') displayedCabins=cabins;
    if(filter==='small') 
      displayedCabins=cabins.filter(cabin=> cabin.maxCapacity <=3)
    if(filter==='medium') 
      displayedCabins=cabins.filter(cabin=> cabin.maxCapacity >=4 && cabin.maxCapacity <=8)
    if(filter==='big') 
      displayedCabins=cabins.filter(cabin=> cabin.maxCapacity >8)


    if(cabins.length <0) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
    {displayedCabins.map((cabin) => (
      <CabinCard cabin={cabin} key={cabin.id} />
    ))}
  </div>
  )
}
