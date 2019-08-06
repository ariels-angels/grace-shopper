import React from 'react'
import {Carousel, Col} from 'react-bootstrap'

export default function Home() {
  return (
    <div id="carouselBody">
      <Carousel id="carouselHead">
        <Carousel.Item>
          <img
            src="https://realsnowboarding.co.uk/wp-content/uploads/2018/01/freestyle-snowboard-lesson-1.jpg"
            className="carousel"
          />
          <Carousel.Caption>
            <h3 className="carouselText">New Fall Arrivals</h3>
            <p className="carouselText">
              The latest fall goods are here and ready to go wherever you’ll
              take them. Check out new bags, jackets, apparel, and more.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://www.pension-zellamsee.com/templates/yootheme/cache/pension-zellamsee006-a1c85e31.jpeg"
            className="carousel"
          />
          <Carousel.Caption>
            <h3 className="carouselText">Something For Everyone</h3>
            <p className="carouselText">
              With products of all sizes and colors, Grace-Shredder is the place
              to shop with the whole family.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://www.pension-zellamsee.com/templates/yootheme/cache/pension-zellamsee004-23226947.jpeg"
            className="carousel"
          />
          <Carousel.Caption>
            <h3 className="carouselText">Lifetime Warranty</h3>
            <p className="carouselText">
              The most sustainable products are the ones that last, which is why
              we back all of our apparel with a LIFETIME WARRANTY.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
