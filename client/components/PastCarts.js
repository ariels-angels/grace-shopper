/* eslint-disable no-lonely-if */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPastCarts} from '../store/pastCarts'

class PastCarts extends Component {
  async componentDidMount() {
    await this.props.getPastCarts()
  }

  render() {
    const {pastCarts} = this.props
    console.log('PAST>>>>>', pastCarts)
    if (!pastCarts.length) {
      return <div>You have no previous Orders</div>
    } else {
      return (
        <div>
          <h1 className="page-head">Your Order History</h1>
          <br />
          {pastCarts.map(order => {
            return (
              <div>
                <h4>Order purchased on {order.updatedAt.slice(0, 10)}</h4>
                <ul>
                  {order.products.map(product => {
                    return (
                      <li>
                        Product: {product.title}, Quantity:{' '}
                        {product.cartItem.quantity}, Price:{' $'}
                        {product.cartItem.price / 100}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  pastCarts: state.pastCarts
})

const mapDispatchToProps = dispatch => ({
  getPastCarts: () => dispatch(getPastCarts())
})

export default connect(mapStateToProps, mapDispatchToProps)(PastCarts)
