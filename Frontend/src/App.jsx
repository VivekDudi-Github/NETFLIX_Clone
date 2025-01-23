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
import SearchPage from './components/pages/SearchPage.jsx'
import HistoryPage from './components/pages/HistoryPage.jsx'
import NotFoundPage from './components/pages/NotFoundPage.jsx'
import WatchContentPage from './components/pages/WatchContentPage.jsx'

function App() {
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
      <Route path='/login' element={ User === null ? <LoginPage/> : <Navigate to={'/'} /> } />
      <Route path='/signup' element={ User === null ? <SignUp/> : <Navigate to={'/'} /> } />
      <Route path='/watch/:id' element={ User === null ? <Navigate to={'/login'} /> : <WatchPage/> } />

      <Route path='/search/' element={ User === null ? <Navigate to={'/login'} /> : <SearchPage/> } />
      <Route path='/history/' element={ User === null ? <Navigate to={'/login'} /> : <HistoryPage/> } />
      <Route path='/watch/content' element={ User === null ? <Navigate to={'/login'} /> : <WatchContentPage />} />

      <Route path='/*' element={<NotFoundPage/>} />
    </Routes>
    <Toaster />
    <Footer />
  </>
  )
}

export default App 
