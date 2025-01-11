import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className='max-w-6xl items-center justify-between p-4 h-20 flex mx-auto bg-black'>
        <div className='flex items-center gap-10 z-50'>
            <Link to={'/'} >
                <img className='w-32 sm:w-40' src='/netflix-logo.png'/>
            </Link>
            <div className='hidden sm:flex gap-2 items-center'>
                <Link to={'/'} className='hover:underline'>
                    Movies
                </Link>
                <Link to={'/'} className='hover:underline'>
                    TV Shows
                </Link>
                <Link to={'/'} className='hover:underline'>
                    History
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar