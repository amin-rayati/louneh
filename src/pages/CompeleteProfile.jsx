import { React, useState, useCallback, useEffect } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import axios from 'axios'
import { Cookies, useCookies } from 'react-cookie'
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2'
import Loading from '../pages/LoadingModal'

import { useFilterContext } from '../context/FilterProvider'

const stateurl = 'https://new.louneh.louneh.com/admin/States/API/_apiStates'
const cityurl = 'https://new.louneh.louneh.com/admin/Cities/API/_apiCities'
const submitUrl =
  'https://new.louneh.louneh.com/admin/Customers/API/_editProfile'

const CompeleteProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [profileImg, setProfileImg] = useState([])
  const [name, setName] = useState(cookies['user'].first_name)
  const [lastname, setLastName] = useState(cookies['user'].last_name)
  const mobile = cookies['user'].mobile
  const [gender, setGender] = useState(cookies['user'].gender)
  const [affiliate, setAffiliate] = useState(cookies['user'].cooperation)
  const [stateName, setStateName] = useState('')
  const [cityName, setCityName] = useState('')
  const [website, setWebsite] = useState(cookies['user'].social['website'])
  const [instagram, setInstagram] = useState(
    cookies['user'].social['instagram']
  )
  const [telegram, setTelegram] = useState(cookies['user'].social['telegram'])
  const [email, setEmail] = useState(cookies['user'].social['email'])

  const handleStateChange = (e) => {
    getCity(e.target.value)
    setStateName(e.target.value)
  }
  const handleCityChange = (e) => {
    setCityName(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleLastChange = (e) => {
    setLastName(e.target.value)
  }
  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value)
  }
  const handleInstagramChange = (e) => {
    setInstagram(e.target.value)
  }
  const handleTelegramChange = (e) => {
    setTelegram(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }
  const handleAffiliateChange = (e) => {
    if (e.target.checked) {
      setAffiliate('1')
    } else {
      setAffiliate('2')
    }
  }

  const getState = useCallback(async () => {
    try {
      const rawResponse = await fetch(stateurl, {
        method: 'POST',
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()
      setState(content.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getCity = useCallback(async (id) => {
    axios
      .post(
        cityurl,
        {
          state_id: id,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        setCity(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const onDrop = async (acceptedFiles) => {
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
      setImageUrl(tmp.split(',')[1])
    })

    Promise.all(base64Images).then((res) => {})
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (
      name === '' ||
      lastname === '' ||
      name.length == 0 ||
      lastname.length == 0
    ) {
    } else {
      axios
        .post(
          submitUrl,
          {
            fname: name,
            lname: lastname,
            mobile: mobile,
            gender: gender,
            cooperation: affiliate,
            state_id: document.getElementById('state').value,
            city_id: document.getElementById('city').value,
            image: imageUrl,
            website: website,
            telegram: telegram,
            instagram: instagram,
            email: email,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            getIndividualInfo(e)
            Swal.fire({
              confirmButtonText: 'فهمیدم',
              icon: 'success',
              text: 'پروفایل شما با موفقیت تغییر کرد',
            })
          } else {
            Swal.fire({
              confirmButtonText: 'فهمیدم',
              icon: 'error',
              text: 'دوباره تلاش کنید',
            })
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const handleCookie = (infoObject) => {
    setCookie('user', infoObject, {
      path: '/',
    })
  }

  const getIndividualInfo = (e) => {
    e.preventDefault()
    axios
      .post(
        'https://new.louneh.louneh.com/admin/Customers/API/_getIndividualInformations',
        {
          mobile: cookies['user'].mobile,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          handleCookie(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getState()
  }, [])
  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className=' text-center mt-5' style={{ fontSize: '33px' }}>
          پروفایل
        </h4>
        <div
          className='mt-5 col-lg-7 mx-auto col-md-8 col-sm-8 col-10 '
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '25px',
            padding: '20px',
            boxShadow: '0px 0px 12px 12px rgb(206 206 206/50%)',
          }}
        >
          <div className='row justify-content-center'>
            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    نام
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  required
                  onChange={handleNameChange}
                  value={name}
                  className=' select'
                  placeholder='نام'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                />
              </div>
            </div>

            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    نام خانوادگی
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  required
                  value={lastname}
                  onChange={handleLastChange}
                  className=' select'
                  placeholder='نام'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                />
              </div>
            </div>

            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    استان
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <select
                  onChange={handleStateChange}
                  required
                  id='state'
                  className=' select'
                  placeholder='نام'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                >
                  <option disabled>استان</option>
                  {state &&
                    state.map((e) => {
                      return (
                        <option
                          key={e.stateId}
                          value={e.stateId}
                          onClick={() => getCity(e.stateId)}
                        >
                          {e.stateName}
                        </option>
                      )
                    })}
                </select>
              </div>
            </div>

            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    شهر
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <select
                  onChange={handleCityChange}
                  required
                  id='city'
                  className=' select'
                  placeholder='نام'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                >
                  <option disabled>شهر</option>
                  {city &&
                    city.map((e) => {
                      return (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      )
                    })}
                </select>
              </div>
            </div>

            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    اینستاگرام
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleInstagramChange}
                  value={instagram}
                  required
                  className=' select'
                  placeholder=' اینستاگرام'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                />
              </div>
            </div>

            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    تلگرام
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleTelegramChange}
                  value={telegram}
                  required
                  className=' select'
                  placeholder=' تلگرام'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                />
              </div>
            </div>

            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    وب سایت
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleWebsiteChange}
                  value={website}
                  required
                  className=' select'
                  placeholder='  وب سایت'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                />
              </div>
            </div>

            <div className='col-lg-5 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    ایمیل
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  required
                  className=' select'
                  placeholder=' ایمیل'
                  type='text'
                  title='Ten digits code'
                  style={{
                    borderRadius: '1.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '100%',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow:
                      'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                  }}
                />
              </div>
            </div>

            <div className='col-lg-10 mt-3 row'>
              <div className='col-lg-4 mt-3'>
                <Dropzone
                  onDrop={onDrop}
                  accept='image/png,image/jpeg,image/jpg'
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        height: '11em',
                        width: '80%',
                        borderRadius: '25px',
                        border: '2px solid rgb(194 194 194)',
                      }}
                      className='mt-2 text-center container'
                    >
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className='mt-2'>عکس خود را اپلود کنید</p>
                        <br />
                        <div className='d-flex flex-wrap justify-content-center'>
                          {profileImg.map((e) => {
                            return (
                              <div className='col-md-12'>
                                {cookies['user'] ? (
                                  <img
                                    style={{
                                      width: '75px',
                                      height: '75px',
                                      borderRadius: '50%',
                                    }}
                                    alt='a'
                                    src={cookies['user'].image}
                                  />
                                ) : (
                                  <img
                                    style={{
                                      width: '75px',
                                      height: '75px',
                                      borderRadius: '50%',
                                    }}
                                    alt='b'
                                    src={URL.createObjectURL(e)}
                                  />
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className='col-lg-8'>
                <div className='row mx-0 mt-4' style={{ textAlign: 'end' }}>
                  <div
                    className='col-3 my-auto  text-right'
                    style={{ textAlign: 'right' }}
                  >
                    <label>جنسیت :</label>
                  </div>
                  <div className='row col-7 col-lg-9 col-md-8 col-sm-8  '>
                    <div className='col-6 col-lg-6 col-md-6 col-sm-6 text-right'>
                      <label
                        className='fontsize-sm '
                        style={{ marginLeft: '15px' }}
                      >
                        خانم
                      </label>
                      <input
                        onChange={handleGenderChange}
                        value={gender}
                        required
                        type='radio'
                        name='sex'
                        className='sex text-start'
                        value='2'
                        checked={gender == 2 ? true : false}
                        style={{ textAlign: 'end' }}
                      />
                    </div>
                    <div className='col-6 col-lg-6 col-md-6 col-sm-6 text-right'>
                      <label
                        className='fontsize-sm '
                        style={{ marginLeft: '15px' }}
                      >
                        اقا
                      </label>
                      <input
                        onChange={handleGenderChange}
                        value={gender}
                        required
                        type='radio'
                        name='sex'
                        className='sex text-start'
                        checked={gender == 1 ? true : false}
                        value='1'
                        style={{ textAlign: 'end' }}
                      />
                    </div>
                  </div>
                </div>
                <div className='row mx-0 mt-4' style={{ textAlign: 'end' }}>
                  <div
                    className='col-4 my-auto  text-right'
                    style={{ textAlign: 'right' }}
                  >
                    <label htmlFor='horns'>مشارکت در فروش :</label>
                  </div>
                  <div className='col-6' style={{ textAlign: 'initial' }}>
                    <input
                      onChange={handleAffiliateChange}
                      required
                      type='checkbox'
                      id='horns'
                      checked={affiliate == 1 ? true : false}
                      name='horns'
                      style={{ textAlign: 'right', marginTop: '3px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='clo-lg-8 mt-5 text-center'>
              <button className='mainBtn1' onClick={submitForm}>
                {!loading ? 'ثبت پروفایل' : <Loading />}
              </button>
            </div>
          </div>
        </div>

        <LogoFooter />
      </div>
    </>
  )
}

export default CompeleteProfile
