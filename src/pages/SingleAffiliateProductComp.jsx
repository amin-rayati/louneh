import { React, useState } from 'react'
import { AiFillCalendar, AiOutlinePhone } from 'react-icons/ai'
import { FiShare2, FiBookmark } from 'react-icons/fi'
import { FaBookmark } from 'react-icons/fa'
import Loading from '../pages/Loading'
import LogoFooter from '../components/LogoFooter'
import { Cookies, useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { RiEditCircleFill } from 'react-icons/ri'
import { useFilterContext } from '../context/FilterProvider'
import { BsFillPlusCircleFill } from 'react-icons/bs'
const url = 'https://new.louneh.louneh.com/admin/Bookmarks/API/_bookmark'

const SingleAffiliateProductComp = ({ singleAffiliate }) => {
  const {
    adAffiliate,
    adAffiliatePrice,
    adBrand,
    adDate,
    adDetails,
    adGender,
    adId,
    adImage,
    adMobile,
    adName,
    adPetName,
    adPrice,
    adStatus,
    adTypeId,
    adVideo,
    catId,
    cityId,
    coopration_id,
    individualId,
    lastSubCatId,
    priceTypeId,
    regionId,
    sellerIndividualId,
    shopAdId,
    stateId,
  } = singleAffiliate

  const [bookmark, setBokkmark] = useState(false)
  const [showmobile, setShowMObile] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  let individualId1 = cookies['user'] ? cookies['user'].individual_id : 0

  const [image0, setImage0] = useState(true)
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const Image0 = () => {
    setImage0(true)
    setImage1(false)
    setImage2(false)
  }
  const Image1 = () => {
    setImage0(false)
    setImage1(true)
    setImage2(false)
  }
  const Image2 = () => {
    setImage0(false)
    setImage1(false)
    setImage2(true)
  }
  const ShowPhone = () => {
    if (cookies['user']) {
      setShowMObile(true)
    } else {
      setShowMObile(false)
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'اول باید وارد سایت شوید کنید',
      })
    }
  }
  const Bookmark = async () => {
    if (cookies['user']) {
      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            adId: shopAdId,
            individualId: individualId1,
          }),
        })
        const content = await rawResponse.json()

        if (content.data === 'آگهی بوکمارک شد') {
          setBokkmark(true)
        } else {
          setBokkmark(false)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setShowMObile(false)
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'اول باید وارد سایت شوید کنید',
      })
    }
  }
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const convertDate = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-PE')
  }

  if (singleAffiliate.length < 1) {
    return <Loading />
  } else {
    return (
      <>
        <div
          className=' container'
          style={{ marginTop: '100px', marginBottom: '100px' }}
        >
          <div className='row mx-2'>
            <div className='col-lg-8 order-lg-1 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 single_card mt-3 text-center'>
              {image0 ? (
                <img className='single_img' src={adImage[0]} alt='pic' />
              ) : null}
              {image1 ? (
                <img className='single_img' src={adImage[1]} alt='pic' />
              ) : null}
              {image2 ? (
                <img className='single_img' src={adImage[2]} alt='pic' />
              ) : null}

              <div className='flex'>
                <img
                  onClick={Image0}
                  className='col-lg-3 mx-3 col-md-6 col-sm-6 col-6 mt-3 single_img-sm'
                  src={adImage[0] ? adImage[0] : null}
                  style={{ width: '20%', height: '150px' }}
                  alt='a'
                />
                {adImage[1] ? (
                  <img
                    onClick={Image1}
                    className='col-lg-3 mx-3 col-md-6 col-sm-6 col-6 mt-3 single_img-sm'
                    src={adImage[1] ? adImage[1] : null}
                    style={{ width: '20%', height: '150px' }}
                    alt='a'
                  />
                ) : null}

                {adImage[2] ? (
                  <img
                    onClick={Image2}
                    className='col-lg-3 mx-3 col-md-6 col-sm-6 col-6 mt-3 single_img-sm'
                    src={adImage[2] ? adImage[2] : null}
                    style={{ width: '20%', height: '150px' }}
                    alt='a'
                  />
                ) : null}
              </div>

              <div className='mt-5 d-flex justify-content-between justify'>
                {priceTypeId === 1 ? (
                  <p className='price-p' style={{ fontSize: '25px' }}>
                    رایگان
                  </p>
                ) : (
                  <p className='price-p' style={{ fontSize: '25px' }}>
                    {nummber(adPrice - adAffiliatePrice)} تومان
                  </p>
                )}

                <div className='d-flex  mt-4 m-sm '>
                  <AiFillCalendar size={20} style={{ color: '#ff9800' }} />

                  <p style={{ color: '#6d7588', marginRight: '10px' }}>
                    {convertDate(adDate)}
                  </p>
                </div>
              </div>

              <div
                className='product_details_title mx-1'
                style={{ textAlign: 'initial' }}
              >
                <h5 className='underline mx-3'>مشخصات: </h5>
                <p className='m-0 mt-3' style={{ color: '#6d7588' }}>
                  <h5>نام : </h5> {adPetName}
                </p>
                <p
                  className='m-0 mt-3'
                  style={{ color: '#6d7588', lineBreak: 'auto' }}
                >
                  <h5>توضیحات : </h5> {adDetails}
                </p>
              </div>
              <button className='mainBtn float-left ' onClick={ShowPhone}>
                {showmobile && cookies['user'] ? adMobile : 'اطلاعات تماس'}
              </button>
            </div>
            <div className='col-lg-4  order-lg-2 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 box-m-top'>
              <div className='product_details_title  single_card mt-3'>
                <h5 className='underline mx-3'>عملیات : </h5>
                <div
                  className='d-flex justify-content-around mt-3'
                  style={{ color: '#6d7588' }}
                >
                  <div
                    className='d-flex flex-column share-icon'
                    onClick={ShowPhone}
                  >
                    <AiOutlinePhone size={30} className='m-auto' />
                    <span className='mt-3'>اطلاعات تماس</span>
                  </div>

                  {!bookmark ? (
                    <div
                      className='d-flex flex-column share-icon'
                      onClick={() => {
                        Bookmark()
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FiBookmark size={30} className='m-auto' />

                      <span className='mt-3'> نشان نشده</span>
                    </div>
                  ) : (
                    <div
                      className='d-flex flex-column share-icon'
                      onClick={() => {
                        Bookmark()
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaBookmark
                        size={25}
                        style={{ color: '#ff9800' }}
                        className='m-auto'
                      />
                      <span className='mt-3' style={{ color: '#ff9800' }}>
                        {' '}
                        نشان شده
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <LogoFooter className='mt-4' />
      </>
    )
  }
}

export default SingleAffiliateProductComp
