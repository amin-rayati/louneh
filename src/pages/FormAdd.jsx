import { React, useState, useCallback, useEffect } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { useLocation } from 'react-router-dom'

import { useFilterContext } from '../context/FilterProvider'
import { Cookies, useCookies } from 'react-cookie'
import ModalType from '../components/ModalType'
import { AiOutlineClose, AiOutlineVideoCamera } from 'react-icons/ai'
import Dropzone from 'react-dropzone'
import NumberFormat from 'react-number-format'
const addTypeUrl = 'https://new.louneh.louneh.com/admin/Adtypes/API/_getAdTypes'
const FormAdd = ({ lastcatId }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const { ID, Brand, Petname, Gender, files, setFiles } = useFilterContext()
  const [type, setType] = useState('')
  const { pathname } = useLocation()
  const categoryId = pathname.split('/')[3]
  const [title, setTitle] = useState('')
  const [money, setMoney] = useState()
  const [desc, setDesc] = useState('')
  const [brand, setbrand] = useState('')
  const [gender, setgender] = useState('')
  const [petname, setpetname] = useState('')
  const [link, setLink] = useState('')
  // const [image, setImage] = useState('')
  const [AddType, setAddType] = useState('')
  const [video, setVideo] = useState(null)
  const [affiliatePricevalue, setAffiliatePricevalue] = useState('')

  const CatId = categoryId
  const LastCatId = lastcatId

  const individualId = cookies['user'].individual_id
  const [imageUrl, setImageUrl] = useState([])
  const [profileImg, setProfileImg] = useState([])
  const [priceInput, setPriceInput] = useState(false)
  const [titlerequire, setTitleRequire] = useState(false)
  const [genderrequire, setGenderRequire] = useState(false)
  const [descrequire, setDescRequire] = useState(false)
  const [typerequire, setTypeRequire] = useState(false)
  const [petnamerequire, setPetnameRequire] = useState(false)
  const [brandrequire, setBrandRequire] = useState(false)
  const [pricerequire, setPriceRequire] = useState(false)
  const [affiliatepricerequire, setaffiliatepricerequire] = useState(false)
  // const [imagerequire, setImagerequire] = useState(false)
  const [typemodal, settypemodal] = useState(false)
  const [affiliate, setAffiliate] = useState(0)
  const [affiliatePrice, setAffiliatePrice] = useState(false)
  const typeclose = () => settypemodal(false)
  const typeshow = () => settypemodal(true)

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

    // if (profileImg.length < 3) {
    //   profileImg.push(...acceptedFiles)
    //   setProfileImg(profileImg)
    // } else {
    // profileImg.length = 0
    // profileImg.push(acceptedFiles.pop())
    //   setProfileImg([])
    // }
  }

  const onDropVideo = async (acceptedFiles) => {
    setVideo(acceptedFiles.pop())
  }

  const data = {
    type,
    title,
    money,
    desc,
    brand,
    gender,
    petname,
    imageUrl,
    CatId,
    LastCatId,
    individualId,
    Brand,
    Gender,
    Petname,
    priceInput,
    affiliate,
    affiliatePricevalue,
  }

  console.log(CatId)

  const handlePriceChange = (e) => {
    setType(e.target.value)
    setTypeRequire(false)
    if (e.target.checked) {
      setPriceInput(true)
      setPriceRequire(false)
    }
  }
  const handleFreeChange = (e) => {
    setType(e.target.value)
    setTypeRequire(false)

    if (e.target.checked) {
      setPriceInput(false)
      setPriceRequire(false)
    }
  }
  const handleSwapChange = (e) => {
    setType(e.target.value)
    setTypeRequire(false)

    if (e.target.checked) {
      setPriceInput(false)
      setPriceRequire(false)
    }
  }
  const handleDeelChange = (e) => {
    setType(e.target.value)
    setTypeRequire(false)

    if (e.target.checked) {
      setPriceInput(false)
      setPriceRequire(false)
    }
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if (title.length > 3) {
      setTitleRequire(false)
    }
  }
  const handlePriceInputChange = (e) => {
    setMoney(addCommas(removeNonNumeric(e.target.value)))
    setPriceRequire(false)
  }
  const handleDescChange = (e) => {
    setDesc(e.target.value)
    if (desc.length > 10) {
      setDescRequire(false)
    }
  }
  const handleGenderChange = (e) => {
    setgender(e.target.value)
    setGenderRequire(false)
  }
  const handlePetnameChange = (e) => {
    setpetname(e.target.value)
    if (petname.length > 2) {
      setPetnameRequire(false)
    }
  }
  const handleBrandChange = (e) => {
    setbrand(e.target.value)
    if (brand.length > 4) {
      setBrandRequire(false)
    }
  }

  const handleAffiliateChange = (e) => {
    if (e.target.checked) {
      setAffiliate('1')
      setAffiliatePrice(true)
    } else {
      setAffiliate('0')
      setAffiliatePrice(false)
      setaffiliatepricerequire(false)
    }
  }

  const handleAffiliatePriceChange = (e) => {
    setAffiliatePricevalue(addCommas(removeNonNumeric(e.target.value)))
    setaffiliatepricerequire(false)
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }

  const getAddType = async () => {
    try {
      const rawResponse = await fetch(addTypeUrl, {
        method: 'POST',
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()

      let data = content.data

      if (video) {
        data = data.filter((e) => e.adTypeId != 6)
      }
      if (link) {
        data = data.filter((e) => e.adTypeId != 6)
      }
      if (!video) {
        data = data.filter((e) => e.adTypeId != 1)
      }
      if (!link) {
        data = data.filter((e) => e.adTypeId != 3)
      }

      setAddType(data)
      await nextLevel()
    } catch (error) {
      console.log(error)
    }
  }

  const nextLevel = async () => {
    if (gender) {
      if (gender == '') {
        setGenderRequire(true)
        return
      }
    }

    if (title.length <= 3) {
      setTitleRequire(true)
      return
    }
    if (title === '') {
      setTitleRequire(true)
      return
    }
    if (priceInput) {
      if (money === '') {
        setPriceRequire(true)
        return
      }
      if (money[0] === '0') {
        setPriceRequire(true)
        return
      }
    }
    if (Brand) {
      if (brand <= 4) {
        setBrandRequire(true)
        return
      }
      if (brand === '') {
        setBrandRequire(true)
        return
      }
    }
    if (Petname) {
      if (petname <= 2) {
        setPetnameRequire(true)
        return
      }
      if (petname === '') {
        setPetnameRequire(true)
        return
      }
    }
    if (desc.length <= 10) {
      setDescRequire(true)
      return
    }
    if (desc === '') {
      setDescRequire(true)
      return
    }
    if (affiliatePrice) {
      if (affiliatePricevalue === '') {
        setaffiliatepricerequire(true)
        return
      }
    }
    if (type === '') {
      setTypeRequire(true)
      return
    } else {
      typeshow()
    }
  }

  const deleteVideo = () => {
    setVideo(null)
  }

  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '')

  return (
    <>
      <Header title='افزودن آگهی' />

      <div className='row justify-content-center mt-5 mx-2'>
        <div className='product_details_title  single_card mt-3 col-lg-6'>
          <h5 className='underline mx-3'>اطلاعات آگهی را وارد کنید: </h5>
          <div className=' mt-3' style={{ color: '#6d7588', fontSize: '20px' }}>
            {Gender == true ? (
              <div className='row mx-0 mt-4 ' style={{ textAlign: 'end' }}>
                <div className='row col-12 col-lg-12 col-md-8 col-sm-8  justify-content-center'>
                  <div className='col-6 col-lg-3 col-md-6 col-sm-6 text-right'>
                    <input
                      onChange={handleGenderChange}
                      value='1'
                      required
                      type='radio'
                      name='sex'
                      className='radio-input sex text-start'
                      style={{ textAlign: 'end' }}
                    />
                    <label style={{ marginRight: '15px', fontSize: '16px' }}>
                      نر
                    </label>
                  </div>
                  <div className='col-6 col-lg-3 col-md-6 col-sm-6 text-right'>
                    <input
                      onChange={handleGenderChange}
                      value='2'
                      required
                      type='radio'
                      name='sex'
                      className='radio-input sex text-start'
                      style={{ textAlign: 'end' }}
                    />
                    <label style={{ marginRight: '15px', fontSize: '16px' }}>
                      ماده
                    </label>
                  </div>
                  {genderrequire ? (
                    <h5
                      className='mt-2'
                      style={{ color: '#dc3545', fontSize: '10px' }}
                    >
                      لطفا جنسیت را انتخاب کنید
                    </h5>
                  ) : null}{' '}
                </div>
              </div>
            ) : null}

            <div
              className='d-flex flex-column mt-2'
              style={{ cursor: 'pointer' }}
            >
              <input
                required
                onChange={handleTitleChange}
                value={title}
                className='select'
                type='text'
                placeholder='عنوان'
                style={
                  titlerequire
                    ? {
                        color: '#6d7588',
                        borderRadius: '5px',
                        height: '50px',
                        padding: '0px 20px',
                        width: '100%',
                        outline: 'none',
                        border: '1px solid #dc3545',
                        fontSize: '16px',
                      }
                    : {
                        color: '#6d7588',
                        borderRadius: '5px',
                        height: '50px',
                        padding: '0px 20px',
                        width: '100%',
                        outline: 'none',
                        border: '1px solid #cccccc7d',
                        fontSize: '16px',
                      }
                }
              />
            </div>

            {titlerequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                لطفا عنوان را به صورت کامل وارد کنید (حداقل ۳ کاراکتر)
              </h5>
            ) : null}

            {Brand == true ? (
              <div
                className='d-flex flex-column mt-3'
                style={{ cursor: 'pointer' }}
              >
                <input
                  required
                  onChange={handleBrandChange}
                  value={brand}
                  className=' select'
                  type='text'
                  placeholder='برند'
                  style={
                    !brandrequire
                      ? {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #cccccc7d',
                          fontSize: '16px',
                        }
                      : {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #dc3545',
                          fontSize: '16px',
                        }
                  }
                />
              </div>
            ) : null}
            {brandrequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                (حداقل 4 کاراکتر) لطفا برند آگهی را وارد کنید
              </h5>
            ) : null}

            {Petname ? (
              <div
                className='d-flex flex-column mt-3'
                style={{ cursor: 'pointer' }}
              >
                <input
                  required
                  onChange={handlePetnameChange}
                  value={petname}
                  className=' select'
                  type='text'
                  placeholder='نام حیوان'
                  style={
                    !petnamerequire
                      ? {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #cccccc7d',
                          fontSize: '16px',
                        }
                      : {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #dc3545',
                          fontSize: '16px',
                        }
                  }
                />
              </div>
            ) : null}

            {petnamerequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                (حداقل 2 کاراکتر) لطفا نام حیوان را وارد کنید
              </h5>
            ) : null}

            <div className='row mx-0 mt-4' style={{ textAlign: 'end' }}>
              <div className='row col-12 col-lg-12 col-md-8 col-sm-8  '>
                <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
                  <input
                    onChange={handleDeelChange}
                    value='1'
                    required
                    type='radio'
                    name='price'
                    className='radio-input sex text-start'
                    style={{ textAlign: 'end' }}
                  />
                  <label style={{ marginRight: '15px', fontSize: '16px' }}>
                    توافقی
                  </label>
                </div>
                <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
                  <input
                    onChange={handleFreeChange}
                    value='2'
                    required
                    type='radio'
                    name='price'
                    className='radio-input sex text-start'
                    style={{ textAlign: 'end' }}
                  />
                  <label style={{ marginRight: '15px', fontSize: '16px' }}>
                    رایگان
                  </label>
                </div>
                <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
                  <input
                    onChange={handleSwapChange}
                    value='3'
                    required
                    type='radio'
                    name='price'
                    className='radio-input sex text-start'
                    style={{ textAlign: 'end' }}
                  />
                  <label style={{ marginRight: '15px', fontSize: '16px' }}>
                    معاوضه
                  </label>
                </div>
                <div className='col-3 col-lg-3 col-md-6 col-sm-6 text-right'>
                  <input
                    onChange={handlePriceChange}
                    value='4'
                    required
                    type='radio'
                    name='price'
                    className='radio-input sex text-start'
                    style={{ textAlign: 'end' }}
                  />
                  <label style={{ marginRight: '15px', fontSize: '16px' }}>
                    تعریف قیمت
                  </label>
                </div>
              </div>
            </div>

            {typerequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                لطفا نوع آگهی را مشخص کنید
              </h5>
            ) : null}

            {priceInput === true ? (
              <div
                className='d-flex flex-column mt-3'
                style={{ cursor: 'pointer' }}
              >
                <input
                  onChange={handlePriceInputChange}
                  value={money}
                  required
                  className='select'
                  type='text'
                  placeholder=' قیمت (به  تومان  وارد  کنید)'
                  style={
                    !pricerequire
                      ? {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #cccccc7d',
                          fontSize: '16px',
                        }
                      : {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #dc3545',
                          fontSize: '16px',
                        }
                  }
                />
              </div>
            ) : null}
            {pricerequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                لطفا قیمت را به درستی وارد کنید
              </h5>
            ) : null}

            <input
              style={{ fontSize: '16px', padding: '25px 13px 266px 40px' }}
              className={
                !descrequire ? 'mt-3 single-form' : 'mt-3 single-form1'
              }
              type='text'
              onChange={handleDescChange}
              value={desc}
              placeholder=' توضیحات...'
            />

            {descrequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                لطفا توضیحات را به صورت کامل وارد کنید (حداقل 10 کاراکتر)
              </h5>
            ) : null}

            {/* <UploadImage className='mt-3' /> */}
            <Dropzone onDrop={onDrop} accept='image/png,image/jpeg,image/jpg'>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    height: '11em',
                    width: '100%',
                    borderRadius: '25px',
                    border: '2px solid rgb(194 194 194)',
                  }}
                  className='mt-2 text-center container'
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {/* {console.log('SelectedFile' + { ...getRootProps() })} */}
                    <p className='mt-2'>
                      عکس حود را آپلود کنید (بیشتر از 3 عکس نمیتوانید آپلود
                      کنید)
                    </p>
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
                              src={URL.createObjectURL(e)}
                              alt='hi'
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>

            {/* <UploadImage className='mt-3' /> */}
            <Dropzone onDrop={onDropVideo} accept='video/mp4'>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    height: '11em',
                    width: '100%',
                    borderRadius: '25px',
                    border: '2px solid rgb(194 194 194)',
                  }}
                  className='mt-2 text-center container'
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {/* {console.log('SelectedFile' + { ...getRootProps() })} */}
                    <p className='mt-2'>ویدئو خود را اپلود کنید</p>
                    <br />
                    <div className='d-flex flex-wrap justify-content-center'>
                      {video ? (
                        <div className='card'>
                          <AiOutlineClose
                            onClick={() => deleteVideo()}
                            size={10}
                          />
                          <div className='p-4'>
                            <AiOutlineVideoCamera size={25} />
                          </div>
                        </div>
                      ) : (
                        <p>برای آپلود ویدئو کلیک کنید</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>

            <div className='row mx-0 my-4' style={{ textAlign: 'end' }}>
              <div
                className='d-flex col-lg-7 col-md-11 col-sm-11 col-11  my-auto  text-right'
                style={{ textAlign: 'right' }}
              >
                <label htmlFor='horns'>مشارکت در فروش </label>
                <p
                  className='mt-2 mr-3'
                  style={{
                    fontSize: '12px',
                    textAlign: 'right',
                    marginRight: '15px',
                  }}
                >
                  ( آگهی خود را به اشتراک بگذارید تا سریعتر به فروش برسد)
                </p>
              </div>

              <div className='col-lg-1 col-md-1 col-sm-1 col-1'>
                <input
                  onChange={handleAffiliateChange}
                  value='1'
                  required
                  type='checkbox'
                  id='horns'
                  name='horns'
                  style={{ textAlign: 'right', marginTop: '3px' }}
                />
              </div>
            </div>

            {affiliatePrice === true ? (
              <div
                className='d-flex flex-column mt-3'
                style={{ cursor: 'pointer' }}
              >
                <input
                  onChange={handleAffiliatePriceChange}
                  value={affiliatePricevalue}
                  required
                  className=' select'
                  type='text'
                  placeholder='قیمت'
                  style={
                    !affiliatepricerequire
                      ? {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #cccccc7d',
                          fontSize: '16px',
                        }
                      : {
                          color: '#6d7588',
                          borderRadius: '5px',
                          height: '50px',
                          padding: '0px 20px',
                          width: '100%',
                          outline: 'none',
                          border: '1px solid #dc3545',
                          fontSize: '16px',
                        }
                  }
                />
              </div>
            ) : null}
            {affiliatepricerequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                لطفا قیمت را به درستی وارد کنید
              </h5>
            ) : null}

            <div
              className='d-flex flex-column mt-3'
              style={{ cursor: 'pointer' }}
            >
              <input
                onChange={handleLinkChange}
                value={link}
                required
                className='select'
                type='text'
                placeholder='لینک آگهی'
                style={{
                  color: '#6d7588',
                  borderRadius: '5px',
                  height: '50px',
                  padding: '0px 20px',
                  width: '100%',
                  outline: 'none',
                  border: '1px solid #cccccc7d',
                  fontSize: '16px',
                }}
              />
            </div>

            <div className='text-center mt-3'>
              <button
                className='mainBtn1  '
                style={{ width: '100%' }}
                onClick={() => {
                  getAddType()
                }}
              >
                مرحله بعد
              </button>
            </div>
            <ModalType
              link={link}
              data={data}
              typemodal={typemodal}
              typeclose={typeclose}
              video={video}
              AddType={AddType}
            />
          </div>
        </div>
      </div>

      <LogoFooter className='mt-2' />
    </>
  )
}

export default FormAdd
