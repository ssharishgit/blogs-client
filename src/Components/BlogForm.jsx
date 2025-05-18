import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BlogForm = () => {

  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  const [content,setContent] = useState("")
  const [image,setImage] = useState("")
  const [blogId, setBlogId] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()


  useEffect(() => {
    if (location.state?.blog) {
      const { _id, title: editTitle, category: editCategory, content: editContent, image: editImage } = location.state.blog
      setIsUpdate(true)
      setBlogId(_id)
      setTitle(editTitle)
      setCategory(editCategory)
      setContent(editContent)
      setImage(editImage)
    } else {
      setIsUpdate(false)
      setBlogId(null)
      setTitle('')
      setCategory('')
      setContent('')
      setImage('')
    }
  }, [location.state])

  const submitBlog = async ()=> {
    let blogData = { title,category,content,image }
    const userToken = localStorage.getItem("token")
    try{
      if(isUpdate && blogId){
        let res = await axios.put(`https://blogs-server-jrvy.onrender.com/blogs/${blogId}`, blogData, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        if(res.data.message === "Blog upadated successfully"){
          alert(res.data.message)
        }
      }else{
        let res = await axios.post(`https://blogs-server-jrvy.onrender.com/blogs`, blogData, {
          headers: { Authorization: `Bearer ${userToken}` } 
        })
        if(res.data.message === "Blog created successfully"){
          alert(res.data.message)
        }
      }
      setTimeout(() => navigate('/myblogs'), 2000)
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className="container">
      <h2 className="mt-4">{isUpdate ? 'Update Blog' : 'Create New Blog'}</h2>
      <div >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input type="text" className="form-control" id="category" value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows="5" value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL (Optional)</label>
          <input type="text" className="form-control" id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => submitBlog()} >
          {(isUpdate ? 'Update Blog' : 'Create Blog')}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/myblogs')}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default BlogForm
