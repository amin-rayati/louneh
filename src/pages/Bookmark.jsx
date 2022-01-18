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
import { useFilterContext } from '../context/FilterProvider'

const url =
  'https://new.louneh.louneh.com/admin/Customers/API/_individualBookmarkes'
const Bookmark = () => {
  const { gridView, setProduct, product } = useFilterContext()
  const [myBookmarks, setmyBookmarks] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [loading, setLoading] = useState(false)
  const [animalAdds, setAnimalAdds] = useState('')
  const [animalshow, setAnimalShow] = useState(false)

  const [supplyAdds, setSupplyAdds] = useState('')
  const [supplyshow, setSupplyShow] = useState(false)

  const [serviceAdds, setServiceAdds] = useState('')
  const [serviceshow, setServiceShow] = useState(false)

  const [allAdds, setAllAdds] = useState('')
  const [allAddsShow, setAllAddsShow] = useState(true)

  const individualId = cookies['user'].individual_id
  const [btnActive, setBtnActive] = useState(false)
  const [i, setI] = useState(0)

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getMyBookmark = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
      const content = await rawResponse.json()
      setmyBookmarks([...myBookmarks, ...content.data.list])
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
    getMyBookmark()
  }, [])

  const allAddsOnClick = () => {
    setAllAddsShow(true)
    setAnimalShow(false)
    setSupplyShow(false)
    setServiceShow(false)
    if (myBookmarks) {
      setAllAdds(myBookmarks)
    }
  }
  let allAddsLength = allAdds.length

  const animal = () => {
    setAllAddsShow(false)

    setAnimalShow(true)
    setSupplyShow(false)
    setServiceShow(false)
    if (myBookmarks) {
      setAnimalAdds(
        myBookmarks.filter((item) => item.catName === 'حیوانات خانگی')
      )
    }
  }
  let animaLength = animalAdds.length

  const supply = () => {
    setAllAddsShow(false)

    setAnimalShow(false)
    setServiceShow(false)
    setSupplyShow(true)
    if (myBookmarks) {
      setSupplyAdds(
        myBookmarks.filter((item) => item.catName === 'لوازم حیوانات')
      )
    }
  }
  let supplyLength = supplyAdds.length

  const service = () => {
    setAllAddsShow(false)

    setAnimalShow(false)
    setServiceShow(true)
    setSupplyShow(false)
    if (myBookmarks) {
      setServiceAdds(
        myBookmarks.filter((item) => item.catName === 'خدمات حیوانات')
      )
    }
  }

  let serviceLength = serviceAdds.length
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
                  <h5 className='underline mx-3'> آگهی های نشان شده: </h5>
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
                        <>
                          {animalshow &&
                            animalAdds &&
                            animalAdds.map((e) => {
                              return (
                                <>
                                  <tr>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        width: '20%',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      <img
                                        src={e.image}
                                        style={{
                                          width: '100%',
                                          borderRadius: '10px',
                                        }}
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
                                    </td>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      {e.priceTypeName === 'توافقی'
                                        ? 'توافقی'
                                        : null}
                                      {e.priceTypeName === 'رایگان'
                                        ? 'رایگان'
                                        : null}
                                      {e.priceTypeName === 'معاوضه'
                                        ? 'معاوضه'
                                        : null}
                                      {e.priceTypeName === 'قیمت فروش'
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
                                      <div className='eye-bg'>
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.adId}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye
                                              size={25}
                                              style={{ color: '#ff9800' }}
                                            />
                                          </LinkContainer>
                                        </OverlayTrigger>
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
                                  <tr>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        width: '20%',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      <img
                                        src={e.image}
                                        style={{
                                          width: '100%',
                                          borderRadius: '10px',
                                        }}
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
                                    </td>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      {e.priceTypeName === 'توافقی'
                                        ? 'توافقی'
                                        : null}
                                      {e.priceTypeName === 'رایگان'
                                        ? 'رایگان'
                                        : null}
                                      {e.priceTypeName === 'معاوضه'
                                        ? 'معاوضه'
                                        : null}
                                      {e.priceTypeName === 'قیمت فروش'
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
                                      <div className='eye-bg'>
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.adId}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye
                                              size={25}
                                              style={{ color: '#ff9800' }}
                                            />
                                          </LinkContainer>
                                        </OverlayTrigger>
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
                                  <tr>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        width: '20%',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      <img
                                        src={e.image}
                                        style={{
                                          width: '100%',
                                          borderRadius: '10px',
                                        }}
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
                                    </td>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      {e.priceTypeName === 'توافقی'
                                        ? 'توافقی'
                                        : null}
                                      {e.priceTypeName === 'رایگان'
                                        ? 'رایگان'
                                        : null}
                                      {e.priceTypeName === 'معاوضه'
                                        ? 'معاوضه'
                                        : null}
                                      {e.priceTypeName === 'قیمت فروش'
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
                                      <div className='eye-bg'>
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.adId}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye
                                              size={25}
                                              style={{ color: '#ff9800' }}
                                            />
                                          </LinkContainer>
                                        </OverlayTrigger>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )
                            })}

                          {myBookmarks &&
                            !animalshow &&
                            !supplyshow &&
                            !serviceshow &&
                            myBookmarks.map((e) => {
                              return (
                                <>
                                  <tr>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        width: '20%',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      <img
                                        src={e.image}
                                        style={{
                                          width: '100%',
                                          borderRadius: '10px',
                                        }}
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
                                    </td>
                                    <td
                                      className='p-1'
                                      style={{
                                        verticalAlign: 'middle',
                                        textAlign: '-webkit-center',
                                      }}
                                    >
                                      {e.priceTypeName === 'توافقی'
                                        ? 'توافقی'
                                        : null}
                                      {e.priceTypeName === 'رایگان'
                                        ? 'رایگان'
                                        : null}
                                      {e.priceTypeName === 'معاوضه'
                                        ? 'معاوضه'
                                        : null}
                                      {e.priceTypeName === 'قیمت فروش'
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
                                      <div className=''>
                                        <OverlayTrigger
                                          placement={'top'}
                                          overlay={<Tooltip>مشاهده</Tooltip>}
                                        >
                                          <LinkContainer
                                            to={`/articles/${e.catName}/${e.catId}/${e.adId}`}
                                            style={{ color: '#ff9800' }}
                                          >
                                            <AiOutlineEye
                                              size={25}
                                              style={{ color: '#ff9800' }}
                                            />
                                          </LinkContainer>
                                        </OverlayTrigger>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )
                            })}
                        </>
                      </tbody>
                    </Table>
                  </div>
                  {!btnActive ? (
                    <div className='mb-5 d-flex justify-content-center'>
                      <button
                        className='mainBtn1 '
                        onClick={() => {
                          getMyBookmark()
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

export default Bookmark
