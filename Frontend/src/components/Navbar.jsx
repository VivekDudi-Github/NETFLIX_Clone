import { LogOutIcon, Menu, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from './store/authUser';
import { useContentStore } from './store/content';
import GetTrendingContent from './hook/GetTrendingContent';

function Navbar() {
const [mobileMenuState , setMobileMenuState] = useState(false) ;
const {User , logout} = useAuthStore() ;

const { setContentType} = useContentStore();


const toggleMobileMenu = () => {
    setMobileMenuState(!mobileMenuState)
}


  return (
    <header className='max-w-6xl items-center flex-wrap justify-between p-4 pb-4 h-20 flex mx-auto duration-200'>
        <div className='flex items-center gap-10 z-50'>
            <Link to={'/'} >
                <img className='w-32 sm:w-40' src='/netflix-logo.png'/>
            </Link>
            <div className='hidden sm:flex gap-2 items-center'>
                <Link to={'/'} className='hover:underline'
                onClick={() => setContentType('movies')}
                >
                    Movies
                </Link>
                <Link to={'/'} className='hover:underline'
                onClick={() => setContentType('tv')}
                >
                    TV Shows
                </Link>
                <Link to={'/history'} className='hover:underline'>
                    History
                </Link>
            </div>
        </div>

        <div className='flex gap-2 items-center z-50'>
            <Link to={'/search'}>
                <Search className='size-6 cursor-pointer' />
            </Link>
            <img className='size-6 rounded' src={User?.image || '/avatar2.jpg' } />
            <LogOutIcon className='size-6 cursor-pointer' onClick={logout} />
            <div className='sm:hidden'>
                <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
            </div>
        </div>

        
            <div className={`sm:hidden w-full mt-4 bg-black border rounded border-gray-800 duration-200 z-50 ${mobileMenuState ? ' translate-y-0' : " -translate-y-16 opacity-0 invisible  "}` }>
                <Link className='block hover:bg-red-900 duration-300 ease-in-out  p-2'
                    onClick={() => {
                        toggleMobileMenu() ;
                        setContentType('movies')
                    }}
                    to={'/'}
                    >
                    Movies
                </Link>
                <Link className='block hover:bg-red-900 duration-300 ease-in-out p-2'
                    onClick={() => {
                        toggleMobileMenu() ;
                        setContentType('tv')
                    }}
                    to={'/'}
                    >
                    TV
                </Link>
                <Link className='block hover:bg-red-900 duration-300 ease-in-out p-2'
                    onClick={toggleMobileMenu}
                    to={'/history'}
                    >
                    Search History
                </Link>
            </div>
        
    </header>
  )
}

export default Navbar