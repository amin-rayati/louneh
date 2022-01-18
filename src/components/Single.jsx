import { React, useState, Component } from 'react'
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
import EditMyAddModal from './EditMyAddModal'
import { useFilterContext } from '../context/FilterProvider'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import BreadCrumbcat from './BreadCrumb/BreadCrumbCat'
const url = 'https://new.louneh.louneh.com/admin/Bookmarks/API/_bookmark'

const Single = ({ singleAd, setSingleAd }) => {
  console.log(singleAd)
  const {
    name,
    priceTypeId,
    gender,
    brand,
    petName,
    id,
    link,
    affiliate,
    affiliate_price,
    date,
    details,
    image,
    price,
    mobile,
    mark,
    priceTypeName,
    video,
    individual_id,
  } = singleAd

  const { pathname } = useLocation()
  const catName = pathname.split('/')[2]
  const catId = pathname.split('/')[3]
  const adId = pathname.split('/')[4]
  const [bookmark, setBokkmark] = useState(mark)
  const [showmobile, setShowMObile] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const { editMyAdModalOpen } = useFilterContext()

  let individualId = cookies['user'] ? cookies['user'].individual_id : 0

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
            adId: adId,
            individualId: individualId,
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
  const addToShop = async (id) => {
    axios
      .post(
        'https://new.louneh.louneh.com/admin/ShopAds/API/_addAdsToShop',
        {
          individualId: cookies['user'].individual_id,
          adId: id,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        if (response.data.isDone) {
          Swal.fire({
            confirmButtonText: 'فهمیدم',
            icon: 'success',
            text: ' آگهی به فروشگاه شما  اضافه شد',
          })
        } else {
          Swal.fire({
            confirmButtonText: 'فهمیدم',
            icon: 'warning',
            text: 'این آگهی در فروشگاه شما وجود دارد',
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const convertDate = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-PE')
  }

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  if (singleAd.length < 1) {
    return <Loading />
  } else {
    return (
      <>
        <div
          className=' container'
          style={{ marginTop: '100px', marginBottom: '100px' }}
        >
          <BreadCrumbcat categoryName={catName} catId={catId} petName={name} />
          <div className='row mx-2'>
            <div className='col-lg-8 order-lg-1 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 single_card mt-3 text-center'>
              <h4
                className='my-3'
                style={{ fontWeight: 'bolder', textAlign: 'right' }}
              >
                گالری عکس{' '}
              </h4>
              {image0 ? (
                <img
                  className='single_img'
                  src={image[0]}
                  alt='pic'
                  style={{ width: '70%' }}
                />
              ) : null}
              {image1 ? (
                <img
                  className='single_img'
                  src={image[1]}
                  alt='pic'
                  style={{ width: '70%' }}
                />
              ) : null}
              {image2 ? (
                <img
                  className='single_img'
                  src={image[2]}
                  alt='pic'
                  style={{ width: '70%' }}
                />
              ) : null}
              <div className='row mt-3' style={{ justifyContent: 'center' }}>
                <div
                  className='col-4'
                  style={{
                    height: '150px',
                  }}
                >
                  <img
                    onClick={Image0}
                    className='mt-3 single_img-sm'
                    src={image[0] ? image[0] : null}
                    style={{
                      width: '100%',
                      objectFit: 'contain',
                      height: '120px',
                      borderRadius: '15px',
                    }}
                    alt='a'
                  />
                </div>
                <div
                  className='col-4'
                  style={{
                    borderRadius: '15px',
                    height: '150px',
                  }}
                >
                  {image[1] ? (
                    <img
                      onClick={Image1}
                      className=' mt-3 single_img-sm'
                      src={image[1] ? image[1] : null}
                      style={{
                        width: '100%',
                        objectFit: 'contain',
                        height: '120px',
                        borderRadius: '15px',
                      }}
                      alt='a'
                    />
                  ) : null}
                </div>
                <div
                  className='col-4'
                  style={{
                    borderRadius: '15px',
                    height: '150px',
                  }}
                >
                  {image[2] ? (
                    <img
                      onClick={Image2}
                      className=' mt-3 single_img-sm'
                      src={image[2] ? image[2] : null}
                      style={{
                        width: '100%',
                        objectFit: 'contain',
                        height: '120px',
                        borderRadius: '15px',
                      }}
                      alt='a'
                    />
                  ) : null}
                </div>
              </div>
              {video.length > 5 ? (
                <h4
                  className='my-3'
                  style={{ fontWeight: 'bolder', textAlign: 'right' }}
                >
                  ویدئو
                </h4>
              ) : null}

              {video.length > 5 ? (
                <video
                  className='video-height  mt-4 bg-dark'
                  style={{ width: '70%', borderRadius: '15px' }}
                  controls='controls'
                  preload='metadata'
                >
                  <source src={video} type='video/mp4' />
                </video>
              ) : null}

              <div className='mt-5 d-flex justify-content-between justify'>
                {priceTypeName === 'رایگان' ? (
                  <p className='price-p' style={{ fontSize: '25px' }}>
                    رایگان
                  </p>
                ) : (
                  <p className='price-p' style={{ fontSize: '25px' }}>
                    {nummber(price)} تومان
                  </p>
                )}

                <div className='d-flex  mt-4 m-sm '>
                  <AiFillCalendar size={20} style={{ color: '#ff9800' }} />

                  <p style={{ color: '#6d7588', marginRight: '10px' }}>
                    {convertDate(date)}
                  </p>
                </div>
              </div>

              <div
                className='product_details_title mx-1'
                style={{ textAlign: 'initial' }}
              >
                <h5 className='underline mx-3'>مشخصات: </h5>
                <p className='m-0 mt-3' style={{ color: '#6d7588' }}>
                  <h5>نام : </h5> {petName}
                </p>
                <p
                  className='m-0 mt-3'
                  style={{ color: '#6d7588', lineBreak: 'anywhere' }}
                >
                  <h5>توضیحات : </h5> {details}
                </p>
              </div>
              <button className='mainBtn float-left ' onClick={ShowPhone}>
                {showmobile && cookies['user'] ? mobile : 'اطلاعات تماس'}
              </button>
            </div>
            <div className='col-lg-4  order-lg-2 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 box-m-top'>
              <div className='product_details_title  single_card mt-3'>
                <h5 className='underline mx-3'>عملیات : </h5>
                <div
                  className='d-flex justify-content-around mt-3'
                  style={{ color: '#6d7588' }}
                >
                  {individualId === individual_id && cookies['user'] ? (
                    <div
                      className='d-flex flex-column share-icon'
                      onClick={editMyAdModalOpen}
                    >
                      <RiEditCircleFill size={30} className='m-auto' />
                      <span className='mt-3'>ویرایش آگهی</span>
                    </div>
                  ) : null}

                  {cookies['user'] && affiliate === 1 ? (
                    <div
                      className='d-flex flex-column share-icon'
                      onClick={() => addToShop(id)}
                    >
                      <BsFillPlusCircleFill size={30} className='m-auto' />
                      <span className='mt-3'>افزودن به فروشگاه </span>
                    </div>
                  ) : null}

                  <EditMyAddModal
                    singleAds={singleAd && singleAd}
                    setSingleAd={setSingleAd}
                  />
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

export default Single
