import React, { useState, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import tiger from '../img/tiger.jpg'
import dog from '../img/dog.jpg'
import cat from '../img/cat.jpg'
import { useFilterContext } from '../context/FilterProvider'
import Loading from './Loading'
import { LinkContainer } from 'react-router-bootstrap'

import kasko from '../img/kasko.jpg'
export default function Carousel() {
  const { mainCat } = useFilterContext()
  if (mainCat == null) {
    return <Loading />
  }
  const slickDefaults = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  }

  return (
    <div className=' justify-content-center ' style={{ marginTop: '3rem' }}>
      <div className='row mx-2' style={{ justifyContent: 'center' }}>
        <Slider {...slickDefaults}>
          {mainCat
            ? mainCat.map((cat) => {
                return (
                  <>
                    <LinkContainer
                      key={cat.id}
                      to={`/articles/${cat.name}/${cat.id}`}
                      className=' overlayBackground   cat mx-2 my-2 p-5 '
                    >
                      <div>
                        <img
                          src={cat.icon}
                          style={{
                            fontSize: '3rem',
                            marginTop: '15px',
                            width: '25%',
                          }}
                          alt={cat.name}
                        />
                        <h6 className='cat-title '>{cat.name}</h6>
                      </div>
                    </LinkContainer>
                  </>
                )
              })
            : null}
        </Slider>
      </div>
    </div>
  )
}
