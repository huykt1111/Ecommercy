import React from 'react'
import BtnRender from './BtnRender'

function ProductItem({product, isAdmin,deleteProduct,handleCheck}) {

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="product_card">
        {
          isAdmin && <input type="checkbox" checked={product.checked} 
          onChange={() => handleCheck(product._id)} />
        }
        <img src={product.images.url} alt="" />

        <div className="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <span>{VND.format(product.price)}</span>
            <p>{product.description}</p>
        </div>



        <BtnRender product={product} deleteProduct={deleteProduct}/>
    </div>
  )
}

export default ProductItem