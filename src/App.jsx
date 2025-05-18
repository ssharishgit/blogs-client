import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import MyBlogs from './Components/MyBlogs'
import BlogForm from './Components/BlogForm'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './Components/Login'
import Signup from './Components/Signup'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')
  }


  // useEffect(()=>{
  //   getAllMovies()
  // },[])

  return (
    <>
      <div className=''>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="container mt-4"></div>
          {/* <Route path='/' element={<Home />} /> */}
          {isLoggedIn ? 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/myblogs' element={<MyBlogs />} />
            <Route path='/blogform' element={<BlogForm />} />
          </Routes>
           :
          <Routes>
            <Route path='/login' element={<Login loggedIn={handleLogin}/>} />
            <Route path='/signup' element={<Signup loggedIn={handleLogin}/>} />
          </Routes>
          }

      </div>
      
    </>
  )
}

export default App
