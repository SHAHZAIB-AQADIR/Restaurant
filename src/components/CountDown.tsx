// WITH A LIBRARY
"use client"
import React, { useState, useEffect } from 'react'
import Countdown from 'react-countdown'

const CountDown = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [endingDate, setEndingDate] = useState<Date | null>(null);

  useEffect(() => {
    // Set the date only on client side to prevent hydration mismatch
    setEndingDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    setIsHydrated(true);
  }, []);

  if (!isHydrated || !endingDate) {
    return (
      <div className='font-bold text-5xl text-yellow-300'>
        Loading...
      </div>
    );
  }

  return (
    <Countdown className='font-bold text-5xl text-yellow-300' date={endingDate}/>
  )
}

export default CountDown

