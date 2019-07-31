import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import Product from './Product'

class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.getAllProducts()
  }

  render() {
    //delete this comment
    const {product} = this.props
    if (!product) {
      return <h1>Loading!</h1>
    } else {
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
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts())
})

const Products = connect(mapStateToProps, mapDispatchToProps)(AllProducts)

export default Products

//export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
