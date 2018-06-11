import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CartProductCard from './Cart-ProductCard'
import { retrieveOpenCart, editTheCart, updateNumItemsAndSubtotal } from '../../store/carts'
// import {}

//<Route exact path='cart' component={OpenCart} />

class OpenCart extends Component {
  constructor() {
    super()
    this.state = {}
    // this.deleteProductFromCart = this.deleteProductFromCart.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
  }
  componentDidMount() {
    const { user, getOpenCart, products, updateFrontCart } = this.props
    getOpenCart(user)
    // updateFrontCart(products)
  }

  //deleteProductFromCart(evt) {
  //   evt.preventDefault()
  //   other logic to delete product from cart
  // }
  changeQuantity(evt, product) {
    const { cart, user, editCart } = this.props
    const { products } = cart
    const newProduct = {...product, productQuantity: +evt.target.value}
    const newCart = {...cart, products: products.map( singleProduct => {
      if (singleProduct.id === newProduct.id) {
        return newProduct
      } else {
        return singleProduct
      }
    })}
    editCart(newCart, user)
  }

  render() {
    const { cart, products, numberOfItems } = this.props
    // console.log('in open cart, products: ', products)
    console.log('numberOfItems: ', this.props.numberOfItems)
    // const numberOfItems = products.reduce( (acc, product) => {
    //   return acc + product.cartProducts.productQuantity
    //   }, 0)
    const subtotal = (products.reduce( (acc, product) => {
      return acc + (product.price * product.cartProducts.productQuantity)
      }, 0) / 100).toFixed(2)
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-10'>
            <h1>Current Cart:</h1>
            {products.length < 1
            ? (<h5>There are currently no items in your cart.</h5>)
            : (<div>
                  <div className='row'>
                    <p className='col-8'>Item</p>
                    <p className='col-2'>Price</p>
                    <p className='col-2'>Quantity</p>
                  </div>
                  {products.map( product => {
                  return (<CartProductCard
                    key={product.id}
                    product={product}
                    changeQuantity={this.changeQuantity}
                    cartStatus={cart.status} />) //pass down cart, maybe just status?
                  })}
               </div>)}
          </div>
          <div className='column col-2'>
                <h5>Cart Summary:</h5>
                <div className='row'>
                  <p className='col-7'>Items({numberOfItems}):</p>
                  <p>${subtotal}</p>
                </div>
                <button type='submit'>Place Your Order</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart || {},
    products: state.cart.products || [],
    isLoggedIn: !!state.user.id,
    numberOfItems: state.frontEndCartReducer.numItemsInCart
  }
}

const mapDispatch = dispatch => {
  return {
    getOpenCart: (user) => dispatch(retrieveOpenCart(user)),
    // ^ retrieveOpenCart will later be on login.signup button
      // .then(() => dispatch(editTheCart(cart, user)))
    editCart: (cart, user) => dispatch(editTheCart(cart, user)),
    // updateFrontCart: (products) => dispatch(updateNumItemsAndSubtotal(products)),
  }
}


export default connect(mapState, mapDispatch)(OpenCart)

OpenCart.propTypes = {

}