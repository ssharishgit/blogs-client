import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({isLoggedIn, onLogout}) => {
  const [searchData,setSearchData] = useState('')
  const navigate = useNavigate()


  const handleData = (event) =>{
    if(searchData != event.target.value){
      setSearchData(event.target.value)
    }
  }
  
  useEffect(() =>{
  }, [])

  return (
    <nav className="navbar navbar-expand-lg " style={{backgroundColor: "#e3f2fd"}} data-bs-theme="light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BC Blogs</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/myblogs">My Blogs</Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex me-3">
            {isLoggedIn ? (
              <button className="btn btn-outline-dark" onClick={onLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn btn-primary me-2" to="/signup">Signup</Link>
                <Link className="btn btn-outline-dark " to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
