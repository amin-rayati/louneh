import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FaInfo } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useFilterContext } from '../context/FilterProvider'

const Grid = ({ product }) => {
  const { pathname } = useLocation()
  const url = pathname.split('/')[3]
  const catName = pathname.split('/')[2]

  const date = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-Pe')
  }

  if (product.length < 1) {
    return (
      <div
        className='text-center'
        style={{ marginTop: '12%', marginBottom: '12%' }}
      >
        <h4> آگهی وجود ندارد</h4>
      </div>
    )
  } else {
    return (
      <>
        <div className='row d-flex'>
          {product &&
            product.map((item) => {
              return (
                <LinkContainer
                  key={item.id}
                  to={`/articles/${catName}/${url}/${item.id}`}
                >
                  <div className='col-xl-4 col-lg-6  col-md-6 col-sm-12 col-12 mx-auto  grid-card mt-3'>
                    <img src={item.image} alt='image3' className='grid-image' />

                    <div className='d-flex justify-content-between box'>
                      {item.adType[0] !== 'رایگان ' ? (
                        <p
                          className='title'
                          style={{ color: '#868686', marginTop: '8px' }}
                        >
                          نوع آگهی :
                        </p>
                      ) : null}

                      {item.adType[0] === 'فروش ویژه' ? (
                        <p
                          style={{
                            color: '#ff0000',
                            marginTop: '8px',
                            fontWeight: 'bolder',
                            fontSize: '15px',
                          }}
                        >
                          {item.adType[0]}
                        </p>
                      ) : null}
                      {item.adType[0] === 'آگهی نشان دار' ? (
                        <p
                          style={{
                            color: '#f7ed63',
                            marginTop: '8px',
                            fontWeight: 'bolder',
                            fontSize: '15px',
                          }}
                        >
                          {item.adType[0]}
                        </p>
                      ) : null}
                      {item.adType[0] === 'آگهی فوری' ? (
                        <p
                          style={{
                            color: '#ff8800',
                            marginTop: '8px',
                            fontWeight: 'bolder',
                            fontSize: '15px',
                          }}
                        >
                          {item.adType[0]}
                        </p>
                      ) : null}
                    </div>

                    <h3
                      className='my-5'
                      style={{
                        color: '#453be1',
                        fontSize: '16px',
                        textAlign: 'initial',
                      }}
                    >
                      {item.name}
                    </h3>
                    <div className='d-flex justify-content-between'>
                      <h4
                        className='mt-2 text-right'
                        style={{ color: '#FF9800', fontSize: '13px' }}
                      >
                        {item.price} تومان
                      </h4>

                      <p className='mt-2 mb-0' style={{ color: '#868686' }}>
                        {date(item.date)}
                      </p>
                    </div>
                    {/* <h6
                    className='mt-3'
                    style={{
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#FF9800',
                      fontSize: '13px',
                    }}
                  >
                    توضیحات
                  </h6> */}
                  </div>
                </LinkContainer>
              )
            })}
        </div>
      </>
    )
  }
}

export default Grid
