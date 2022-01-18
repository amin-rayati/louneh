import { React, useState, useCallback, useEffect } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { FiSearch } from 'react-icons/fi'
import dog from '../img/dog.jpg'
import Fade from 'react-reveal/Fade'
import { RiEditCircleFill } from 'react-icons/ri'
import { AiFillInstagram, AiFillPhone } from 'react-icons/ai'
import { BsFillEnvelopeFill } from 'react-icons/bs'
import { FaAddressBook, FaEnvelope } from 'react-icons/fa'
import axios from 'axios'
import Logo from '../assets/logo.png'
import Swal from 'sweetalert2'
import Loading from './LoadingAdd'
import { Cookies, useCookies } from 'react-cookie'
import validator from 'validator'
const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [siteInfo, setSiteInfo] = useState('')
  const [name, setName] = useState(
    cookies['user'] ? cookies['user'].first_name : ''
  )
  const [lastName, setLastName] = useState(
    cookies['user'] ? cookies['user'].last_name : ''
  )
  const [email, setAdEmail] = useState('')
  const [message, setMessage] = useState('')

  const [emailRequire, setEmailRequire] = useState(false)
  const [messageRequire, setMessageRequire] = useState(false)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setAdEmail(e.target.value)
  }
  const handleMessageChange = (e) => {
    setMessage(e.target.value)
    setMessageRequire(false)
  }

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmailRequire(false)
      return true
    } else {
      return false
    }
  }

  const sendMessage = () => {
    if (cookies['user']) {
      if (!validateEmail(email)) {
        setEmailRequire(true)
      } else if (message === '' || message.length <= 10) {
        setMessageRequire(true)
      } else {
        setLoading(true)
        axios
          .post(
            'https://new.louneh.louneh.com/admin/Contact/API/_sendTicket',
            {
              individualId: cookies['user'].individual_id,
              email: email,
              message: message,
            },
            {
              headers: {
                token: 'test',
              },
            }
          )

          .then((response) => {
            setLoading(false)
            if (response.data.isDone) {
              Swal.fire({
                confirmButtonText: 'فهمیدم',
                icon: 'success',
                text: 'پیغام شما با موفقیت ثبت شد',
              })
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    } else {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'اول باید وارد سایت شوید کنید',
      })
    }
  }

  const getSiteInfo = async () => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Infos/API/_getInformations',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
        }
      )
      const content = await rawResponse.json()
      setSiteInfo(content.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSiteInfo()
  }, [])

  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className=' text-center mt-5' style={{ fontSize: '33px' }}>
          ارتباط با ما
        </h4>
        <div className='row mx-3'>
          <div
            className='mt-5 col-lg-6 mx-auto col-md-12 col-sm-12 col-12 '
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '25px',
              padding: '20px',
              boxShadow: '0px 0px 12px 12px rgb(206 206 206/50%)',
            }}
          >
            <div className='row'>
              <div className='col-lg-6 mt-3'>
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
              <div className='col-lg-6 mt-3'>
                <div style={{ textAlign: 'initial' }}>
                  <label>
                    <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                      نام خانوادگی
                    </h6>
                  </label>
                </div>
                <div className='row mx-0 mt-2'>
                  <input
                    onChange={handleLastNameChange}
                    value={lastName}
                    required
                    className=' select'
                    placeholder=' نام خانوادگی'
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
            </div>

            <div className='col-lg-12 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    ایمیل
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className=' select'
                  placeholder='ایمیل'
                  type='email'
                  title='Ten digits code'
                  style={
                    !emailRequire
                      ? {
                          borderRadius: '1.45rem',
                          border: '1px solid #0000004f',
                          height: '40px',
                          width: '100%',
                          outline: 'none',
                          background: '#ffffff',
                          boxShadow:
                            'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                        }
                      : {
                          borderRadius: '1.45rem',
                          border: '1px solid #dc3545',
                          height: '40px',
                          width: '100%',
                          outline: 'none',
                          background: '#ffffff',
                          boxShadow:
                            'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                        }
                  }
                />
              </div>
            </div>
            {emailRequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                لطفا ایمیل را به درستی وارد کنید
              </h5>
            ) : null}

            <div className='col-lg-12 mt-3'>
              <div style={{ textAlign: 'initial' }}>
                <label>
                  <h6 style={{ color: '#0000006b', fontWeight: 'bold' }}>
                    پیغام شما
                  </h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  required
                  className=' select'
                  placeholder='پیغام شما'
                  type='text'
                  title='Ten digits code'
                  style={
                    !messageRequire
                      ? {
                          borderRadius: '1.45rem',
                          border: '1px solid #0000004f',
                          height: '120px',
                          width: '100%',
                          padding: '20px',
                          outline: 'none',
                          background: '#ffffff',
                          boxShadow:
                            'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                        }
                      : {
                          borderRadius: '1.45rem',
                          border: '1px solid #dc3545',
                          height: '120px',
                          width: '100%',
                          padding: '20px',
                          outline: 'none',
                          background: '#ffffff',
                          boxShadow:
                            'inset 24px 15px 20px -10px rgb(210 203 203 / 50%)',
                        }
                  }
                ></textarea>
              </div>
            </div>

            {messageRequire ? (
              <h5
                className='mt-2'
                style={{ color: '#dc3545', fontSize: '10px' }}
              >
                لطفا متن پیام را وارد کنید (حداقل 10 حرف)
              </h5>
            ) : null}

            <div className='text-center'>
              <button className='mainBtn1 mt-5 ' onClick={sendMessage}>
                {loading ? <Loading /> : ' ارسال پیام'}
              </button>
            </div>
          </div>

          <div
            className='mt-5 col-lg-4 mx-auto col-md-12 col-sm-12 col-12 '
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '25px',
              padding: '20px',
              boxShadow: '0px 0px 12px 12px rgb(206 206 206/50%)',
            }}
          >
            <div
              className='row mt-5'
              style={{ justifyContent: 'space-around' }}
            >
              <AiFillPhone className='col-2' size={30} />
              <h5 className='col-8'>
                شماره تماس : {siteInfo ? siteInfo[0]['infoMobile'] : null}
              </h5>
            </div>
            <div
              className='row mt-5'
              style={{ justifyContent: 'space-around' }}
            >
              <FaAddressBook className='col-2' size={30} />
              <h5 className='col-8'>
                آدرس : {siteInfo ? siteInfo[0]['infoAddress'] : null}
              </h5>
            </div>
            <div
              className='row mt-5'
              style={{ justifyContent: 'space-around' }}
            >
              <FaEnvelope className='col-2' size={30} />
              <h5 className='col-8'>
                ایمیل : {siteInfo ? siteInfo[0]['infoEmail'] : null}
              </h5>
            </div>
            <img className='mt-5' src={Logo} alt='logo' />
          </div>
        </div>

        <LogoFooter />
      </div>
    </>
  )
}

export default Contact
