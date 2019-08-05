import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {addToCurrentCart} from '../store/currentCart'
import {browserHistory} from 'react-router'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      productId: null,
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      productId: Number(this.props.match.params.id)
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: Number(event.target.value)
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addToCurrentCart(this.state)
    this.props.history.push('/cart')
  }

  render() {
    console.log(this.state)
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
                {[...Array(+currentProduct.stock).keys()].map(i => {
                  return <option>{i + 1}</option>
                })}
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
    dispatch(addToCurrentCart(info))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
