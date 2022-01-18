import { React, useCallback, useEffect, useState } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { FiSearch } from 'react-icons/fi'
import dog from '../img/dog.jpg'
import Loading from '../pages/Loading'
import { Cookies, useCookies } from 'react-cookie'
import Fade from 'react-reveal/Fade'
import { RiEditCircleFill } from 'react-icons/ri'
import { AiFillInstagram } from 'react-icons/ai'
import Logo from '../assets/logo.png'
import { useFilterContext } from '../context/FilterProvider'
import AffiliateListModal from './AffiliateListModal'
import { useLocation } from 'react-router-dom'

import { FaTrash } from 'react-icons/fa'
import { BsFillEnvelopeFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import ModalEditShopProfile from './ModalEditShopProfile'
import EditAffiliateAdsModal from './EditAffiliateAdsModal'
import { LinkContainer } from 'react-router-bootstrap'

const url = 'https://new.louneh.louneh.com/admin/ShopAds/API/_myShop'
const UsualPetShop = () => {
  const { pathname } = useLocation()
  const shopId = pathname.split('/')[2]

  const [loading, setLoading] = useState(false)

  const {
    affiliateListOpen,
    shopInfo,
    setShopInfo,
    shopAds,
    setShopAds,
    editProfileModalOpen,
    editAffiliateAdsModalOpen,
    affiliateId,
    setAffiliateId,
  } = useFilterContext()

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getShopInfo = useCallback(async () => {
    try {
      setLoading(true)
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          individualId: shopId,
          page: 1,
        }),
      })

      setLoading(false)
      const content = await rawResponse.json()
      setShopInfo(content.data.shop)
      setShopAds(content.data.ads)
    } catch (error) {
      console.log(error)
    }
  }, [url])

  useEffect(() => {
    getShopInfo()
  }, [url])

  if (shopInfo === null) {
    return false
  } else {
    return (
      <>
        <Header />
        <div style={{ minHeight: '60vh' }}>
          <div className='row mx-5' style={{ justifyContent: 'center' }}>
            <div
              className='col-lg-8 col-md-10 col-sm-10 col-12 mt-5'
              style={{
                backgroundColor: '#ffffff',
                borderTopRightRadius: '25px',
                borderTopLeftRadius: '25px',
                borderBottomRightRadius: '25px',
                borderBottomLeftRadius: '25px',
                padding: '50px',
                boxShadow: '2px 7px 18px 8px rgb(202 186 186 / 50%)',
              }}
            >
              <div className='row' style={{ justifyContent: 'space-between' }}>
                <div className='col-lg-4 row'>
                  <img
                    className='col-lg-8 mb-5'
                    src={shopInfo ? shopInfo['banner'] : null}
                    alt='amin'
                    style={{
                      width: '70%',
                      height: '70%',
                      borderRadius: '25px',
                    }}
                  />
                </div>
                <h3 className=' col-lg-6' style={{ fontWeight: '800' }}>
                  {shopInfo ? shopInfo['shopName'] : null}
                </h3>

                <ModalEditShopProfile />
              </div>
              <h4 className='mt-1' style={{ fontSize: '17px' }}>
                فروشنده : {shopInfo ? shopInfo['individualName'] : null}
              </h4>

              <h4 className='mt-4' style={{ fontSize: '17px' }}>
                توضیحات فروشگاه :
                <p
                  className='mt-4'
                  style={{
                    fontSize: '18px',
                    fontWeight: '100',
                    lineHeight: '30px',
                  }}
                >
                  {shopInfo ? shopInfo['shopDetails'] : null}
                </p>
              </h4>
            </div>

            <div
              className='col-lg-3 mx-3 col-md-10 col-sm-10 col-12 mt-5'
              style={{
                backgroundColor: '#ffffff',
                borderTopRightRadius: '25px',
                borderTopLeftRadius: '25px',
                borderBottomRightRadius: '25px',
                borderBottomLeftRadius: '25px',
                padding: '30px',
                boxShadow: '2px 7px 18px 8px rgb(202 186 186 / 50%)',
              }}
            >
              <h4 className='mt-5' style={{ fontWeight: '800' }}>
                اطلاعات تماس
              </h4>
              <h4 className='mt-4' style={{ fontSize: '15px' }}>
                {' '}
                شماره تماس: {shopInfo ? shopInfo['individualMobile'] : null}
              </h4>
              {shopInfo && shopInfo['individualSocial'] ? (
                <>
                  {' '}
                  <h4
                    className='mt-4'
                    style={{ fontSize: '15px', lineBreak: 'anywhere' }}
                  >
                    {' '}
                    ایمیل : {shopInfo && shopInfo['individualSocial']['email']}
                  </h4>
                  <h4 className='mt-4' style={{ fontSize: '15px' }}>
                    {' '}
                    اینستاگرام :{' '}
                    {shopInfo && shopInfo['individualSocial']['instagram']}
                  </h4>
                </>
              ) : null}

              <img className='mt-5 w-50' src={Logo} alt='logo' />
            </div>
          </div>

          <Fade right>
            <div className='mt-5 row text-center mx-5 justify-content-center'>
              {shopAds &&
                shopAds.map((e) => {
                  return (
                    <div className='col-lg-3 col-md-10 col-sm-12 col-12 mt-5'>
                      <img
                        src={e.adImage}
                        className='image-size '
                        style={{
                          width: '100%',
                          height: '50%',
                          borderTopLeftRadius: '25px',
                          borderTopRightRadius: '25px',
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
                          boxShadow: '0px 2px 26px 23px rgb(173 168 168 / 43%)',
                        }}
                      >
                        <h5
                          className='title-font lineBreak'
                          style={{ textAlign: 'right' }}
                        >
                          {e.adName}
                        </h5>
                        <div
                          className='d-flex mt-3'
                          style={{
                            justifyContent: 'inherit',
                          }}
                        >
                          <h4 style={{ fontWeight: '200', fontSize: '15px' }}>
                            {e.adPrice ? nummber(e.adPrice) : 'توافقی'}
                            {e.adPrice ? ' تومان ' : null}
                          </h4>
                          <LinkContainer
                            to={`/affiliateAds/${e.shopAdId}`}
                            style={{ color: '#ff9801', cursor: 'pointer' }}
                          >
                            <h5 size={25}>بیشتر ...</h5>
                          </LinkContainer>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </Fade>

          <LogoFooter />
        </div>
      </>
    )
  }
}

export default UsualPetShop
