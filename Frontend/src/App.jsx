import { Route , Routes} from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignUp from './components/pages/SignUpPage.jsx'
import Footer from './components/Footer.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
    <Toaster />
    <Footer />
  </>
  )
}

export default App 
