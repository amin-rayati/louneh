import React, { useState, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useFilterContext } from '../context/FilterProvider'
import { LinkContainer } from 'react-router-bootstrap'

export default function Carousel({ ...slickProps }) {
  const slider = useRef()
  const { mainCat } = useFilterContext()
  const slickDefaults = {
    dots: true,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 4,
    speed: 200,
    arrows: true,
  }

  const onNext = () => {
    slider.current.slickNext()
  }
  const onPrev = () => {
    slider.current.slickPrev()
  }

  return (
    <Slider
      {...slickDefaults}
      {...slickProps}
      ref={slider}
      className='carousel'
      beforeChange={(_currentSlide, slideIndex) => {
        if (slider.current) {
          // The error occurs here
          const slideElement = slider.current.innerSlider.list.querySelector(
            `[data-index="${slideIndex}"]`
          )

          if (slideElement) {
            const images = slideElement.getElementsByTagName('IMG')
            for (let i = 0; i < images.length; i++) {
              const image = images[i]
              const lazySrc = image.getAttribute('data-lazy')
              if (lazySrc) {
                image.setAttribute('src', lazySrc)
                image.removeAttribute('data-lazy')
              }
            }
          }
        }
      }}
    >
      <div className=' justify-content-center ' style={{ marginTop: '5rem' }}>
        <div className='row mx-2' style={{ justifyContent: 'center' }}>
          {mainCat
            ? mainCat.map((cat) => {
                return (
                  <>
                    <LinkContainer
                      key={cat.id}
                      to={`/articles/${cat.id}`}
                      className='col-lg-3 col-md-8 col-sm-10 col-10 overlayBackground  maincatbox text-center cat mx-2 my-2 p-5 '
                      style={{
                        backgroundImage: `url(${cat.banner})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <div>
                        <img
                          src={cat.icon}
                          style={{
                            fontSize: '3rem',
                            marginTop: '15px',
                            width: '45%',
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
        </div>
      </div>
    </Slider>
  )
}
