import { React, useState, useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Loading from './LoadingAdd'
import { Cookies, useCookies } from 'react-cookie'
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2'

const url = 'https://new.louneh.louneh.com/admin/ShopAds/API/_myShop'

const AffiliateListModal = () => {
  const {
    editAffiliateAdsModal,
    editAffiliateAdsModalClose,
    affiliateId,
    setShopInfo,
    shopAds,
    setShopAds,
  } = useFilterContext()

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [profileImg, setProfileImg] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const [loading, setLoading] = useState(false)

  const [adname, setAdName] = useState('')
  const [adPrice, setAdPrice] = useState('')
  const [addetail, setAdDetail] = useState('')

  const getShopInfo = useCallback(async () => {
    try {
      setLoading(true)
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
      setShopInfo(content.data.shop)
      setShopAds(content.data.ads)
    } catch (error) {
      console.log(error)
    }
  }, [url])

  const onDrop = async (acceptedFiles) => {
    if (profileImg.length < 3) {
      profileImg.push(...acceptedFiles)
      setProfileImg(profileImg)
    } else {
      profileImg.length = 0
      profileImg.push(acceptedFiles.pop())
      setProfileImg(profileImg)
    }

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
          reject(error)
        }
      })
    }

    let base64Images = await profileImg.map(async (e) => {
      let tmp = await convertBase64(e)
      setImageUrl([...imageUrl, tmp.split(',')[1]])
    })

    Promise.all(base64Images).then((res) => {})
  }
  const handleAdNameChange = (e) => {
    setAdName(e.target.value)
  }
  const handleAdPriceChange = (e) => {
    setAdPrice(e.target.value)
  }
  const handleAdDetailChange = (e) => {
    setAdDetail(e.target.value)
  }
  const Edit = () => {
    setLoading(true)
    axios
      .post(
        'https://new.louneh.louneh.com/admin/ShopAds/API/_editShopAds',
        {
          shopAdId: affiliateId,
          adName: adname,
          adPrice: adPrice,
          adDetails: addetail,
          adImage: JSON.stringify(imageUrl),
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        getShopInfo()
        editAffiliateAdsModalClose()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Modal show={editAffiliateAdsModal} onHide={editAffiliateAdsModalClose}>
      <Modal.Header>
        <Modal.Title>ویرایش آگهی</Modal.Title>
        <ImCross
          style={{ fontSize: '10px', color: '#a0a8af' }}
          onClick={editAffiliateAdsModalClose}
        />
      </Modal.Header>
      <Modal.Body>
        {shopAds
          .filter((e) => e['shopAdId'] === affiliateId)
          .map((j) => {
            return (
              <>
                <Dropzone onDrop={onDrop} accept='image/*'>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        height: '11em',
                        width: '100%',
                        background: '#ffffff',
                        borderRadius: '0.45rem',
                        border: '2px solid rgb(194 194 194)',
                      }}
                      className='mt-2 text-center container'
                    >
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className='mt-2'> عکس آگهی</p>
                        <br />
                        <div className='d-flex flex-wrap justify-content-center'>
                          {profileImg.map((e) => {
                            return (
                              <div className='d-flex mx-2'>
                                <img
                                  style={{
                                    width: '75px',
                                    height: '75px',
                                    borderRadius: '50%',
                                  }}
                                  alt='img'
                                  src={URL.createObjectURL(e)}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </>
            )
          })}

        {shopAds
          .filter((e) => e['shopAdId'] === affiliateId)
          .map((j) => {
            return (
              <>
                <div
                  className='d-flex flex-column mt-2'
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    onChange={handleAdNameChange}
                    value={adname}
                    required
                    className='p-3 select'
                    type='text'
                    placeholder='نام'
                    style={{
                      borderRadius: '0.45rem',
                      border: '1px solid #0000004f',
                      height: '40px',
                      width: '100%',
                      outline: 'none',
                      background: '#ffffff',
                    }}
                  />
                </div>
              </>
            )
          })}

        {shopAds
          .filter((e) => e['shopAdId'] === affiliateId)
          .map((j) => {
            return (
              <>
                <div
                  className='d-flex flex-column mt-3'
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    onChange={handleAdPriceChange}
                    value={adPrice}
                    required
                    className='p-3 select'
                    type='number'
                    placeholder='قیمت'
                    style={{
                      color: '#6d7588',
                      borderRadius: '5px',
                      height: '40px',
                      padding: '0px 20px',
                      width: '100%',
                      outline: 'none',
                      border: '1px solid #0000004f',
                      fontSize: '16px',
                    }}
                  />
                </div>
              </>
            )
          })}

        <div className='row mx-0 mt-2'>
          <textarea
            required
            onChange={handleAdDetailChange}
            value={addetail}
            className='p-3 select'
            placeholder='متن  را وارد کنید'
            pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
            type='text'
            title='Ten digits code'
            style={{
              borderRadius: '0.45rem',
              border: '1px solid #0000004f',
              height: '100px',
              width: '100%',
              outline: 'none',
              background: '#ffffff',
            }}
          />
        </div>
      </Modal.Body>
      <div className='mb-5 d-flex justify-content-center'>
        <button className='mainBtn1 ' onClick={Edit}>
          {loading ? <Loading /> : 'ویرایش'}
        </button>
      </div>
    </Modal>
  )
}

export default AffiliateListModal
