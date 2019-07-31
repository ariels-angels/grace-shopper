import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  render() {
    const {products} = this.props
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
            <li>Price: ${currentProduct.price}</li>
            <li>Rating: {currentProduct.rating}/10</li>
            <li>Description: {currentProduct.description}</li>
          </p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts
})

export default connect(mapStateToProps, null)(SingleProduct)
