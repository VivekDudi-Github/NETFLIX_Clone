import React from 'react'
import { useAuthStore } from '../store/authUser'
import Navbar from '../Navbar'

function HomeScreen() {
  const {logout} = useAuthStore()
  return (
    <>
    <div className='relative h-screen text-white'>
      <Navbar />
    </div>
    </>
  )
}

export default HomeScreen