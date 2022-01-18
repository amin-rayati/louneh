import React, { useState, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import tiger from '../img/tiger.jpg'
import dog from '../img/dog.jpg'
import cat from '../img/cat.jpg'
import { useFilterContext } from '../context/FilterProvider'

import { LinkContainer } from 'react-router-bootstrap'

import kasko from '../img/kasko.jpg'
export default function Carousel() {
  const { Addmodal, AddClose, mainCat } = useFilterContext()

  const slickDefaults = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className=' justify-content-center '>
      <div className='row' style={{ justifyContent: 'center' }}>
        <Slider {...slickDefaults}>
          {mainCat
            ? mainCat.map((cat) => {
                return (
                  <>
                    <LinkContainer
                      key={cat.id}
                      to={`/addarticles/${cat.name}/${cat.id}`}
                      className='
                         overlayBackground   cat mx-3 my-5 py-1 px-1
                         '
                      onClick={AddClose}
                    >
                      <div>
                        <img
                          src={cat.icon}
                          style={{
                            fontSize: '3rem',
                            marginTop: '15px',
                            width: '30%',
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
