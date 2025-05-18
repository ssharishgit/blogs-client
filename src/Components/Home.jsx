import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [blogsList, setBlogsList] = useState([])
  const location = useLocation()


  useEffect(()=>{
    const getAllBlogs = async ()=> {
      try{
        const userToken = localStorage.getItem("token")
        let res = await axios.get(`https://blogs-server-jrvy.onrender.com/blogs`, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        setBlogsList(res.data)
      }catch(err){
        console.log(err)
      }
    }

    document.body.style.overflow = 'auto'
    getAllBlogs()
  },[])

  return (
    <div className='m-2 px-4 py-2'>
      {blogsList.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {blogsList.map(blog => (
            <div className="col" key={blog._id}>
              <div className="card h-900">
                <div className="card-body">
                  <h3 className="card-title">{blog.title}</h3>
                  <p className="card-body">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <h6 className="card-text pb-3">Created by: {blog.author}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
