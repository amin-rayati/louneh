import { React, useState, useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import cat from '../img/cat.jpg'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import Loading from '../pages/LoadingModal'
import Table from 'react-bootstrap/Table'
import apple from '../img/apple.png'
import { Tooltip, Overlay, OverlayTrigger, Button } from 'react-bootstrap'
import { AiOutlineEye } from 'react-icons/ai'
import { LinkContainer } from 'react-router-bootstrap'
import { Cookies, useCookies } from 'react-cookie'

const url =
  'https://new.louneh.louneh.com/admin/Cooprations/API/_getAllCoopration'
const AllMallModal = () => {
  const [cookiesStateid, setCookieStateid, removeCookieStateid] = useCookies([
    'stateid',
  ])
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const { allMallModal, allMallModalClose } = useFilterContext()
  const [affiliateShopList, setAffiliateShopList] = useState([])
  const { btnActive1, setBtnActive1 } = useFilterContext()
  const [i, setI] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)

  const getAffiliateList = async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          page: i + 1,
          stateId: parseInt(cookiesStateid['stateid']),
          cityid: parseInt(cookiesCityid['cityid']),
        }),
        headers: {
          token: 'test',
        },
      })

      setLoading(false)
      const content = await rawResponse.json()

      setAffiliateShopList([...affiliateShopList, ...content.data.list])
      if (content.data.hasNext) {
        setBtnActive1(false)
        setI(i + 1)
        setLoading(false)
      } else {
        setBtnActive1(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAffiliateList()
  }, [cookiesStateid['stateid'], cookiesCityid['cityid']])

  return (
    <Modal show={allMallModal} onHide={allMallModalClose} size='md'>
      <Modal.Header>
        <Modal.Title>نوع آگهی</Modal.Title>
        <ImCross
          onClick={allMallModalClose}
          style={{ fontSize: '10px', color: '#a0a8af' }}
        />
      </Modal.Header>
      <Modal.Body>
        <h3 className='text-center'>فروشگاه ها</h3>

        <div
          className='text-center mt-3'
          style={{ width: '100%', overflow: 'auto' }}
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
                  بنر فروشگاه
                </th>
                <th
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                    textAlign: '-webkit-center',
                  }}
                >
                  نام فروشگاه
                </th>
                <th
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                    textAlign: '-webkit-center',
                  }}
                >
                  نام فروشنده
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

            {affiliateShopList &&
              affiliateShopList.map((e) => {
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
                            src={e.banner}
                            alt='e.shop_name'
                          />
                        </td>
                        <td
                          className='p-4 '
                          style={{
                            width: '40%',
                            verticalAlign: 'middle',
                            textAlign: '-webkit-center',
                          }}
                        >
                          {e.shop_name}
                        </td>

                        <td
                          className='p-4 '
                          style={{
                            width: '50%',
                            verticalAlign: 'middle',
                            textAlign: '-webkit-center',
                          }}
                        >
                          {e.individualName}
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
                              overlay={<Tooltip>مشاهده</Tooltip>}
                            >
                              <LinkContainer
                                to={`/usualpetshop/${e.individualId}`}
                                style={{ color: '#ff9800', cursor: 'pointer' }}
                              >
                                <AiOutlineEye size={25} />
                              </LinkContainer>
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

        {!btnActive1 ? (
          <div className='mb-5 d-flex justify-content-center'>
            <button
              className='mainBtn1 '
              onClick={() => {
                getAffiliateList()
                setLoading1(true)
              }}
            >
              {loading1 ? <Loading /> : 'بارگذاری بیشتر'}
            </button>
          </div>
        ) : null}
      </Modal.Body>
    </Modal>
  )
}

export default AllMallModal
