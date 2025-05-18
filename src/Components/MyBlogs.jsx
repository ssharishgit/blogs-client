import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserBlogs = async ()=> {
      try{
        const userToken = localStorage.getItem("token")
        let res = await axios.get(`https://blogs-server-jrvy.onrender.com/myblogs`, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        setUserBlogs(res.data)
      }catch(err){
        console.log(err)
      }
    }

    fetchUserBlogs()
  }, [])

  const updateBlog = (blog) => {
    navigate('/blogform', { state: { blog } })
  }

  const deleteBlog = async (id)=> {
    try{
      const userToken = localStorage.getItem("token")
      let res = await axios.delete(`https://blogs-server-jrvy.onrender.com/blogs/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      if(res.data.message === "Blog deleted successfully"){
        alert(res.data.message)
        setUserBlogs(userBlogs.filter(blog => blog._id !== id))
      }
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className='m-2 px-4 py-2'>
      <h2 className="mb-4">My Blogs</h2>
      {userBlogs.length === 0 ? (
        <p>You haven't created any blogs yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {userBlogs.map(blog => (
            <div className="col" key={blog._id}>
              <div className="card h-900">
                <div className="card-body">
                  <h3 className="card-title">{blog.title}</h3>
                  <p className="card-body">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <h6 className="card-text pb-3">Created by: {blog.author}</h6>

                  <div className="d-flex justify-content-between">
                    <div key={blog._id}>
                      <button onClick={() => updateBlog(blog)} className="btn btn-sm btn-secondary">Edit</button>
                    </div>
                    <button onClick={() => deleteBlog(blog._id)} 
                    className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/blogform" className="btn btn-primary w-100 mt-3">Create New Blog</Link>
    </div>
  )
}


export default MyBlogs
