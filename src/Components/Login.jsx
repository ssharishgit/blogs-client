import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = ({ loggedIn }) =>{
  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const signin = async ()=> {
    try{
      let res = await fetch('https://blogs-server-jrvy.onrender.com/auth/login',{
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,password })
      });
      let data =  await res.json()
      if(data.message === "User logged in Successfully"){
        alert(data.message)
        let tokenId = data.token
        localStorage.setItem('token', tokenId)
        loggedIn()
        navigate('/')
      }
    }catch(err){
      console.log(err)
    }
    
  }

  return (
    <>
      <div className='d-flex flex-column justify-content-center px-4 py-4 py-lg-5'>
        <div className='mx-auto w-100'>
          <h2 className='mt-3 text-center fw-bold fs-2 text-capitalize'>
            User Login
          </h2>
        </div>

        <div className='mx-auto mt-4 w-100' style={{ maxWidth: '400px' }}>
          <div className='d-grid gap-3'>
            <div>
              <label htmlFor='email' className='form-label fw-medium'>
                Email address
              </label>
              <div className='mt-2'>
                <input id='email' name='email' type='email' value={email} placeholder= 'Enter email'
                  onChange={(e) => setEmail(e.target.value)}
                  className='form-control rounded' 
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='form-label fw-medium'>
                Password
              </label>
              <div className='mt-2'>
                <input id='password' name='password' type='text' value={password} placeholder= 'Enter password'
                  onChange={(e) => setPassword(e.target.value)} 
                  className='form-control rounded' 
                />
              </div>
            </div>

            <div className='mt-2'>
              <button onClick={signin} className='btn btn-outline-primary rounded w-100'>
                Login
              </button>
            </div>
          </div>
          <p className='mt-3 text-center text-muted'>
            Not a member?{' '}
            <Link to='/signup' className='fw-semibold text-primary'>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}