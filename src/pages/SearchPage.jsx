import { React, useState } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { LinkContainer } from 'react-router-bootstrap'
import Loading1 from './PaginationLoading'
import Loading from './Loading'
import { useFilterContext } from '../context/FilterProvider'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const SearchPage = () => {
  const { pathname } = useLocation()
  const searchitem = pathname.split('/')[2]
  const convertDate = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-PE')
  }
  const {
    searchProduct,
    setSearchProduct,
    iSearch,
    setISearch,
    loadingSearch,
    setLoadingSearch,
    btnActiveSearch,
    setBtnActiveSearch,
    search,
    setSearch,
  } = useFilterContext()

  const Search = async () => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Ads/API/_searchAds',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            search: searchitem,
            page: iSearch + 1,
          }),
        }
      )

      const content = await rawResponse.json()
      setSearchProduct([...searchProduct, ...content.data.list])
      if (content.data.hasNext) {
        setBtnActiveSearch(false)
        setISearch(iSearch + 1)
        setLoadingSearch(false)
      } else {
        setBtnActiveSearch(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    Search()
  }, [search])

  if (!searchProduct) {
    return <Loading />
  } else if (searchProduct.length < 1) {
    return (
      <div
        className='container mx-auto '
        style={{
          marginTop: '110px',
          marginBottom: '520px',
        }}
      >
        <div
          className='row'
          style={{ justifyContent: 'center', textAlign: 'center' }}
        >
          <div
            style={{
              border: '1px solid #cfc7c7',
              borderRadius: '15px',

              padding: '50px',
              boxShadow: '0 0 17px 5px rgb(223 222 222 / 50%)',
              cursor: 'pointer',
            }}
            className='col-lg-6 col-md-12 col-sm-12  col-10 mx-5'
          >
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>
              هیچ موردی برای جستجوی شما یافت نشد
            </p>
            <LinkContainer style={{ color: '#ffb135' }} to='/'>
              <p>بازگشت به صفحه اصلی</p>
            </LinkContainer>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Header />
        <div className='text-center mt-5' style={{ minHeight: '60vh' }}>
          <h4
            className=' text-center mt-5'
            style={{ fontSize: '25px', fontWeight: '200' }}
          >
            نتایج جستجو برای {search}
          </h4>
          <>
            <div className='row d-flex container m-auto mt-5'>
              {searchProduct.map((item) => {
                return (
                  <LinkContainer
                    key={item.id}
                    to={`/articles/${item.cat}/${item.catId}/${item.id}`}
                  >
                    <div className='col-xl-4 col-lg-6  col-md-6 col-sm-12 col-12 mx-auto  grid-card mt-3'>
                      <img
                        src={item.image}
                        alt='image3'
                        className='grid-image'
                      />
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
                          {convertDate(item.date)}
                        </p>
                      </div>
                    </div>
                  </LinkContainer>
                )
              })}
            </div>
          </>
          {!btnActiveSearch ? (
            <div className='my-5 d-flex justify-content-center'>
              <button
                className='mainBtn1 '
                onClick={() => {
                  setLoadingSearch(true)
                  Search()
                }}
              >
                {loadingSearch ? <Loading1 /> : 'بارگذاری بیشتر'}
              </button>
            </div>
          ) : null}
        </div>
        <LogoFooter />
      </>
    )
  }
}

export default SearchPage
