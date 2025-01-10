
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';


function SignUp() {
  const {searchParams} = new URL(document.location)
  const paramsEmail = searchParams.get('email');
  const Navigate = useNavigate()  

  const [email , setEmail] = useState(paramsEmail || '') ;
  const [username , setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {signup  , User} = useAuthStore() ;
  
  const handleSubmitFunc = async (e) => {
  e.preventDefault() ;
    
    await signup({email , password , username})
    console.log(User);
    
  }  

  
  return (
    <div className=' h-screen w-full'>
      <div className=' h-full w-full bg-gradient-to-b from-[#000000CC] to-transparent fixed -z-10'></div>
          <img className='h-full w-full object-cover fixed -z-20 ' src='hero.png'  />

      <header className='max-w-6xl mx-auto items-center justify-start flex p-4 '>
        <Link  className='w-52 'to={'/'} >
          <img src='netflix-logo.png'alt='Netflix' />
        </Link> 
      </header>

      <div className='flex mt-20 mx-3 justify-center items-center '>
        <div className=' w-full max-w-md p-8 space-y-6 bg-black/60 rounded-md text-white'>
            <h1 className='text-center text-white text-2xl font-bold mb-4'>
              Signup
            </h1>
            <form className='space-y-4' onSubmit={handleSubmitFunc}>
                <div>
                  <label className='pl-2' htmlFor='email'>
                    Email :
                  </label>
                  <input id='email'
                    required
                    type='email'
                    placeholder='you@gmail.com'
                    defaultValue={email}
                    className='w-full py-2 px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white outline-none duration-500 focus:ring-1 focus:ring-blue-400  '
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className='pl-2' htmlFor='username'>
                    Username :
                  </label>
                  <input id='username'
                    type='text'
                    placeholder='Jondae'
                    className='w-full py-2 px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white outline-none duration-500 focus:ring-1 focus:ring-blue-400  '
                    onChange={(e) => setUsername(e.target.value)}
                    required
                 />
                </div>
                <div>
                  <label className='pl-2' htmlFor='password'>
                    Password :
                  </label>
                  <input id='password'
                    type='password'
                    placeholder='Please Keep a strong & unique password'
                    className='w-full py-2 px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white outline-none duration-500 focus:ring-1 focus:ring-blue-400  '
                    onChange={(e) => setPassword(e.target.value)}
                    required
                 />
                </div>
                <button type='submit' className=' w-full py-2 text-white bg-red-600 font-semibold rounded-md hover:bg-red-700 '>
                  Sign Up 
                </button>
            </form>
            <div className='text-center text-gray-400 text-sm hover:scale-105 duration-200'>
              Already a menber? 
              <Link className='hover:underline hover:text-cyan-400 pl-1 duration-500' to={'/login'}> 
                Sign In
              </Link>
            </div>
        </div>  
      </div>
    </div>
  )
}

export default SignUp