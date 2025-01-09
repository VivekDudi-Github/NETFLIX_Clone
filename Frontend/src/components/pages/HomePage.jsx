import React from 'react'
import {Link} from 'react-router-dom'
import HomeScreen from '../home/HomeScreen'
import AuthScreen from '../home/AuthScreen'

function HomePage() {
  const Bg = (<>
   <div className=' h-full w-full bg-gradient-to-b from-[#000000CC] to-transparent fixed -z-10'></div>
   <img className='h-full w-full object-cover fixed -z-20' src='hero.png'  /></>
   )
   
  return (
    <>
      <div className='w-full '>
        <AuthScreen/>
      </div>
    </>

  )
}

export default HomePage