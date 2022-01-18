import { React, useState, useCallback, useEffect } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { FiSearch } from 'react-icons/fi'
import dog from '../img/dog.jpg'
import Fade from 'react-reveal/Fade'
import { RiEditCircleFill } from 'react-icons/ri'
import Loading from '../pages/Loading'
import { useFilterContext } from '../context/FilterProvider'
import AllMallModal from './AllMallModal'
import { LinkContainer } from 'react-router-bootstrap'
const url = 'https://new.louneh.louneh.com/admin/ShopAds/API/_getAllShopAds'
const Foroshgah = () => {
  const { allMallModalShow } = useFilterContext()
  const [foroshgah, setForoshgah] = useState([])
  const { btnActive, setBtnActive } = useFilterContext()
  const [i, setI] = useState(0)
  const [loading, setLoading] = useState(false)

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const getForoshgah = async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          page: i + 1,
        }),
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()

      setForoshgah([...foroshgah, ...content.data.list])
      if (content.data.hasNext) {
        setBtnActive(false)
        setI(i + 1)
        setLoading(false)
      } else {
        setBtnActive(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getForoshgah()
  }, [])
  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className=' text-center mt-5' style={{ fontSize: '33px' }}>
          محصولات
        </h4>

        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
          <button
            className='mainBtn text-center col-lg-2 col-md-3 col-sm-4 col-5 mr-5'
            onClick={allMallModalShow}
          >
            همه فروشگاه ها
          </button>
        </div>

        <AllMallModal />
        <Fade right>
          <div className='mt-5 row text-center mx-5 justify-content-center'>
            {foroshgah &&
              foroshgah.map((e) => {
                return (
                  <LinkContainer
                    to={`/affiliateAds/${e.shopAdId}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      className='col-lg-3 col-md-10 col-sm-12 col-12 mt-5'
                      style={{ cursor: 'pointer', height: '360px' }}
                    >
                      <div
                        className=' justify-content-between image-size'
                        style={{
                          width: '100%',
                          margin: 'auto',
                          padding: '15px',
                          textAlign: 'left',
                          borderTopLeftRadius: '25px',
                          borderTopRightRadius: '25px',
                          borderBottomLeftRadius: '0px',
                          borderBottomRightRadius: '0px',
                          border: '1px solid #c3c3c3',
                          // boxShadow: '0px 0px 10px 15px rgb(173 168 168 / 43%)',
                        }}
                      >
                        <div className='d-flex justify-content-between'>
                          <h6
                            className='title-font'
                            style={{ textAlign: 'right', fontWeight: '200' }}
                          >
                            {e.shopName}
                          </h6>
                          <h5
                            className='title-font'
                            style={{
                              textAlign: 'right',
                              marginTop: '4px',
                              color: '#5a5752',
                            }}
                          >
                            {e.individualName}
                          </h5>
                        </div>
                      </div>
                      <img
                        src={e.image}
                        className='image-size '
                        style={{
                          width: '100%',
                          height: '60%',
                          borderTopLeftRadius: '0px',
                          borderTopRightRadius: '0px',
                          borderBottomLeftRadius: '0px',
                          borderBottomRightRadius: '0px',
                        }}
                        alt='cat'
                      />
                      <div
                        className=' justify-content-between image-size'
                        style={{
                          width: '100%',
                          margin: 'auto',
                          padding: '15px',
                          textAlign: 'left',
                          borderTopLeftRadius: '0px',
                          borderTopRightRadius: '0px',
                          borderBottomLeftRadius: '25px',
                          borderBottomRightRadius: '25px',
                          border: '1px solid #c3c3c3',
                          // boxShadow: '0px 2px 26px 23px rgb(173 168 168 / 43%)',
                        }}
                      >
                        <h5
                          className='title-font'
                          style={{ textAlign: 'right' }}
                        >
                          {e.adName}
                        </h5>
                        <div
                          className='d-flex mt-3'
                          style={{ justifyContent: 'inherit' }}
                        >
                          <h4>{nummber(e.price)} تومان</h4>

                          <h5 style={{ color: '#ff9801' }} size={25}>
                            بیشتر ...
                          </h5>
                        </div>
                      </div>
                    </div>
                  </LinkContainer>
                )
              })}
          </div>
        </Fade>
        {!btnActive ? (
          <div className='my-5  d-flex justify-content-center'>
            <button
              className='mainBtn1 '
              onClick={() => {
                getForoshgah()
                setLoading(true)
              }}
            >
              {loading ? <Loading /> : 'بارگذاری بیشتر'}
            </button>
          </div>
        ) : null}
        <LogoFooter />
      </div>
    </>
  )
}

export default Foroshgah
