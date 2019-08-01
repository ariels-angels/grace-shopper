import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class CartItems extends React.Component {
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
          <p>Quantity: {this.props.cartItem.quantity}</p>
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
