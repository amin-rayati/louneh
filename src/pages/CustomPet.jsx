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
import { FaTrash } from 'react-icons/fa'
import { BsFillEnvelopeFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import ModalEditShopProfile from './ModalEditShopProfile'
import EditAffiliateAdsModal from './EditAffiliateAdsModal'
import axios from 'axios'
import Error from './Error'

const url = 'https://new.louneh.louneh.com/admin/ShopAds/API/_myShop'
const CustomPet = () => {
  const { btnActive, setBtnActive } = useFilterContext()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [i, setI] = useState(0)
  const [btnActive1, setBtnActive1] = useState(false)
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

  const openModal = (id) => {
    setAffiliateId(id)
    editAffiliateAdsModalOpen()
  }

  const getShopInfo = async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          individualId: cookies['user'].individual_id,
          page: i + 1,
        }),
      })
      setLoading(false)
      const content = await rawResponse.json()
      setShopAds([...shopAds, ...content.data.ads])
      if (content.data.hasNext) {
        setBtnActive1(false)
        setBtnActive(false)
        setI(i + 1)
        setLoading(false)
      } else {
        setBtnActive(true)
      }
      setShopInfo(content.data.shop)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAds = (id) => {
    Swal.fire({
      text: 'ایا از حذف آگهی خود اطمینان دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1fb811',
      cancelButtonColor: '#ff8900',
      cancelButtonText: 'خیر',
      confirmButtonText: 'حذف آگهی',
      preConfirm: async () => {
        try {
          const rawResponse = await fetch(
            'https://new.louneh.louneh.com/admin/ShopAds/API/_deleteShopAd',
            {
              method: 'POST',
              headers: {
                token: 'test',
              },
              body: JSON.stringify({
                shopAdId: id,
              }),
            }
          )

          const content = await rawResponse.json()
          if (content.isDone) {
            try {
              const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                  token: 'test',
                },
                body: JSON.stringify({
                  individualId: cookies['user'].individual_id,
                  page: 1,
                }),
              })
              setLoading(false)
              const content = await rawResponse.json()
              setShopAds(content.data.ads)
              setShopInfo(content.data.shop)
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
    })
  }

  useEffect(() => {
    getShopInfo()
  }, [])

  if (shopInfo === '') {
    return <Error />
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
                <h3 className=' col-lg-4' style={{ fontWeight: '800' }}>
                  {shopInfo ? shopInfo['shopName'] : null}
                </h3>
                <h5
                  onClick={editProfileModalOpen}
                  className='col-lg-3'
                  style={{ color: '#ff9801', cursor: 'pointer' }}
                  size={25}
                >
                  ویرایش پروفایل
                  <RiEditCircleFill
                    style={{ color: '#ff9801', marginRight: '20px' }}
                    size={25}
                  />
                </h5>
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
          </div>
          <div
            className='  '
            style={{ justifyContent: 'center', textAlign: 'center' }}
          >
            <button
              className='mainBtn text-center col-lg-2 col-md-3 col-sm-4 col-5 mr-5'
              style={{ padding: '0px 50px 0px 50px' }}
              onClick={affiliateListOpen}
            >
              افزودن پست
            </button>
          </div>
          <AffiliateListModal />

          <Fade right>
            <div className='mt-5 row text-center mx-5 justify-content-center'>
              {shopAds &&
                shopAds.map((e) => {
                  return (
                    <div
                      style={{ height: '350px' }}
                      className='col-lg-3 col-md-10 col-sm-12 col-12 mt-5'
                    >
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
                          <div>
                            <RiEditCircleFill
                              onClick={() => {
                                openModal(e.shopAdId)
                              }}
                              style={{
                                color: '#ff9801',
                                marginLeft: '20px',
                                cursor: 'pointer',
                              }}
                              size={25}
                            />
                            <EditAffiliateAdsModal shopAdId={e.shopAdId} />
                            <FaTrash
                              onClick={() => deleteAds(e.shopAdId)}
                              style={{ color: '#ff9801', cursor: 'pointer' }}
                              size={25}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </Fade>
          {!btnActive ? (
            <div className='mb-5 d-flex justify-content-center'>
              <button
                className='mainBtn1 '
                onClick={() => {
                  getShopInfo()
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
}

export default CustomPet
