import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const products = this.props.productList
    console.log('products>>>>>>>>>>>>>>>>>>>>', products)
    return <div>hello</div>
  }
}

const mapStateToProps = state => ({
  productList: state.product.productList
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts())
})

const Products = connect(mapStateToProps, mapDispatchToProps)(AllProducts)

export default Products

//export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
