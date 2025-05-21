import React, { useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useAddOrderMutation, useDirectOrderMutation, useGetCartQuery, useGetMeQuery } from '../services/createApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { actions } from '../services/slice'

function PlaceOrder() {
    const [directOrder] = useDirectOrderMutation()
  const directOrderItem = useSelector(state => state.Slice.orderItem)
  const dummyCart = useSelector(state => state.Slice.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
useEffect(() => {
       
        window.sessionStorage.setItem("orderItem",JSON.stringify(directOrderItem))
        }, [directOrderItem])
  const { data: userData, isSuccess: loggedIn } = useGetMeQuery()
  const { data, isFetching, refetch } = useGetCartQuery()
  const [addOrder] = useAddOrderMutation()

  const notify = (type, message) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    })
  }

  const subtotal = () => {
    if (loggedIn && !isFetching && Array.isArray(data)) {
      return data.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
    } else {
      return dummyCart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
    }
  }

  const [values, setValues] = useState({
    fName: '',
    lName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    orderStatus: 'Order Placed',
    total: subtotal() + 10,
    payment: 'COD'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!loggedIn) return notify('error', 'You must login to place orders')
    //   if (!data || data.length === 0) return notify('error', 'No items in the cart to order')

     Object.keys(directOrderItem).length === 0 && await addOrder(values)
     Object.keys(directOrderItem).length != 0 && await directOrder({...values,productId : directOrderItem.productId,
      name :  directOrderItem.name,
      price :  directOrderItem.price,
      size :  directOrderItem.size,
      imgUrl :  directOrderItem.imgUrl,
      quantity :  directOrderItem.quantity})
      refetch()
      navigate('/orders')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between gap-6 py-10 px-4 border-t min-h-[80vh]">
     {/* Delivery Information - Restored Layout */}
<div className="w-full sm:max-w-[480px] space-y-5">
  <div className="my-3 text-xl sm:text-2xl">
    <div className="inline-flex items-center gap-2 mb-3">
      <p className="text-gray-500">DELIVERY <span className="font-medium text-gray-700">INFORMATION</span></p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  </div>

  <div className="flex gap-3">
    <input
      required
      type="text"
      placeholder="First name"
      value={values.fName}
      onChange={(e) => setValues(prev => ({ ...prev, fName: e.target.value }))}
      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
    />
    <input
      required
      type="text"
      placeholder="Last name"
      value={values.lName}
      onChange={(e) => setValues(prev => ({ ...prev, lName: e.target.value }))}
      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
    />
  </div>

  <input
    required
    type="email"
    placeholder="Email address"
    value={values.email}
    onChange={(e) => setValues(prev => ({ ...prev, email: e.target.value }))}
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />

  <input
    required
    type="text"
    placeholder="Street Address"
    value={values.address}
    onChange={(e) => setValues(prev => ({ ...prev, address: e.target.value }))}
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />

  <div className="flex gap-3">
    <input
      required
      type="text"
      placeholder="City"
      value={values.city}
      onChange={(e) => setValues(prev => ({ ...prev, city: e.target.value }))}
      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
    />
    <input
      required
      type="text"
      placeholder="State"
      value={values.state}
      onChange={(e) => setValues(prev => ({ ...prev, state: e.target.value }))}
      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
    />
  </div>

  <div className="flex gap-3">
    <input
      required
      type="number"
      placeholder="Zipcode"
      value={values.zipcode}
      onChange={(e) => setValues(prev => ({ ...prev, zipcode: Number(e.target.value) }))}
      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
    />
    <input
      required
      type="text"
      placeholder="Country"
      value={values.country}
      onChange={(e) => setValues(prev => ({ ...prev, country: e.target.value }))}
      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
    />
  </div>

  <input
    required
    type="number"
    placeholder="Phone"
    value={values.phone}
    onChange={(e) => setValues(prev => ({ ...prev, phone: Number(e.target.value) }))}
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />
</div>


      {/* Order Summary & Payment */}
      <div className="w-full space-y-8 sm:max-w-xl">
        {/* Order Summary */}
        <div className="p-4 space-y-4 bg-white border shadow-sm rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">{Object.keys(directOrderItem).length === 0 ? 'Cart Summary' : 'Product Summary' }</h2>
          <div className="w-12 mb-2 border-b border-gray-700"></div>

          {Object.keys(directOrderItem).length === 0 ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><p>Subtotal</p><p>${subtotal().toFixed(2)}</p></div>
              <div className="flex justify-between"><p>Shipping Fee</p><p>{data && data.length > 0 ? "$10.00" : "$0.00"}</p></div>
              <div className="flex justify-between font-semibold"><p>Total</p><p>${(subtotal() + 10).toFixed(2)}</p></div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <img onClick={()=>navigate(`/product/${directOrderItem.productId}`)} src={directOrderItem.imgUrl} alt={directOrderItem.name} className="object-cover w-20 h-20 rounded cursor-pointer" />
                <div className="flex flex-col justify-between">
                  <p className="font-medium">{directOrderItem.name}</p>
                  <p className="text-sm text-gray-600">Price: ${directOrderItem.price}</p>
                  <p className="text-sm text-gray-600">Size: {directOrderItem.size}</p>
                  <p className="text-sm text-gray-600">Quantity: {directOrderItem.quantity}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><p>Subtotal</p><p>${(directOrderItem.price * directOrderItem.quantity).toFixed(2)}</p></div>
                <div className="flex justify-between"><p>Shipping Fee</p><p>$10.00</p></div>
                <div className="flex justify-between font-semibold"><p>Total</p><p>${(directOrderItem.price * directOrderItem.quantity + 10).toFixed(2)}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <button type='button' onClick={() => dispatch(actions.decrementOrderQuantity())} className="px-3 py-1 text-lg font-bold text-white bg-black rounded hover:bg-gray-800">-</button>
                <input type="number" disabled value={directOrderItem.quantity} className="w-16 px-2 py-1 text-center border rounded" />
                <button type='button' onClick={() => dispatch(actions.incrementOrderQuantity())} className="px-3 py-1 text-lg font-bold text-white bg-black rounded hover:bg-gray-800">+</button>
              </div>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="p-4 space-y-4 bg-white border shadow-sm rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Payment Method</h2>
          <div className="w-12 mb-2 border-b border-gray-700"></div>

          {[
            { name: 'Stripe', logo: assets.stripe_logo },
            { name: 'Razorpay', logo: assets.razorpay_logo },
            { name: 'COD', logo: null }
          ].map(method => (
            <div
              key={method.name}
              onClick={() => setValues(prev => ({ ...prev, payment: method.name }))}
              className="flex items-center gap-3 p-2 border rounded cursor-pointer hover:bg-gray-50"
            >
              <div className={`min-w-4 h-4 border rounded-full ${values.payment === method.name ? 'bg-green-400' : ''}`}></div>
              {method.logo ? (
                <img src={method.logo} alt={method.name} className="h-5 mx-4" />
              ) : (
                <span className="mx-4 text-sm font-medium text-gray-600">Cash on Delivery</span>
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="w-full text-end">
          <button type="submit" className="px-8 py-3 text-sm text-white bg-black rounded hover:bg-gray-800">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
