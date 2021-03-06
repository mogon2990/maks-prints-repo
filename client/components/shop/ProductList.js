import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import NavCategory from './NavCategory'
import ProductCard from './ProductCard'
import { loadAllProducts } from '../../store/products'
import { loadAllCategories } from '../../store/categories'
import { retrieveOpenCart } from '../../store/cart'

import axios from 'axios'


class ProductList extends Component {
  componentDidMount() {
    const { user } = this.props
    this.props.fetchProducts()
    this.props.fetchCategories()
    this.props.findOrCreateOpenCart(user)

  }

  render() {
    let categoryMap = {}
    this.props.products.length && this.props.products.forEach(product => {
      const categoryNames = product.categories.map(category => category.name)
      categoryMap[product.title] = categoryNames
    })

    // The below may be inside a lifecycle hook
    // OR let's make sure that after the submit is completed, this.props.search is an empty string again
    let products
    if (this.props.search.length > 1) {
      products = this.props.products.filter(product => product.title.toLowerCase() == this.props.search.toLowerCase())
    } else {
      products = this.props.products
    }

    // const products = this.props.products

    return (
      <div className="container">
        <div className="row">
          {this.props.products.length && <div />}
          <NavCategory categories={this.props.categories} />

          <div className="card-columns">
            {
              this.props.match.params.categoryName
                ? products.filter(product => categoryMap[product.title].includes(this.props.match.params.categoryName))
                  .map(product => {
                    return (
                      <div key={product.id}>
                        <ProductCard key={product.id} product={product} />
                      </div>)
                  })
                : products.map(product => {
                  return (
                    <div key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </div>
                  )
                })}
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    search: state.search,
    categories: state.categories,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(loadAllProducts()),
    fetchCategories: () => dispatch(loadAllCategories()),
    findOrCreateOpenCart: (user) => dispatch(retrieveOpenCart(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList))

/* Prop Types */
ProductList.propTypes = {
  products: PropTypes.array.isRequired
}
