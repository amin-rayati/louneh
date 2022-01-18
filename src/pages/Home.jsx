import { React, useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from './Loading'
import Header from '../components/Header_bg'
import { useFilterContext } from '../context/FilterProvider'
import LogoFooter from '../components/LogoFooter'
import dog from '../img/dog1.jpg'
import AdvertiseSlide from './AddvertiseSlide'
import DocSlider from './DocSlider'
import MAinCatSlider from './MainCatSlider'
import SearchPage from './SearchPage'
import { Cookies, useCookies } from 'react-cookie'

const Home = () => {
  const {
    mainCat,
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
  const [siteInfo, setSiteInfo] = useState('')

  const handleSearchChange = (e) => {
    setSearchProduct([])
    setISearch(0)
    setSearch(e.target.value)
  }
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
            search: search,
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

  const getSiteInfo = async () => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Infos/API/_getInformations',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setSiteInfo(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.location.href = `/searchpage/${search}`
    }
  }

  useEffect(() => {
    getSiteInfo()
  }, [])

  if (mainCat == null) {
    return <Loading />
  }
  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <div className='d-flex justify-content-center text-center '>
          <div className='input-group mt-5 w-50'>
            <LinkContainer
              to={`/searchpage/${search}`}
              style={{
                background: '#ff9800',
                color: '#fff',
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
              }}
            >
              <button onClick={Search} type='button' className='search-btn btn'>
                جستجو
              </button>
            </LinkContainer>

            <input
              onChange={handleSearchChange}
              value={search}
              onKeyDown={handleKeyDown}
              id='inputSearch'
              type='search'
              className='form-control  text-right'
              placeholder='...جستجو'
              aria-label='Search'
              aria-describedby='search-addon'
              style={{
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px',
              }}
            />
          </div>
        </div>
        <div className='container justify-content-center'>
          <MAinCatSlider />
          <div className='mt-3'>
            <h4 style={{ fontSize: '30px', fontWeight: 'bolder' }}>
              درباره لونه
            </h4>

            <p
              style={{
                fontWeight: '500',
                fontSize: '13px',
                textAlign: 'justify',
                marginTop: '40px',
                lineHeight: '40px',
              }}
            >
              {siteInfo && siteInfo[0]['aboutUs']}
            </p>
          </div>
        </div>

        <AdvertiseSlide />

        {mainCat &&
          mainCat.map((e) => {
            return (
              <>
                <div className='row mx-5 mt-5'>
                  <h2
                    style={{ fontSize: '19px' }}
                    className='col-lg-10 col-md-8 col-sm-8 col-8  font-random'
                  >
                    آگهی های {e.name}
                  </h2>
                  <LinkContainer
                    to={`/articles/${e.name}/${e.id}`}
                    style={{ color: '#ff9800', cursor: 'pointer' }}
                  >
                    <h5 className='col-lg-2 col-md-4 col-sm-4 col-4  font-random'>
                      نمایش همه
                    </h5>
                  </LinkContainer>
                </div>
                <DocSlider id={e.id} name={e.name} />
              </>
            )
          })}

        <LogoFooter />
      </div>
    </>
  )
}

export default Home
