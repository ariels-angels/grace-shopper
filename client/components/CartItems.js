import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editCart} from '../store/currentCart'

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
        <div>
          <Link to={`/products/${this.props.id}`}>
            <img src={this.props.imageUrl} />
            <h4>{this.props.title}</h4>
          </Link>
          <h5>{this.props.price / 100}</h5>
          <form>
            <label>Quantity:</label>
            <select
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                if (num === this.props.cartItem.quantity) {
                  return <option selected>{num}</option>
                } else {
                  return <option>{num}</option>
                }
              })}
            </select>
          </form>
        </div>
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
