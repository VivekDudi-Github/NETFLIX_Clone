import {BrowserRouter, Route , Routes} from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignUpPage from './components/pages/SignUp'

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
    </Routes>
  </>
  )
}

export default App 
