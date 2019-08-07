import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {addToCurrentCart} from '../store/currentCart'
import {browserHistory} from 'react-router'
import {Card, Row, Col} from 'react-bootstrap'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      productId: null,
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      productId: Number(this.props.match.params.id)
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: Number(event.target.value)
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addToCurrentCart(this.state)
    this.props.history.push('/products')
  }

  render() {
    const currentProduct = this.props.products.find(
      product => product.id === Number(this.props.match.params.id)
    )
    if (!currentProduct) {
      return <h1>Loading!</h1>
    } else {
      return (
        <div className="singleProductPage">
          <Card>
            <Row>
              <Col>
                <img src={currentProduct.imageUrl} />
              </Col>
              <Col>
                <Card.Title className="product-title">
                  {currentProduct.title}
                </Card.Title>
                <small className="text-muted">
                  Price: ${currentProduct.price / 100}
                </small>
                <Card.Text>Description: {currentProduct.description}</Card.Text>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    {currentProduct.stock === 0 ? (
                      <div>Out of stock!</div>
                    ) : (
                      <div>
                        <label>Quantity:</label>
                        <select
                          type="text"
                          name="quantity"
                          value={this.state.quantity}
                          onChange={this.handleChange}
                        >
                          {[...Array(+currentProduct.stock).keys()].map(i => {
                            return <option>{i + 1}</option>
                          })}
                        </select>
                        <button type="submit">Add to cart</button>
                      </div>
                    )}
                  </div>
                </form>
              </Col>
            </Row>
          </Card>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts
})

const mapDispatchToProps = dispatch => ({
  addToCurrentCart: info => {
    dispatch(addToCurrentCart(info))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
