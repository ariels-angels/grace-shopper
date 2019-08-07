import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Col} from 'react-bootstrap'

const NavigationBar = ({handleClick, isLoggedIn, currentCart}) => (
  <div>
    <Navbar sticky="top" id="navbar" bg="light" expand="lg">
      <Col>
        <Link to="/">
          <Navbar.Brand id="mainTitle">GRACE-SHREDDER</Navbar.Brand>
        </Link>
      </Col>
      <Col>
        <nav>
          {isLoggedIn ? (
            <div className="navOptions">
              {/* The NavigationBar will show these links after you log in */}
              <Link to="/products">PRODUCTS</Link>
              <Link to="/">HOME</Link>
              <a href="#" onClick={handleClick}>
                LOGOUT
              </a>
              <Link to="/pastCarts">ORDER HISTORY</Link>
              {!currentCart.products ? (
                <Link to="/cart">CART {'(0)'}</Link>
              ) : (
                <Link to="/cart">
                  CART{' ('}
                  {currentCart.products.reduce((acc, product) => {
                    return acc + product.cartItem.quantity
                  }, 0)}
                  {')'}
                </Link>
              )}
            </div>
          ) : (
            <div className="navOptions">
              {/* The NavigationBar will show these links before you log in */}
              <Link to="/">HOME</Link>
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">SIGN-UP</Link>
              <Link to="/products">PRODUCTS</Link>
              {!currentCart.length ? (
                <Link to="/cart">CART {'(0)'}</Link>
              ) : (
                <Link to="/cart">
                  CART{' ('}
                  {currentCart.reduce((acc, product) => {
                    return acc + product.quantity
                  }, 0)}
                  {')'}
                </Link>
              )}
            </div>
          )}
        </nav>
      </Col>
      <hr />
    </Navbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  currentCart: state.currentCart
})

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavigationBar)

/**
 * PROP TYPES
 */
NavigationBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
