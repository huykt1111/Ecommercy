import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import ProductItem from '../utils/productitem/ProductItem'

function DetailProduct() {
  const params = useParams()
  const state = useContext(GlobalState)
  const [products] = state.productsAPI.products
  const addCart = state.userAPI.addCart
  const [detailProduct, setDetailProduct] = useState([])

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])
  if(detailProduct.length === 0) return null
  return (
    
    <>
      <div className="detail">
          <img src={detailProduct.images.url} alt=""  />
          <div className="box-detail">
              <div className="row">
                  <h2>{detailProduct.title}</h2>
                  <h6>#id: {detailProduct.product_id}</h6>
              </div>
              <span>{VND.format(detailProduct.price)}</span>
              <p>{detailProduct.description}</p>
              <p>{detailProduct.content}</p>
              <p>Solid: {detailProduct.sold}</p>
              <Link to="/card" className="cart" 
                onClick={() => addCart(detailProduct)}>
                Buy Now
              </Link>
          </div>
      </div>
      <div>
        <h2 className="Related">Related products</h2>
        <div className="products">
          {
            products.map(product => {
              return product.category === detailProduct.category
                ? <ProductItem key={product._id} product={product} /> : null
            })
          }
        </div>  
      </div>
    </>
  )
}

export default DetailProduct