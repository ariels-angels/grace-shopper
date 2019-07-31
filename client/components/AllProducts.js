import React from 'react'
import {connect} from 'react-redux'
import Product from './Product'

class AllProducts extends React.Component {
  render() {
    //delete this comment
    const {product, user} = this.props
    if (!product) {
      return <h1>Loading!</h1>
    } else {
      //example of user:
      console.log(this.props)
      return (
        <div>
          {product.map(currentProduct => {
            return <Product key={currentProduct.id} {...currentProduct} />
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  product: state.allProducts,
  user: state.user
})

const Products = connect(mapStateToProps, null)(AllProducts)

export default Products

//export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
