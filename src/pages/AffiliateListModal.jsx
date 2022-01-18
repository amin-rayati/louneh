import { React, useState, useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Loading from '../pages/LoadingAdd'
import cat from '../img/cat.jpg'
import Table from 'react-bootstrap/Table'
import apple from '../img/apple.png'
import { Cookies, useCookies } from 'react-cookie'
import { Tooltip, Overlay, OverlayTrigger, Button } from 'react-bootstrap'
import { BsPlusCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2'

const url = 'https://new.louneh.louneh.com/admin/Ads/API/_affiliateAds'

const AffiliateListModal = () => {
  const { btnActive, setBtnActive } = useFilterContext()
  const {
    affiliateList,
    affiliateListClose,
    setShopInfo,
    setShopAds,
    shopAds,
  } = useFilterContext()

  const [i, setI] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [loading, setLoading] = useState(false)

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const [affiliateAdds, setAffiliateAdds] = useState([])

  const getAffiliateAdds = async () => {
    axios
      .post(
        url,
        {
          page: i + 1,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        setAffiliateAdds([...affiliateAdds, ...response.data.data.list])
        if (response.data.data.hasNext) {
          setBtnActive(false)
          setI(i + 1)
          setLoading(false)
        } else {
          setBtnActive(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const addAds = async (id) => {
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
          getShopInfo()
          affiliateListClose()
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

  const getShopInfo = async () => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/ShopAds/API/_myShop',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            individualId: cookies['user'].individual_id,
            page: 1,
          }),
        }
      )
      setLoading(false)
      const content = await rawResponse.json()

      setShopAds(content.data.ads)

      setShopInfo(content.data.shop)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAffiliateAdds()
  }, [])

  return (
    <Modal show={affiliateList} onHide={affiliateListClose}>
      <Modal.Header>
        <Modal.Title>افزودن پست</Modal.Title>
        <ImCross
          style={{ fontSize: '10px', color: '#a0a8af' }}
          onClick={affiliateListClose}
        />
      </Modal.Header>
      <Modal.Body>
        <h3 className='text-center'>فروشگاه ها</h3>
        <div
          className='text-center mt-3'
          style={{ width: '100%', overflow: 'auto', cursor: 'pointer' }}
        >
          <Table hover>
            <thead>
              <tr>
                <th
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                    textAlign: '-webkit-center',
                  }}
                >
                  تصویر
                </th>
                <th
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                    textAlign: '-webkit-center',
                  }}
                >
                  عنوان
                </th>
                <th
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                    textAlign: '-webkit-center',
                  }}
                >
                  قیمت
                </th>
                <th
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                    textAlign: '-webkit-center',
                  }}
                >
                  عملیات
                </th>
              </tr>
            </thead>

            {affiliateAdds &&
              affiliateAdds.map((e) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td
                          className='p-4'
                          style={{
                            verticalAlign: 'middle',
                            width: '20%',
                            textAlign: '-webkit-center',
                          }}
                        >
                          <img
                            style={{ width: '100%', borderRadius: '12px' }}
                            src={e.image}
                          />
                        </td>
                        <td
                          className='p-4 lineBreak'
                          style={{
                            width: '20%',
                            verticalAlign: 'middle',
                            textAlign: '-webkit-center',
                          }}
                        >
                          {e.title}
                        </td>

                        <td
                          className='p-4'
                          style={{
                            verticalAlign: 'middle',
                            textAlign: '-webkit-center',
                          }}
                        >
                          {e.price ? nummber(e.price) : 'توافقی'}
                        </td>
                        <td
                          className='p-4'
                          style={{
                            verticalAlign: 'middle',
                            textAlign: '-webkit-center',
                          }}
                        >
                          <div>
                            <OverlayTrigger
                              placement={'top'}
                              overlay={<Tooltip>افزودن به فروشگاه</Tooltip>}
                            >
                              <BsPlusCircleFill
                                onClick={() => addAds(e.id)}
                                size={25}
                                style={{ color: '#ff9800' }}
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
                )
              })}
          </Table>
        </div>
      </Modal.Body>
      {!btnActive ? (
        <div className='mb-5 d-flex justify-content-center'>
          <button
            className='mainBtn1 '
            onClick={() => {
              getAffiliateAdds()
              setLoading(true)
            }}
          >
            {loading ? <Loading /> : 'بارگذاری بیشتر'}
          </button>
        </div>
      ) : null}
    </Modal>
  )
}

export default AffiliateListModal
