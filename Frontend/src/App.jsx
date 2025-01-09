import { Route , Routes} from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignUp from './components/pages/SignUpPage.jsx'

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  </>
  )
}

export default App 
