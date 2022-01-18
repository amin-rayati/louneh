import { React, useState, useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { Cookies, useCookies } from 'react-cookie'
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2'
import Loading from '../pages/LoadingAdd'

const url = 'https://new.louneh.louneh.com/admin/ShopAds/API/_myShop'

const EditMyAdModal = ({ singleAds, setSingleAd }) => {
  const { editMyAdModal, editMyAdModalClose } = useFilterContext()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [profileImg, setProfileImg] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation()
  const adId = pathname.split('/')[3]

  const {
    priceTypeId,
    gender,
    brand,
    petName,
    id,
    name,
    affiliate,
    affiliate_price,
    details,
    image,
    price,
    video,
    link,
  } = singleAds

  const [titleValue, setTitleValue] = useState(name)
  const [petnameValue, setPetNameValue] = useState(petName)
  const [pricetypeidValue, setPriceTypeIdValue] = useState(priceTypeId)
  const [genderVlaue, setGenderVlaue] = useState(gender)
  const [priceValue, setPriceValue] = useState(price)
  const [detailsValue, setDetailsValue] = useState(details)
  const [affiliateValue, setAffiliateValue] = useState(affiliate)
  const [affiliatePriceValue, setAffiliatePriceValue] =
    useState(affiliate_price)
  const [brandValue, setBrandValue] = useState(brand)

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value)
  }
  const handleNameChange = (e) => {
    setPetNameValue(e.target.value)
  }
  const handleGenderChange = (e) => {
    setGenderVlaue(e.target.value)
  }
  const handlePriceTypeIdChange = (e) => {
    setPriceTypeIdValue(e.target.value)
  }
  const handlePriceValueChange = (e) => {
    setPriceValue(e.target.value)
  }
  const handleCaptionChange = (e) => {
    setDetailsValue(e.target.value)
  }
  const handleAffiliateChange = (e) => {
    if (e.target.checked) {
      setAffiliateValue('1')
    } else {
      setAffiliateValue('2')
    }
  }
  const handleAffiliatePriceValueChange = (e) => {
    setAffiliatePriceValue(e.target.valuee)
  }
  const handleBrandChange = (e) => {
    setBrandValue(e.target.value)
  }

  const onDrop = async (acceptedFiles) => {
    if (profileImg.length < 3) {
      profileImg.push(...acceptedFiles)
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
    } else {
      setProfileImg([])
      setImageUrl([])
    }
  }

  const Edit = () => {
    setLoading(true)
    axios
      .post(
        'https://new.louneh.louneh.com/admin/Ads/API/_editAds',
        {
          adId: id,
          ad_name: titleValue,
          ad_pet_name: petnameValue,
          ad_gender: genderVlaue,
          priceType_id: pricetypeidValue,
          ad_price: priceValue,
          ad_detail: detailsValue,
          ad_affiliate: affiliateValue,
          ad_affiliate_price: affiliatePriceValue,
          image: JSON.stringify(imageUrl),
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        if (response.data.isDone) {
          editMyAdModalClose()
          getSingleProduct()
          setLoading(false)
          window.location.reload(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getSingleProduct = () => {
    axios
      .post(
        'https://new.louneh.louneh.com/admin/Ads/API/_getSingleAd?token:test',
        {
          individualId: cookies['user'].individual_id,
          adId: adId,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        setSingleAd(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Modal show={editMyAdModal} onHide={editMyAdModalClose} size='md'>
      <Modal.Header>
        <Modal.Title>ویرایش آگهی</Modal.Title>
        <ImCross
          style={{ fontSize: '10px', color: '#a0a8af' }}
          onClick={editMyAdModalClose}
        />
      </Modal.Header>
      <Modal.Body>
        {genderVlaue ? (
          <div className='row mx-0 mt-4 ' style={{ textAlign: 'end' }}>
            <div className='row col-12 col-lg-12 col-md-8 col-sm-8  justify-content-center'>
              <div className='col-6 col-lg-3 col-md-6 col-sm-6 text-right'>
                <input
                  onChange={handleGenderChange}
                  value={genderVlaue}
                  required
                  type='radio'
                  name='sex'
                  value='1'
                  checked={genderVlaue == 1 ? true : false}
                  className='radio-input1 sex text-start'
                  style={{ textAlign: 'end' }}
                />
                <label style={{ marginRight: '15px', fontSize: '12px' }}>
                  نر
                </label>
              </div>
              <div className='col-6 col-lg-3 col-md-6 col-sm-6 text-right'>
                <input
                  onChange={handleGenderChange}
                  value={genderVlaue}
                  required
                  type='radio'
                  name='sex'
                  value='2'
                  checked={genderVlaue == 2 ? true : false}
                  className='radio-input1 sex text-start'
                  style={{ textAlign: 'end' }}
                />
                <label style={{ marginRight: '15px', fontSize: '12px' }}>
                  ماده
                </label>
              </div>
            </div>
          </div>
        ) : null}

        {brandValue ? (
          <div
            className='d-flex flex-column mt-3'
            style={{ cursor: 'pointer' }}
          >
            <input
              required
              onChange={handleBrandChange}
              className=' select'
              type='text'
              value={brandValue}
              placeholder='برند'
              style={{
                color: '#6d7588',
                borderRadius: '5px',
                height: '50px',
                padding: '0px 20px',
                width: '100%',
                outline: 'none',
                border: '1px solid #0000004f',
                fontSize: '16px',
              }}
            />
          </div>
        ) : null}

        <div className='d-flex flex-column mt-3' style={{ cursor: 'pointer' }}>
          <input
            required
            onChange={handleTitleChange}
            className=' select'
            type='text'
            value={titleValue}
            placeholder='عنوان'
            style={{
              color: '#6d7588',
              borderRadius: '5px',
              height: '50px',
              padding: '0px 20px',
              width: '100%',
              outline: 'none',
              border: '1px solid #0000004f',
              fontSize: '16px',
            }}
          />
        </div>

        <div className='d-flex flex-column mt-3' style={{ cursor: 'pointer' }}>
          <input
            required
            onChange={handleNameChange}
            className=' select'
            type='text'
            value={petnameValue}
            placeholder='نام حیوان'
            style={{
              color: '#6d7588',
              borderRadius: '5px',
              height: '50px',
              padding: '0px 20px',
              width: '100%',
              outline: 'none',
              border: '1px solid #0000004f',
              fontSize: '16px',
            }}
          />
        </div>

        <div className='row mx-0 mt-4' style={{ textAlign: 'end' }}>
          <div className='row col-12 col-lg-12 col-md-8 col-sm-8  '>
            <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
              <input
                value={pricetypeidValue}
                checked={pricetypeidValue == 1 ? true : false}
                onChange={handlePriceTypeIdChange}
                value='1'
                required
                type='radio'
                name='price'
                className='radio-input1 sex text-start'
                style={{ textAlign: 'end' }}
              />
              <label
                style={{
                  marginRight: '7px',
                  fontSize: '12px',
                  marginBottom: '5px',
                }}
              >
                توافقی
              </label>
            </div>
            <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
              <input
                value={pricetypeidValue}
                checked={pricetypeidValue == 2 ? true : false}
                value='2'
                onChange={handlePriceTypeIdChange}
                required
                type='radio'
                name='price'
                className='radio-input1 sex text-start'
                style={{ textAlign: 'end' }}
              />
              <label
                style={{
                  marginRight: '7px',
                  fontSize: '12px',
                  marginBottom: '5px',
                }}
              >
                رایگان
              </label>
            </div>
            <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
              <input
                value={pricetypeidValue}
                checked={pricetypeidValue == 3 ? true : false}
                value='3'
                onChange={handlePriceTypeIdChange}
                required
                type='radio'
                name='price'
                className='radio-input1 sex text-start'
                style={{ textAlign: 'end' }}
              />
              <label
                style={{
                  marginRight: '7px',
                  fontSize: '12px',
                  marginBottom: '5px',
                }}
              >
                معاوضه
              </label>
            </div>
            <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
              <input
                value={pricetypeidValue}
                value='4'
                onChange={handlePriceTypeIdChange}
                checked={pricetypeidValue == 4 ? true : false}
                required
                type='radio'
                name='price'
                className='radio-input1 sex text-start'
                style={{ textAlign: 'end' }}
              />
              <label
                style={{
                  marginRight: '7px',
                  fontSize: '12px',
                  marginBottom: '5px',
                }}
              >
                تعریف قیمت
              </label>
            </div>
          </div>
        </div>

        {pricetypeidValue == 4 ? (
          <div
            className='d-flex flex-column mt-3'
            style={{ cursor: 'pointer' }}
          >
            <input
              required
              onChange={handlePriceValueChange}
              value={priceValue}
              className='select'
              type='number'
              placeholder='قیمت'
              style={{
                color: '#6d7588',
                borderRadius: '5px',
                height: '50px',
                padding: '0px 20px',
                width: '100%',
                outline: 'none',
                border: '1px solid #0000004f',
                fontSize: '16px',
              }}
            />
          </div>
        ) : null}

        <div className='d-flex flex-column mt-3' style={{ cursor: 'pointer' }}>
          <textarea
            required
            onChange={handleCaptionChange}
            value={detailsValue}
            className=' select'
            type='text'
            placeholder='کپشن'
            style={{
              color: '#6d7588',
              borderRadius: '5px',
              height: '150px',
              padding: '10px 20px',
              width: '100%',
              outline: 'none',
              border: '1px solid #0000004f',
              fontSize: '16px',
            }}
          ></textarea>
        </div>

        <div className='row mx-0 my-4' style={{ textAlign: 'end' }}>
          <div
            className='col-4 my-auto  text-right'
            style={{ textAlign: 'right' }}
          >
            <label htmlFor='horns'>مشارکت در فروش :</label>
          </div>
          <div className='col-1'>
            <input
              onChange={handleAffiliateChange}
              className='radio-input2'
              checked={affiliateValue == 1 ? true : false}
              required
              type='checkbox'
              id='horns'
              name='horns'
              style={{ textAlign: 'right', marginTop: '3px' }}
            />
          </div>
        </div>

        {affiliateValue == 1 ? (
          <div
            className='d-flex flex-column mt-3'
            style={{ cursor: 'pointer' }}
          >
            <input
              onChange={handleAffiliatePriceValueChange}
              value={affiliatePriceValue}
              required
              className=' select'
              type='number'
              placeholder='قیمت مشارکت'
              style={{
                color: '#6d7588',
                borderRadius: '5px',
                height: '50px',
                padding: '0px 20px',
                width: '100%',
                outline: 'none',
                border: '1px solid #0000004f',
                fontSize: '16px',
              }}
            />
          </div>
        ) : null}

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
                <p className='mt-2'> عکس آگهی(سه تا عکس میتوانید قرار دهید)</p>
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
      </Modal.Body>
      <div className='mb-5 d-flex justify-content-center'>
        <button className='mainBtn1 ' onClick={Edit}>
          {loading ? <Loading /> : ' ویرایش'}
        </button>
      </div>
    </Modal>
  )
}

export default EditMyAdModal
