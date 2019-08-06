import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editCart} from '../store/currentCart'
import {Card} from 'react-bootstrap'

class CartItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: this.props.id,
      quantity: this.props.quantity
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    event.preventDefault()
    await this.setState({
      [event.target.name]: Number(event.target.value)
    })
    this.props.editCart(this.state)
  }

  render() {
    const {products, user} = this.props
    if (!products) {
      return <h1>Loading</h1>
    } else {
      return (
        <Card.Body>
          <Link to={`/products/${this.props.id}`}>
            <Card.Title>{this.props.title}</Card.Title>
          </Link>
          <h5>${this.props.price / 100}</h5>
          <form>
            <label>Quantity:</label>
            <select
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            >
              {[...Array(+this.props.stock).keys()].map(i => {
                if (
                  i + 1 ===
                  (this.props.cartItem
                    ? this.props.cartItem.quantity
                    : this.props.quantity)
                ) {
                  return <option selected>{i + 1}</option>
                } else {
                  return <option>{i + 1}</option>
                }
              })}
            </select>
          </form>
        </Card.Body>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  editCart: info => {
    dispatch(editCart(info))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
