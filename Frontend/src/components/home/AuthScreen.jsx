import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import {ChevronRight} from 'lucide-react'


  function AuthScreen() {
    const [email ,setEmail] = useState('')
  return (
    <div className=' h-full w-full z-0 flex-col flex '>
       
      <section className=' w-full realtive'>
        <div className=' min-h-[659px] h-full w-full bg-gradient-to-b from-[#000000CC] to-[#0000004e] absolute -z-10'/>
        <img className=' min-h-[659px] h-full w-full object-cover absolute -z-20' src='hero.png'  />
        
          <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
            <img className=' w-32 md:w-52' src='netflix-logo.png' alt='Netflix'/>
            <Link className='text-white bg-red-600 py-1 px-2 rounded' to={'/login'}>
              Sign In
            </Link>
          </header>

        {/* hero Section */}
          <div className=' flex flex-col  items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
              <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, TV shows, and more</h1>
              <p className='text-lg mb-4'>Watch anywhere. Cancel anytime.</p>
              <p className='mb-4'>Ready to watch? Enter your email to create And Start your membership.</p>
            
            <form className='flex md:flex-row flex-col gap-4 w-1/2 '>
                <input
                  type='email'
                  placeholder='Email address'
                  className='p-2 rounded flex-1 bg-black/80 border border-gray-700 outline-none focus:ring-1 duration-300'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
                  Get Started
                  <ChevronRight className='size-8 md:size-9' />
                </button>
            </form>
          </div>
          
          {/* seperator */}
          <div className='bg-[#232323] w-full h-2' />
      </section>

      <section className='bg-black text-white py-10 '>
        <div className='flex max-w-6xl mx-auto justify-center items-center md:flex-row flex-col px-4 md:px-2 '>
          <div>
            <h2 className=' text-4xl md:text-5xl font-extrabold mb-4'> 
              Enjoy Your TV 
            </h2>
            <p className='text-lg md:text-xl'>
							Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
						</p>
          </div>

          <div className='relative z-10'>
            <img className='mt-4 ' src='/tv.png' alt='Tv Isllutration'/>
            <video className='absolute scale-105 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10'
              autoPlay="true"
              playsInline muted
              loop
              >
              <source src='/hero-vid.m4v' className='mt-4' />
            </video>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AuthScreen