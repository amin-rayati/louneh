import { React, useCallback, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { BsFillHeartFill } from 'react-icons/bs'
import { FaRegBookmark } from 'react-icons/fa'
import DocSlider from './DocSlider'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Carousel from 'react-bootstrap/Carousel'
import dog from '../img/dog.jpg'
import cat from '../img/cat.jpg'
import tiger from '../img/tiger.jpg'
import axios from 'axios'
import { useFilterContext } from '../context/FilterProvider'
const url = 'https://new.louneh.louneh.com/admin/Knows/API/_getSingleKnow'

const Singledoc = () => {
  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  const { single, setSingle } = useFilterContext()

  const getDoc = useCallback(async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          knowId: id,
        }),
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()
      setSingle(content.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getDoc()
  }, [])

  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className='text-center mt-5' style={{ fontSize: '33px' }}>
          دانستنی ها
        </h4>

        <div style={{ textAlign: '-webkit-center' }}>
          <div
            className='mt-5 col-lg-7 col-md-8 col-sm-10 col-10 text-center '
            style={{
              padding: '25px',
              backgroundColor: '#fff',
              borderRadius: '25px',
              boxShadow: '0px 1px 26px 5px rgb(132 132 132 / 63%)',
            }}
          >
            <img
              className='d-block w-60 doc-slider-img doc-image'
              src={single ? single['image'] : null}
              alt='Third slide'
            />

            <h4 className='text-center mt-5' style={{ fontSize: '33px' }}>
              {single ? single['title'] : null}
            </h4>
            <h6
              className='mx-4 doc-text'
              style={{
                marginTop: '30px',
                fontSize: '16px',
                lineHeight: '35px',
                textAlign: 'justify',
              }}
            >
              {single ? single['details'] : null}
            </h6>
          </div>
        </div>

        <LogoFooter />
      </div>
    </>
  )
}

export default Singledoc
