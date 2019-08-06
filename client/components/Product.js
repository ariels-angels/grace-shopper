import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Row, Col} from 'react-bootstrap'

export default function Product(props) {
  return (
    <Card className="singleProductCard">
      <Link to={`/products/${props.id}`}>
        <Row>
          <Col>
            <Card.Img variant="top" src={props.imageUrl} />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title className="product-title">{props.title}</Card.Title>
            </Card.Body>
            <Card.Text>
              <small className="text-muted">${props.price / 100}</small>
            </Card.Text>
          </Col>
        </Row>
      </Link>
    </Card>
  )
}
