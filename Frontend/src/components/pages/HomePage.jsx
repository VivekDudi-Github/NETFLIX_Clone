import React from 'react'
import HomeScreen from '../home/HomeScreen'
import AuthScreen from '../home/AuthScreen'
import { useAuthStore } from '../store/authUser'
import { Loader } from 'lucide-react';

function HomePage() {
  const {User} = useAuthStore() ;
  return (
    <>
      {User ? <HomeScreen/> : <AuthScreen/>}
    </>
  )
}

export default HomePage