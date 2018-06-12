import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadAllProducts, deleteProduct } from '../../store/products'
import { ProductCard } from '../shop'
import { CartHistory } from '../cart'

class AdminDashboard extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div className="container">
        <h1>Manage your Store</h1>
        <div>
          <h4>Product Management</h4>
          <div className="row">
            <div>
              <Link to="/admin/product/add">
                <button className="btn-large waves-effect waves-light" type="button">Add Product</button>
              </Link>
            </div>
            <div className="card-columns">
              {this.props.products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={this.props.isAdmin}
                  deleteProduct={this.props.deleteProduct}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4>Order Management</h4>
          <div>
            <CartHistory />
          </div>
        </div>

        <div>
          <h4>User Management</h4>
          <button type="button">
            <Link to="/admin/users">Edit Users</Link>
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(loadAllProducts()),
    deleteProduct: id => dispatch(deleteProduct(id))
  }
}

export default connect(
  mapState,
  mapDispatch
)(AdminDashboard)
