import React, { useState, useEffect, useRef, useCallback } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Cookies, useCookies } from 'react-cookie'

const url =
  'https://new.louneh.louneh.com/admin/Categories/API/_get10RandomCats'
export default function Carousel({ id, name }) {
  const [cookiesStateid, setCookieStateid, removeCookieStateid] = useCookies([
    'stateid',
  ])
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const slickDefaults = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 5,
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

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const [randAd, setRandAd] = useState('')
  const getPetGram = useCallback(async () => {
    axios
      .post(
        url,
        {
          catId: id,
          stateId: cookiesStateid['stateid'],
          cityId: cookiesCityid['cityid'],
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        setRandAd(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    getPetGram()
  }, [])

  return (
    <div
      style={{ cursor: 'pointer' }}
      className='my-2 row text-center mx-5 justify-content-center'
    >
      <Slider {...slickDefaults}>
        {randAd &&
          randAd.map((e) => {
            return (
              <div
                key={e.id}
                className='col-lg-3 col-md-10 col-sm-12 col-12 mt-5'
              >
                <img
                  src={e.image}
                  className='image-size slider-img '
                  style={{
                    width: '80%',
                    borderTopLeftRadius: '25px',
                    borderTopRightRadius: '25px',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                  }}
                  alt={e.name}
                />
                <div
                  className='mb-5 justify-content-between image-size'
                  style={{
                    width: '80%',

                    padding: '15px',
                    textAlign: 'left',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px',
                    borderBottomLeftRadius: '25px',
                    borderBottomRightRadius: '25px',
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #9c9c9c',
                  }}
                >
                  <h5 className='title-font' style={{ textAlign: 'right' }}>
                    {e.name}
                  </h5>
                  <div
                    className='d-flex mt-3'
                    style={{ justifyContent: 'inherit' }}
                  >
                    {e.price ? <h4>{nummber(e.price)}</h4> : <h4>رایگان</h4>}
                    <LinkContainer
                      style={{ color: '#ff9800', cursor: 'pointer' }}
                      to={`/articles/${name}/${id}/${e.id}`}
                    >
                      <h5>بیشتر ...</h5>
                    </LinkContainer>
                  </div>
                </div>
              </div>
            )
          })}
      </Slider>
    </div>
  )
}
