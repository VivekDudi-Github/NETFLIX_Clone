import { useEffect } from 'react'
import { Navigate, Route , Routes, useNavigate } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import WatchPage from './components/pages/WatchPage.jsx'
import SignUp from './components/pages/SignUpPage.jsx'
import Footer from './components/Footer.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './components/store/authUser.js'
import { Loader } from 'lucide-react'


function App() {
  const navigate = useNavigate() ;
  const {authCheck , isLoading , User} = useAuthStore() ;
  useEffect(() => {
      authCheck();
  }, [])

  if(isLoading){
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center h-full bg-black  '>
          <Loader className='animate-spin text-red-600' />
        </div>
      </div>
    )
  }
  
  return (
  <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={ !User ? <LoginPage/> : <Navigate to={'/'} /> } />
      <Route path='/signup' element={ !User ? <SignUp/> : <Navigate to={'/'} /> } />
      <Route path='/watch/:id' element={ !User ? <LoginPage/> : <WatchPage/> } />

    </Routes>
    <Toaster />
    <Footer />
  </>
  )
}

export default App 
