import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }
  render() {
    const currentProduct = this.props.singleProduct
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

const mapStateToProps = state => ({
  singleProduct: state.singleProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
