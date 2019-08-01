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
          <img src={this.props.imageUrl} />
          <h4>{this.props.title}</h4>
          <h3>{this.props.price / 100}</h3>
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
