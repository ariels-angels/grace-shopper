/* eslint-disable no-lonely-if */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItems from './CartItems'
import {getCurrentCart, deleteFromCart} from '../store/currentCart'
import {CardDeck, Card, Col, Row} from 'react-bootstrap'

class Cart extends Component {
  async componentDidMount() {
    await this.props.getCurrentCart()
  }

  delete(productId) {
    console.log(productId)
    const body = {id: productId}
    this.props.deleteFromCart(body)
  }

  render() {
    const {products, currentCart, user, isLoggedIn} = this.props

    if (isLoggedIn) {
      if (!currentCart) {
        return <h1>Loading</h1>
      } else {
        const cartProducts = currentCart.products
        if (!cartProducts) {
          return <h1>Loading</h1>
        } else {
          return (
            <div className="allCartItems">
              <h1 className="page-head">SHOPPING CART:</h1>
              {!cartProducts[0] ? (
                <h4 className="emptyCart">
                  Your cart is empty! Continue shopping{' '}
                  <Link to="/products">here</Link>
                </h4>
              ) : (
                <div>
                  <CardDeck>
                    {cartProducts.map(cartItem => (
                      <Card className="cartItem">
                        <Row>
                          <Col>
                            <Card.Img
                              variant="top"
                              className="cartImage"
                              src={cartItem.imageUrl}
                            />
                          </Col>
                          <Col>
                            <CartItems key={cartItem.id} {...cartItem} />
                            <button onClick={() => this.delete(cartItem.id)}>
                              Delete Item
                            </button>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </CardDeck>
                  <div>
                    Total ({cartProducts.reduce((accumulator, product) => {
                      return accumulator + product.cartItem.quantity
                    }, 0)}{' '}
                    items): $
                    {cartProducts.reduce((accumulator, product) => {
                      return (
                        accumulator + product.cartItem.quantity * product.price
                      )
                    }, 0) / 100}
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.history.push('/checkout')}
                    >
                      Checkout
                    </button>
                  </div>
                  <div>
                    Continue shopping <Link to="/products">here!</Link>
                  </div>
                  <br />
                </div>
              )}
            </div>
          )
        }
      }
    } else {
      if (!currentCart) {
        return <h1>Loading</h1>
      } else {
        if (!currentCart) {
          return <h1>Loading</h1>
        } else {
          return (
            <div className="allCartItems">
              <h1 className="page-head">SHOPPING CART:</h1>
              {!currentCart[0] ? (
                <h4 className="emptyCart">
                  Your cart is empty! Continue shopping{' '}
                  <Link to="/products">here</Link>
                </h4>
              ) : (
                <div>
                  <CardDeck>
                    {currentCart.map(cartItem => (
                      <Card className="cartItem">
                        <Row>
                          <Col>
                            <Card.Img
                              className="cartImage"
                              variant="top"
                              src={cartItem.imageUrl}
                            />
                          </Col>
                          <Col>
                            <CartItems key={cartItem.id} {...cartItem} />
                            <button onClick={() => this.delete(cartItem.id)}>
                              Delete Item
                            </button>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </CardDeck>
                  <div>
                    Total ({currentCart.reduce((accumulator, product) => {
                      return accumulator + product.quantity
                    }, 0)}{' '}
                    items): $
                    {currentCart.reduce((accumulator, product) => {
                      return accumulator + product.quantity * product.price
                    }, 0) / 100}
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.history.push('/checkout')}
                    >
                      Checkout
                    </button>
                  </div>
                  <div>
                    Continue shopping <Link to="/products">here!</Link>
                  </div>
                  <br />
                </div>
              )}
            </div>
          )
        }
      }
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts,
  currentCart: state.currentCart,
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCurrentCart: () => dispatch(getCurrentCart()),
  deleteFromCart: id => dispatch(deleteFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
