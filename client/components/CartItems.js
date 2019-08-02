import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class CartItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: this.props.id,
      quantity: this.props.quantity
    }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: Number(event.target.value)
    })
    // axios
  }

  render() {
    const {products, user} = this.props
    if (!products) {
      return <h1>Loading</h1>
    } else {
      console.log(this.props)
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
              <option>{this.props.cartItem.quantity}</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
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

export default connect(mapStateToProps, null)(CartItems)
