import React from 'react'
import { FaInfo } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'
import { useFilterContext } from '../context/FilterProvider'

const List = ({ product }) => {
  const { pathname } = useLocation()
  const url = pathname.split('/')[3]
  const catName = pathname.split('/')[2]

  const date = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-PE')
  }
  if (product.length < 1) {
    return (
      <div
        className='text-center'
        style={{ marginTop: '31%', marginBottom: '12%' }}
      >
        <h4> آگهی وجود ندارد</h4>
      </div>
    )
  } else {
    return (
      <>
        <div>
          {product.map((item) => {
            return (
              <LinkContainer
                key={item.id}
                to={`/articles/${catName}/${url}/${item.id}`}
              >
                <div key={item.id} className='row mt-5 list-card'>
                  <div className='col-lg-4'>
                    <img src={item.image} alt='image1' className='list-image' />
                  </div>
                  <div className='col-lg-8 d-flex flex-column'>
                    <div className='d-flex justify-content-between box-list margin'>
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
                    <div style={{ position: 'fixed-bottom' }}>
                      <h3
                        style={{
                          color: '#453be1',
                          fontSize: '16px',
                          textAlign: 'initial',
                          marginTop: '30px',
                        }}
                      >
                        {item.name}
                      </h3>
                      <p style={{ color: '#868686' }}>{item.details}</p>
                      <div className='d-flex justify-content-between'>
                        <h4
                          className='mt-2 text-right'
                          style={{ color: '#FF9800' }}
                        >
                          {item.price}
                        </h4>

                        <p className='mt-2 mb-0' style={{ color: '#868686' }}>
                          {date(item.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            )
          })}
        </div>
      </>
    )
  }
}

export default List
