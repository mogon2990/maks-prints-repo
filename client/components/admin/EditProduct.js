import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct, loadAllProducts } from '../../store/products'

class ProductEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      image: '',
      description: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.loadProducts()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt){
    evt.preventDefault()
    this.props.editProduct({
      title: this.state.title,
      image: this.state.image,
      description: this.state.description,
      price: this.state.price
    })
  }

  render(){
    console.log("here's props", this.props.product)
    const { product } = this.props
    return (
      <div className="container">
        <div>
          <h3>Edit {product.title}</h3>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group-row">
            <label htmlFor="title" className="col-4">Title</label>
            <div className="col-8">
              <input
                className="form-control"
                value={this.state.title}
                type="text"
                name="title"
                onChange={this.handleChange}
                placeholder="Title"
                required
              />
            </div>
          </div>
          <div className="form-group-row">
            <label htmlFor="image" className="col-4">Image</label>
            <div className="col-8">
              <input
                className="form-control"
                value={this.state.image}
                type="text"
                name="image"
                onChange={this.handleChange}
                placeholder="Image"
                required
              />
            </div>
          </div>
          <div className="form-group-row">
            <label htmlFor="description" className="col-4">Description</label>
            <div className="col-8">
              <input
                className="form-control"
                value={this.state.description}
                type="text"
                name="description"
                onChange={this.handleChange}
                placeholder="Description"
                required
              />
            </div>
          </div>
          <div className="form-group-row">
            <label htmlFor="price" className="col-4">Price</label>
            <div className="col-8">
              <input
                className="form-control"
                value={this.state.price}
                type="text"
                name="price"
                onChange={this.handleChange}
                placeholder="Price"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const product = state.products
  return {
    product: product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitEdit: product => dispatch(updateProduct(product)),
    loadProducts: () => dispatch(loadAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)
