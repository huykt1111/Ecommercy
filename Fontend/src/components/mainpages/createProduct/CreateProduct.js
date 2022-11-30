import React, {useState, useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: 'ABC',
  content: 'ABC',
  category: ''

}

function CreateProduct() {
  const state = useContext(GlobalState)
  const [product, setProduct] = useState(initialState)
  const [categories] = state.categoriesAPI.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  
  const handleUpload = async e => {
    e.preventDefault()
    try {
      if(!isAdmin) return alert("You're not an admin")
      const file = e.target.files[0]

      console.log(file)
      if(!file) return alert("File not exits.")

      if(file.size > 1024*1024) // 1mb
        return alert("Size too large!")

      if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
        return alert("File format is incorrect.")

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {'content-type':'multipart/form-data', Authorization: token}
      })

      setLoading(false)
      setImages(res.data)
    } catch (e) {
      alert(e.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      if(!isAdmin) return alert("You're not an admin")
      setLoading(true)
      await axios.post('/api/destroy', {
        public_id: images.public_id
      },{
        headers: {Authorization: token}
      })
      setLoading(false)
      setImages(false)

    } catch (e) {
      alert(e.response.data.msg)
    }
  }

  const handleChangeInput = e => {
    const {name, value} = e.target
    setProduct({...product, [name]:value})
  }

  const styleUpload = {
    display: images ? "block" : "none"
  }

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {
          loading ? <div id="file_img"><Loading /></div>
                  :<div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt="" />
                    <span onClick={handleDestroy}>X</span>
                </div>
        }
        
      </div>

      <form>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea type="text" name="description" id="description" required value={product.description} rows="5" onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories</label>
          <select name="category" value={product.category} onChange={handleChangeInput} >
            <option value="">Please select a category</option>
            {
              categories.map(category => (
                <option value={category._id} id={category._id} >
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateProduct