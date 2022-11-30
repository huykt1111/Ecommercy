import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { PayPalButton } from "@repeatgg/react-paypal-button-v2";

function Cart() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      },0)

      setTotal(total)
    }

    getTotal()

  }, [cart])

  const addToCart = async () => {
    await axios.patch('/user/addcart', {cart}, {
      headers: {Authorization: token}
    })
  }

  const increment = (id) => {
    cart.forEach(item => {
      if(item._id === id) {
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart()
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if(item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })

    setCart([...cart])
    addToCart()
  }

  const removeProduct = id  => {
    if(window.confirm("Do you want delete this product?")) {
      cart.forEach((item, index) => {
        if(item._id === id) {
          cart.splice(index, 1)
        }
      })

      setCart([...cart])
      addToCart()
    }
  }

  const tranSuccess = async (payment) => {
    console.log(payment)
    // const {paymentID,address} = payment
    await axios.post('/api/payment', {cart}, {
      headers: {Authorization: token}
    })
    
    setCart([])
    addToCart([])
    alert("You have successfully placed an order.")

  }

  if(cart.length===0) 
    return <h2 style={{textAlign: 'center', fontSize: '5rem'}}>Cart Empty</h2>
  return (
    <div>
      {
        cart.map(product => (
          <div className="detail cart" key={product._id}>
            <img src={product.images.url} alt="" />

            <div className="box-detail">
                <h2>{product.title}</h2>
                
                <h3>$ {product.price * product.quantity}</h3> 
                <p>{product.description}</p>
                <p>{product.content}</p>          

                <div className="amount">
                  <button onClick={() => decrement(product._id)}> - </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increment(product._id)}> + </button>
                </div>

                <div className="delete" onClick={() => removeProduct(product._id)}>X</div>

            </div>
          </div>
        ))
      }

      <div className="total">
          <h3>Total: $ {total}</h3>
          <PayPalButton
            amount={total}
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
              alert("Transaction completed by " + details.payer.name.given_name);
              tranSuccess(data)
            }}
            options={{
              clientId: "AfaebvtFXBG3t5j-v689WokLyo9nPyiB-_GtZG9YASPNrBEP2YeUnMJTtg7cqciebv4wKh6fVuPso3ar"
            }}
          />
      </div>
    </div>
  )
}

export default Cart