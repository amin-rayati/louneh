import { React, useState, useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Loading from './LoadingAdd'
import { Cookies, useCookies } from 'react-cookie'
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2'

const url = 'https://new.louneh.louneh.com/admin/Ads/API/_affiliateAds'

const AffiliateListModal = () => {
  const {
    editProfileModal,
    editProfileModalClose,
    shopInfo,
    setShopInfo,
    shopAds,
    setShopAds,
  } = useFilterContext()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [profileImg, setProfileImg] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const [shopName, setShopName] = useState('')
  const [shopDetails, setShopDetails] = useState('')

  const [nameRequire, setNameRequire] = useState(false)
  const [imageRequire, setImageRequire] = useState(false)

  const [loading, setLoading] = useState(false)

  const onDrop = async (acceptedFiles) => {
    setImageRequire(false)

    if (profileImg.length < 1) {
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

  const handleShopNameChange = (e) => {
    setShopName(e.target.value)
    setNameRequire(false)
  }
  const handleShopDetailsChange = (e) => {
    setShopDetails(e.target.value)
  }

  const getShopInfo = useCallback(async () => {
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
      const content = await rawResponse.json()
      setShopInfo(content.data.shop)
      setShopAds(content.data.ads)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const Edit = () => {
    if (imageUrl.length === 0) {
      setImageRequire(true)
    } else if (shopName === '' || shopName.length <= 3) {
      setNameRequire(true)
    } else {
      setLoading(true)
      axios
        .post(
          'https://new.louneh.louneh.com/admin/Cooprations/API/_editShop',
          {
            individualId: cookies['user'].individual_id,
            shopName: shopName,
            banner: imageUrl.pop(),
            details: shopDetails,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setLoading(false)
          Swal.fire({
            confirmButtonText: 'فهمیدم',
            icon: 'success',
            text: 'اطلاعات شما با موفقیت ویرایش شد',
          }).then((result) => {
            if (result.isConfirmed) {
              editProfileModalClose()
              getShopInfo()
            }
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <Modal show={editProfileModal} onHide={editProfileModalClose}>
      <Modal.Header>
        <Modal.Title>ویرایش فروشگاه</Modal.Title>
        <ImCross
          style={{ fontSize: '10px', color: '#a0a8af' }}
          onClick={editProfileModalClose}
        />
      </Modal.Header>
      <Modal.Body>
        <Dropzone onDrop={onDrop} accept='image/*'>
          {({ getRootProps, getInputProps }) => (
            <div
              style={
                !imageRequire
                  ? {
                      height: '11em',
                      width: '100%',
                      background: '#ffffff',
                      borderRadius: '0.45rem',
                      border: '2px solid #c2c2c2',
                    }
                  : {
                      height: '11em',
                      width: '100%',
                      background: '#ffffff',
                      borderRadius: '0.45rem',
                      border: '1px solid #dc3545',
                    }
              }
              className='mt-2 text-center container'
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className='mt-2'>بنر فروشگاه</p>
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

        {imageRequire ? (
          <h5 className='mt-2' style={{ color: '#dc3545', fontSize: '10px' }}>
            حداقل یک عکس باید انتخاب شود!
          </h5>
        ) : null}

        <div className='d-flex flex-column mt-2' style={{ cursor: 'pointer' }}>
          <input
            onChange={handleShopNameChange}
            value={shopName}
            required
            className='p-3 select'
            type='text'
            placeholder='نام'
            style={
              !nameRequire
                ? {
                    borderRadius: '0.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                  }
                : {
                    borderRadius: '0.45rem',
                    border: '1px solid #dc3545',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                  }
            }
          />
        </div>

        {nameRequire ? (
          <h5 className='mt-2' style={{ color: '#dc3545', fontSize: '10px' }}>
            لطفا نام فروشگاه را وارد کنید (حداقل ۳ کاراکتر)
          </h5>
        ) : null}

        <div className='row mx-0 mt-2'>
          <textarea
            onChange={handleShopDetailsChange}
            value={shopDetails}
            required
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
