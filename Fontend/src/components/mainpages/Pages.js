import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './products/Products'
import Cart from './cart/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'

function Pages() {
  return (
    <Routes>
      <Route path='/' exact element={<Products />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/register' exact element={<Register />} />
      <Route path='/cart' exact element={<Cart />} />

      <Route path='*' exact element={<NotFound />} />
    </Routes>
  )
}

export default Pages