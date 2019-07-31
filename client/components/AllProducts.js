import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'

class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.getAllProducts()
  }

  render() {
    const {product} = this.props
    if (!product) {
      return <h1>Loading!</h1>
    } else {
      return (
        <div>
          {product.map(product => {
            return <p>{product.title}</p>
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
