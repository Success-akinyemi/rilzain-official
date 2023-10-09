import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import Homes from './Pages/Homes/Homes'
import Home from './Pages/Home/Home'
import Registration from './Pages/Registration/Registration'
import { AdminUser, AuthorizeUser, ValidToken } from './auth/PrivateRoute'
import MyHomes from './Pages/MyHomes/MyHomes'
import NewHome from './Pages/NewHome/NewHome'
import Contact from './Pages/Contact/Contact'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const isUser = localStorage.getItem('authToken')
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage toggle={toggle} isOpen={isOpen} />} isUser={isUser} />
          <Route path='/home' element={<Homes toggle={toggle} isOpen={isOpen} />} />
          <Route path='/contact' element={<Contact toggle={toggle} isOpen={isOpen} />} />
          <Route path='/home/:id' element={<Home toggle={toggle} isOpen={isOpen} />} />
          <Route path='myHomes' element={<AuthorizeUser><MyHomes toggle={toggle} isOpen={isOpen} /></AuthorizeUser>} />
          <Route path='/newHome' element={<AuthorizeUser><AdminUser><ValidToken><NewHome toggle={toggle} isOpen={isOpen} /></ValidToken></AdminUser></AuthorizeUser>} />
          <Route path='/registration' element={<Registration toggle={toggle} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
