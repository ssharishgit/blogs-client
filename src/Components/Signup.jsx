import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const collectData = async ()=>{
    let response = await fetch('http://localhost:7001/auth/signup',{
      method : 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name,email,password }),
    });
    let data =  await response.json()
    if(data){
      alert(data.message)
      navigate('/login')
    }
  }
  return (
    <>
      <div className='d-flex flex-column justify-content-center px-4 py-4 py-lg-5'>
        <h1 className='mt-3 text-center fw-bold fs-2 py-3'>User Registeration</h1>
        <div className='mx-auto mt-4 w-100' style={{ maxWidth: '400px' }}>
          <div className="d-grid gap-4">
            <input id="name" type="text" name="name" value={name}
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)} 
            className='form-control rounded' 
            />
            <input id="email" type="text" name="email" value={email} placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)} 
            className='form-control rounded' 
            />
            <input id="password" type="text" name="password" value={password} placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)} 
            className='form-control rounded' 
            />
            <button type="button" onClick={collectData} className='mt-2 btn btn-outline-primary rounded' >
              Sign Up
            </button>
            <p className='mt-3 text-center text-muted'>
              Already Registered?{' '}
              <Link to='/login' className='fw-semibold text-primary'>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Signup
