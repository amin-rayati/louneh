import React, { useContext, useState, useEffect, useCallback } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { Cookies, useCookies } from 'react-cookie'
import { AiOutlineFullscreenExit, AiOutlineDashboard } from 'react-icons/ai'
import { FiLayers, FiBookmark } from 'react-icons/fi'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import apple from '../img/apple.png'
import { Tooltip, Overlay, OverlayTrigger, Button } from 'react-bootstrap'
import { AiOutlineEye } from 'react-icons/ai'
import Profile from '../components/Profile'
import Loading1 from './PaginationLoading'
import { FaTrash } from 'react-icons/fa'
import { RiEditCircleFill } from 'react-icons/ri'
import Swal from 'sweetalert2'
const url = 'https://new.louneh.louneh.com/admin/Ads/API/_getAdsByIndividualId'
const Myadds = () => {
  const [myAdds, setMyAdds] = useState([])
  const [btnActive, setBtnActive] = useState(false)
  const [i, setI] = useState(0)

  const [allAdds, setAllAdds] = useState('')
  const [allAddsShow, setAllAddsShow] = useState(true)

  const [animalAdds, setAnimalAdds] = useState('')
  const [animalshow, setAnimalShow] = useState(false)

  const [supplyAdds, setSupplyAdds] = useState('')
  const [supplyshow, setSupplyShow] = useState(false)

  const [serviceAdds, setServiceAdds] = useState('')
  const [serviceshow, setServiceShow] = useState(false)

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const individualId = cookies['user'] ? cookies['user'].individual_id : null
  const [loading, setLoading] = useState(false)

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getMyAdds = async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          individualId: individualId,
          page: i + 1,
        }),
      })
      const content = await rawResponse.json()
      setMyAdds([...myAdds, ...content.data.list])
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

  const allAddsOnClick = () => {
    setAllAddsShow(true)
    setAnimalShow(false)
    setSupplyShow(false)
    setServiceShow(false)
    if (myAdds) {
      setAllAdds(myAdds)
    }
  }
  let allAddsLength = allAdds.length

  const animal = () => {
    setAllAddsShow(false)

    setAnimalShow(true)
    setSupplyShow(false)
    setServiceShow(false)
    if (myAdds) {
      setAnimalAdds(myAdds.filter((item) => item.catName === 'حیوانات خانگی'))
    }
  }
  let animaLength = animalAdds.length

  const supply = () => {
    setAllAddsShow(false)

    setAnimalShow(false)
    setServiceShow(false)
    setSupplyShow(true)
    if (myAdds) {
      setSupplyAdds(myAdds.filter((item) => item.catName === 'لوازم حیوانات'))
    }
  }
  let supplyLength = supplyAdds.length

  const service = () => {
    setAllAddsShow(false)

    setAnimalShow(false)
    setServiceShow(true)
    setSupplyShow(false)
    if (myAdds) {
      setServiceAdds(myAdds.filter((item) => item.catName === 'خدمات حیوانات'))
    }
  }
  let serviceLength = serviceAdds.length

  const deleteAd = async (id) => {
    Swal.fire({
      text: 'ایا از حذف آگهی خود اطمینان دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1fb811',
      cancelButtonColor: '#ff8900',
      cancelButtonText: 'خیر',
      confirmButtonText: 'حذف',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequset(id)
      }
    })
  }

  const deleteRequset = async (id) => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Ads/API/_deleteAds',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            adId: id,
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
              individualId: individualId,
              page: 1,
            }),
          })
          const content = await rawResponse.json()
          setMyAdds(content.data.list)
          window.location.reload(true)
        } catch (error) {
          console.log(error)
        }
        supply()
        service()
        animal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMyAdds()
  }, [])

  return (
    <>
      <Header />
      {cookies['user'] ? (
        <>
          <div className='my-5 container'>
            <div className='row'>
              <div className='col-lg-3 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 mt-2'>
                <Profile />
              </div>
              <div className='col-lg-9 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 mt-2'>
                <div className='product_details_title  single_card'>
                  <h5 className='underline mx-3'> آگهی های من: </h5>
                  <div className='row'>
                    <button
                      className={
                        allAddsShow
                          ? 'mainBtn2 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                          : 'mainBtn1 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                      }
                      style={{ marginRight: '30px' }}
                      onClick={allAddsOnClick}
                    >
                      همه ({allAddsLength})
                    </button>
                    <button
                      className={
                        animalshow
                          ? 'mainBtn2 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                          : 'mainBtn1 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                      }
                      style={{ marginRight: '30px' }}
                      onClick={animal}
                    >
                      حیوانات ({animaLength})
                    </button>
                    <button
                      className={
                        supplyshow
                          ? 'mainBtn2 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                          : 'mainBtn1 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                      }
                      style={{ marginRight: '30px' }}
                      onClick={supply}
                    >
                      لوازم ({supplyLength})
                    </button>
                    <button
                      className={
                        serviceshow
                          ? 'mainBtn2 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                          : 'mainBtn1 mt-2 btn-font col-lg-2 col-md-3 col-sm-3 col-3 m-auto'
                      }
                      style={{ marginRight: '30px' }}
                      onClick={service}
                    >
                      خدمات ({serviceLength})
                    </button>
                  </div>
                  <div
                    className='text-center mt-3'
                    style={{ width: '100%', overflow: 'auto' }}
                  >
                    <Table hover>
                      <thead>
                        <tr>
                          <th>تصویر</th>
                          <th>عنوان</th>
                          <th>وضعیت</th>
                          <th>قیمت</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {animalshow &&
                          animalAdds &&
                          animalAdds.map((e) => {
                            return (
                              <>
                                <tr key={e.id}>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      width: '20%',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <img
                                      style={{
                                        width: '100%',
                                        borderRadius: '10px',
                                      }}
                                      src={e.image}
                                      alt='apple'
                                    />
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.name}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.status === 2 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#f91942',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید نشده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#024d02',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید شده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 0 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff9800',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          درانتظار تایید
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === -1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff0000',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          پرداخت ناموفق
                                        </span>
                                      </div>
                                    ) : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.priceType === 'توافقی' ? 'توافقی' : null}
                                    {e.priceType === 'رایگان' ? 'رایگان' : null}
                                    {e.priceType === 'معاوضه' ? 'معاوضه' : null}
                                    {e.priceType === 'قیمت فروش'
                                      ? nummber(e.price)
                                      : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <div className=' d-flex justify-content-center'>
                                      <div
                                        style={{
                                          marginTop: '-2px',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.id}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye size={25} />
                                          </LinkContainer>
                                        </OverlayTrigger>
                                      </div>
                                      <div
                                        className='mx-3'
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>حذف</Tooltip>}
                                        >
                                          <FaTrash
                                            onClick={() => deleteAd(e.id)}
                                            style={{ color: '#ff9800' }}
                                            size={20}
                                          />
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )
                          })}
                        {supplyshow &&
                          supplyAdds &&
                          supplyAdds.map((e) => {
                            return (
                              <>
                                <tr key={e.id}>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      width: '20%',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <img
                                      style={{
                                        width: '100%',
                                        borderRadius: '10px',
                                      }}
                                      src={e.image}
                                      alt='apple'
                                    />
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.name}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.status === 2 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#f91942',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید نشده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#024d02',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید شده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 0 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff9800',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          درانتظار تایید
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === -1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff0000',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          پرداخت ناموفق
                                        </span>
                                      </div>
                                    ) : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.priceType === 'توافقی' ? 'توافقی' : null}
                                    {e.priceType === 'رایگان' ? 'رایگان' : null}
                                    {e.priceType === 'معاوضه' ? 'معاوضه' : null}
                                    {e.priceType === 'قیمت فروش'
                                      ? nummber(e.price)
                                      : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <div className=' d-flex justify-content-center'>
                                      <div
                                        style={{
                                          marginTop: '-2px',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.id}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye size={25} />
                                          </LinkContainer>
                                        </OverlayTrigger>
                                      </div>
                                      <div
                                        className='mx-3'
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>حذف</Tooltip>}
                                        >
                                          <FaTrash
                                            onClick={() => deleteAd(e.id)}
                                            style={{ color: '#ff9800' }}
                                            size={20}
                                          />
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )
                          })}
                        {serviceshow &&
                          serviceAdds &&
                          serviceAdds.map((e) => {
                            return (
                              <>
                                <tr key={e.id}>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      width: '20%',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <img
                                      style={{
                                        width: '100%',
                                        borderRadius: '10px',
                                      }}
                                      src={e.image}
                                      alt='apple'
                                    />
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.name}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.status === 2 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#f91942',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید نشده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#024d02',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید شده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 0 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff9800',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          درانتظار تایید
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === -1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff0000',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          پرداخت ناموفق
                                        </span>
                                      </div>
                                    ) : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.priceType === 'توافقی' ? 'توافقی' : null}
                                    {e.priceType === 'رایگان' ? 'رایگان' : null}
                                    {e.priceType === 'معاوضه' ? 'معاوضه' : null}
                                    {e.priceType === 'قیمت فروش'
                                      ? nummber(e.price)
                                      : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <div className=' d-flex justify-content-center'>
                                      <div
                                        style={{
                                          marginTop: '-2px',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.id}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye size={25} />
                                          </LinkContainer>
                                        </OverlayTrigger>
                                      </div>
                                      <div
                                        className='mx-3'
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>حذف</Tooltip>}
                                        >
                                          <FaTrash
                                            onClick={() => deleteAd(e.id)}
                                            style={{ color: '#ff9800' }}
                                            size={20}
                                          />
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )
                          })}
                        {myAdds &&
                          !animalshow &&
                          !supplyshow &&
                          !serviceshow &&
                          myAdds.map((e) => {
                            return (
                              <>
                                <tr key={e.id}>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      width: '20%',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <img
                                      style={{
                                        width: '100%',
                                        borderRadius: '10px',
                                      }}
                                      src={e.image}
                                    />
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.name}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.status === 2 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#f91942',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید نشده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#024d02',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          تایید شده
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === 0 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff9800',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          درانتظار تایید
                                        </span>
                                      </div>
                                    ) : null}
                                    {e.status === -1 ? (
                                      <div className='status-span'>
                                        <span
                                          style={{
                                            backgroundColor: '#ff0000',
                                            borderRadius: '5px',
                                            padding: '6px',
                                          }}
                                        >
                                          پرداخت ناموفق
                                        </span>
                                      </div>
                                    ) : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    {e.priceType === 'توافقی' ? 'توافقی' : null}
                                    {e.priceType === 'رایگان' ? 'رایگان' : null}
                                    {e.priceType === 'معاوضه' ? 'معاوضه' : null}
                                    {e.priceType === 'قیمت فروش'
                                      ? nummber(e.price)
                                      : null}
                                  </td>
                                  <td
                                    className='p-1'
                                    style={{
                                      verticalAlign: 'middle',
                                      textAlign: '-webkit-center',
                                    }}
                                  >
                                    <div className=' d-flex justify-content-center'>
                                      <div
                                        style={{
                                          marginTop: '-2px',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.id}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye size={25} />
                                          </LinkContainer>
                                        </OverlayTrigger>
                                      </div>
                                      <div
                                        className='mx-3'
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>حذف</Tooltip>}
                                        >
                                          <FaTrash
                                            onClick={() => deleteAd(e.id)}
                                            style={{ color: '#ff9800' }}
                                            size={20}
                                          />
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )
                          })}
                      </tbody>
                    </Table>
                  </div>
                  {!btnActive ? (
                    <div className='mb-5 d-flex justify-content-center'>
                      <button
                        className='mainBtn1 '
                        onClick={() => {
                          getMyAdds()
                          setLoading(true)
                        }}
                      >
                        {loading ? <Loading1 /> : 'بارگذاری بیشتر'}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <LogoFooter className='mt-4' />
        </>
      ) : null}
    </>
  )
}

export default Myadds
