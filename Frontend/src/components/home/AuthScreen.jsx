import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {ChevronRight} from 'lucide-react'


  function AuthScreen() {
    const [email ,setEmail] = useState('')
    const navigate = useNavigate();

   

    const handleSumbit = async(e) => {
      e.preventDefault() ;
      
      navigate('/signup?email='+email)
    }

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
            
            <form className='flex md:flex-row flex-col gap-4 w-1/2 '
                  onSubmit={handleSumbit}>
                <input
                  type='email'
                  placeholder='Email address'
                  className='p-2 rounded flex-1 bg-black/80 border border-gray-700 outline-none focus:ring-1 duration-300'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'
                  type='submit'
                >
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
              autoPlay={true}
              playsInline muted
              loop
              >
              <source src='/hero-vid.m4v' className='mt-4' />
            </video>
          </div>
        </div>
      </section>

      <div  className='h-2 w-full bg-[#232323] '/>

      <section className='py-10 bg-black text-white '>
        <div className='flex max-w-6xl mx-auto justify-center items-center md:flex-row flex-col-reverse px-4 md:px-2 '>
         
          <div className=' relative'>
            <img src='/stranger-things-lg.png.jpg' alt='strnager-things-mobile-View'/>
            <div className='border-slate-500 border rounded-md px-2 absolute flex items-center gap-2 bottom-5 left-1/2  -translate-x-1/2 bg-black w-3/4 lg:w-1/2 lg:h-24 h-16  '>
              <img className='h-full' src='/stranger-things-sm.png' alt='stranger-things-cover' />
                <div className='flex justify-between items-center w-full'>
                  <div className=' flex flex-col gap-0'>
                    <span className='text-md md:text-lg font-bold'>Stranger Things</span>
                    <span className='text-sm text-blue-500'>Downloading...</span>
                  </div>
                  <img className='h-12' src='/download-icon.gif' alt='downloading'/>
                </div>
            </div>
          </div>

          <div>
            <h2 className=' text-4xl md:text-5xl font-extrabold mb-4'> 
              Download Your Shows
            </h2>
            <p className='text-lg md:text-xl'>
							Save your favourites easily and always have something to watch.
						</p>
          </div>
        </div>
      </section>

      <div  className='h-2 w-full bg-[#232323] '/>

      <section className='bg-black text-white py-10 '>
        <div className='flex max-w-6xl mx-auto justify-center items-center md:flex-row flex-col px-4 md:px-2 '>
          <div>
            <h2 className=' text-4xl md:text-5xl font-extrabold mb-4'> 
              Watch Everywhere 
            </h2>
            <p className='text-lg md:text-xl'>
							Stream unlimited movies and TV shows on your phone, tablet, laptop and TV
						</p>
          </div>

          <div className='relative z-10'>
            <img className='mt-4 ' src='/device-pile.png' alt='Tv isllutration'/>
            <video className='absolute scale-90 h-1/2 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 -z-10'
              autoPlay= {true}
              playsInline muted
              loop
              >
              <source src='/video-devices.m4v' className='mt-4' />
            </video>
          </div>
        </div>
      </section>

      <div className=' h-2 bg-[#232323] w-full' />

      <section className='py-10 bg-black text-white'>
				<div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row
           px-4 md:px-2'>
					<div className='flex-1 relative'>
						<img src='/kids.png' alt='Enjoy on your TV' className='mt-4' />
					</div>
					<div className='flex-1 text-center md:text-left '>
						<h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Create profiles for kids</h2>
						<p className='text-lg md:text-xl'>
							Send kids on adventures with their favorite characters in a space made just for them—free
							with your membership.
						</p>
					</div>
				</div>
			</section>

    </div>
  )
}

export default AuthScreen