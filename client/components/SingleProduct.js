import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {addToCurrentCart} from '../store/currentCart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      productId: 0,
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      productId: Number(this.props.match.params.id),
      [event.target.name]: Number(event.target.value)
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addToCurrentCart(this.state)
  }

  render() {
    const currentProduct = this.props.products.find(
      product => product.id === Number(this.props.match.params.id)
    )
    if (!currentProduct) {
      return <h1>Loading!</h1>
    } else {
      return (
        <div>
          <h1>{currentProduct.title}</h1>
          <img src={currentProduct.imageUrl} />
          <p>
            <li>Price: ${currentProduct.price / 100}</li>
            <li>Rating: {currentProduct.rating}/10</li>
            <li>Description: {currentProduct.description}</li>
          </p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Quantity:</label>
              <select
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <button type="submit">Add to cart</button>
            </div>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts
})

const mapDispatchToProps = dispatch => ({
  addToCurrentCart: info => {
    addToCurrentCart(info)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
