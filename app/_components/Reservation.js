import React from 'react'
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

export default async function Reservation({cabin}) {
    const settings=await getSettings();
    const bookedDates=await getBookedDatesByCabinId(cabin.id);
  return (
    <div className="grid grid-cols-2">   
        <DateSelector settings={settings} cabin={cabin} bookedDates={bookedDates}/>
        <ReservationForm cabin={cabin}/>
        </div>
  )
}
