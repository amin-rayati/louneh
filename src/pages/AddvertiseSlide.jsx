import React, { useState, useRef, useCallback, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import tiger from '../img/tiger.jpg'
import dog from '../img/dog.jpg'
import cat from '../img/cat.jpg'
import kasko from '../img/kasko.jpg'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'

export default function Carousel() {
  const [banner, setBanner] = useState('')

  const link = (url) => {
    window.open(url, '_blank')
  }
  const getBanner = useCallback(async () => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Banners/API/_GetBanners',
        {
          method: 'POST',

          headers: {
            token: 'test',
          },
        }
      )
      const content = await rawResponse.json()

      setBanner(content.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getBanner()
  }, [])
  const slickDefaults = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div
      style={{ cursor: 'pointer' }}
      className='my-5 row text-center mx-5 justify-content-center'
    >
      <Slider {...slickDefaults}>
        {banner &&
          banner.map((e) => {
            return (
              <div
                className='col-lg-3 col-md-10 col-sm-12 col-12 mt-5'
                onClick={() => link(e.banner_link)}
              >
                <img
                  src={e.banner_image}
                  className='image-size '
                  style={{
                    width: '90%',
                    height: '200px',
                    borderTopLeftRadius: '25px',
                    borderTopRightRadius: '25px',
                    borderBottomLeftRadius: '25px',
                    borderBottomRightRadius: '25px',
                  }}
                  alt='cat'
                />
              </div>
            )
          })}
      </Slider>
    </div>
  )
}
