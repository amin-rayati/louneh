import { useState, useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Loading from '../pages/LoadingModal'
import Swal from 'sweetalert2'
import { Cookies, useCookies } from 'react-cookie'

const codeValidateUrl =
  'https://new.louneh.louneh.com/admin/Customers/API/_register'
const mobileUrl =
  'https://new.louneh.louneh.com/admin/Customers/API/_startLoginRegister'

const registerUrl =
  'https://new.louneh.louneh.com/admin/Customers/API/_completeRegister'

const individual =
  'https://new.louneh.louneh.com/admin/Customers/API/_getIndividualInformations'

const ModalLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const { show, handleClose, RegisterShow, RegisterClose, registerModal } =
    useFilterContext()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [newpass1, setnewpass1] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [name1, setName1] = useState()
  const [lastName1, setLastName1] = useState()
  // const [individualId, setindividualId] = useState()
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [affiliate, setAffiliate] = useState(2)

  const [seconds, setSeconds] = useState(30)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [ispass, setIsPass] = useState(false)
  const [btn, setBtn] = useState(true)
  const [btnLogin, setBtnLogin] = useState(false)
  const [btnRegister, setBtnRegister] = useState(false)
  const [resendcode, setresendcode] = useState(false)
  const [coundown, setCountdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [btnsetpass, setbtnsetpass] = useState(false)
  const [inputcode1, setinputcode1] = useState(false)
  const [btncode1, setbtncode1] = useState(false)
  const [setnewpass, setsetnewpass] = useState(false)
  const [btnnewpass, setbtnnewpass] = useState(false)

  const handleCookie = (infoObject) => {
    setCookie('user', infoObject, {
      path: '/',
    })
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleNewPassChange = (e) => {
    setnewpass1(e.target.value)
  }
  const handleCodeChange = (e) => {
    setCode(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleLnameChange = (e) => {
    setLastName(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
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

  const validateMobilephone = (input) => {
    let mobile = /^09{1}[\d]{9}$/
    if (mobile.test(input)) {
      return input
    } else {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'لطفا شماره تماس را درست وارد کنید',
      })
      return false
    }
  }

  const handleCountDown = useCallback(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    } else {
      setCountdown(false)
      setresendcode(true)
      setTimeout(() => {
        setLoading1(false)
      }, 4000)
    }
  }, [seconds])

  const foregtpass = (e) => {
    e.preventDefault()
    setBtnLogin(false)
    setIsPass(false)
    setbtnsetpass(false)

    setbtncode1(true)
    handleCountDown()

    setCountdown(true)
    setinputcode1(true)

    e.preventDefault()

    axios
      .post(
        'https://new.louneh.louneh.com/admin/Customers/API/_forgetPassword',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        if (response.data.isDone === true) {
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const resendCode = (e) => {
    e.preventDefault()
    setLoading1(true)
    setTimeout(() => {
      setCountdown(true)
      setresendcode(false)
      setSeconds(30)
    }, 2000)

    e.preventDefault()
    validateMobilephone(phone)
    if (validateMobilephone(phone) === false) return

    axios
      .post(
        'https://new.louneh.louneh.com/admin/Customers/API/_resendCode',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            confirmButtonText: 'فهمیدم',
            icon: 'success',
            text: 'کد تایید ارسال شد',
          })
        } else {
          Swal.fire({
            confirmButtonText: 'فهمیدم',
            icon: 'error',
            text: 'دوباره تلاش کنید',
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const sendCode1 = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'تمام فیلد ها پر شود',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
          setbtncode1(false)
        }
      })
    } else {
      axios
        .post(
          codeValidateUrl,
          {
            mobile: phone,
            code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            if (response.data.isDone === true) {
              Swal.fire({
                confirmButtonText: 'فهمیدم',
                icon: 'success',
                text: 'کد درست است ',
              }).then((result) => {
                if (result.isConfirmed) {
                  setCountdown(false)
                  setinputcode1(false)
                  setsetnewpass(true)
                  setbtnnewpass(true)
                  setbtncode1(false)
                }
              })
            } else {
              if (response.data.data === 'شماره موبایل ثبت نشده') {
                Swal.fire({
                  confirmButtonText: 'فهمیدم',
                  icon: 'error',
                  text: 'شماره موبایل ثبت نشده',
                })
              } else if (response.data.data === 'کد وارد شده صحیح نیست') {
                Swal.fire({
                  confirmButtonText: 'فهمیدم',
                  icon: 'error',
                  text: 'کد وارد شده درست نیست',
                })
              }
            }
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
  const handleKeyDownSendCode1 = (event) => {
    if (event.key === 'Enter') {
      sendCode1(event)
    }
  }

  const setNewpassword = (e) => {
    e.preventDefault()
    setLoading(true)
    if (newpass1 === '') {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'تمام فیلد ها پر شود',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
        }
      })
    } else {
      axios
        .post(
          'https://new.louneh.louneh.com/admin/Customers/API/_setpassword',
          {
            mobile: phone,
            newpassword: newpass1,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            if (response.data.isDone === true) {
              getIndividualInfo(e)
              handleCookie(response.data.data)

              Swal.fire({
                confirmButtonText: 'فهمیدم',
                icon: 'success',
                text: 'رمز جدید با موفقیت ثبت شد',
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose()
                  getIndividualInfo(e)
                  handleCookie(response.data.data)
                }
              })
            }
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

  const handleKeyDownSetNewpassword = (event) => {
    if (event.key === 'Enter') {
      setNewpassword(event)
    }
  }

  const sendMobile = (e) => {
    e.preventDefault()
    validateMobilephone(phone)
    if (validateMobilephone(phone) === false) return
    setLoading(true)
    axios
      .post(
        mobileUrl,
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data['is_register'] === 1) {
            setBtn(false)
            setBtnLogin(true)
            setIsPass(true)
            setbtnsetpass(true)
          } else if (response.data.data['is_register'] === 0) {
            handleCountDown()
            setCountdown(true)
            setBtn(false)
            setBtnRegister(true)
            setIsCodeSent(true)
          }
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
  const handleKeyDownSendMobile = (event) => {
    if (event.key === 'Enter') {
      sendMobile(event)
    }
  }

  const sendCode = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'تمام فیلد ها پر شود',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
        }
      })
    } else {
      axios
        .post(
          codeValidateUrl,
          {
            mobile: phone,
            code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            setIsCodeSent(true)

            if (response.data.isDone === true) {
              handleClose()
              RegisterShow()
            } else {
              if (response.data.data === 'شماره موبایل ثبت نشده') {
                Swal.fire({
                  confirmButtonText: 'فهمیدم',
                  icon: 'error',
                  text: 'شماره موبایل ثبت نشده',
                })
              } else if (response.data.data === 'کد وارد شده صحیح نیست') {
                Swal.fire({
                  confirmButtonText: 'فهمیدم',
                  icon: 'error',
                  text: 'کد وارد شده درست نیست',
                })
              }
            }
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
  const handleKeyDownSendCode = (event) => {
    if (event.key === 'Enter') {
      sendCode(event)
    }
  }

  const Register = (e) => {
    e.preventDefault()
    setLoading(true)
    if (name === '' || lastName === '' || gender === '' || password === '') {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'تمام فیلد ها پر شود',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
        }
      })
    } else {
      axios
        .post(
          registerUrl,
          {
            fname: name,
            lname: lastName,
            mobile: phone,
            gender: gender,
            cooperation: affiliate,
            password: password,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            setIsCodeSent(true)
            getIndividualInfo(e)
            handleCookie(response.data.data)
            Swal.fire({
              confirmButtonText: 'فهمیدم',
              icon: 'success',
              text: 'ثبت نام شما با موفقیت انجام شد',
            }).then((result) => {
              if (result.isConfirmed) {
                getIndividualInfo(e)
                handleCookie(response.data.data)
                setLoading(false)
                RegisterClose()
              }
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
  const handleKeyDownRegister = (event) => {
    if (event.key === 'Enter') {
      Register(event)
    }
  }

  const sendPass = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'تمام فیلد ها پر شود',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
        }
      })
    }
    axios
      .post(
        'https://new.louneh.louneh.com/admin/Customers/API/_login',
        {
          mobile: phone,
          password: code,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        if (response.status === 200) {
          if (response.data.isDone === true) {
            getIndividualInfo(e)

            Swal.fire({
              confirmButtonText: 'فهمیدم',
              icon: 'success',
              text: 'به لونه خوش امدید',
            }).then((result) => {
              if (result.isConfirmed) {
                setLoading(false)
                handleClose()
              }
            })
          } else {
            if (response.data.data === 'شماره موبایل ثبت نشده') {
              Swal.fire({
                confirmButtonText: 'فهمیدم',
                icon: 'error',
                text: 'شماره موبایل ثبت نشده',
              })
            } else if (
              response.data.data ===
              'پسورد وارد شده با پسورد تعیین شده توسط کاربر مغایرت دارد'
            ) {
              Swal.fire({
                confirmButtonText: 'فهمیدم',
                icon: 'error',
                text: 'رمز وارد شده درست نیست',
              })
            }
          }
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
  const handleKeyDownsendPass = (event) => {
    if (event.key === 'Enter') {
      sendPass(event)
    }
  }

  const getIndividualInfo = (e) => {
    e.preventDefault()
    axios
      .post(
        'https://new.louneh.louneh.com/admin/Customers/API/_getIndividualInformations',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          setName1(response.data.data.first_name)
          setLastName1(response.data.data.last_name)
          handleCookie(response.data.data)
          window.location.reload(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (isCodeSent) {
      const timerID = setInterval(() => handleCountDown(), 1000)
      return () => clearInterval(timerID)
    }
    if (inputcode1) {
      const timerID = setInterval(() => handleCountDown(), 1000)
      return () => clearInterval(timerID)
    }
  }, [handleCountDown, isCodeSent, inputcode1])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>ورود به سایت</Modal.Title>
          <ImCross
            onClick={handleClose}
            style={{ fontSize: '10px', color: '#a0a8af' }}
          />
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'initial' }}>
            <label>
              <h6 style={{ color: '#0000006b' }}>شماره موبایل</h6>
            </label>
          </div>
          <div className='row mx-0 mt-2'>
            <input
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDownSendMobile}
              value={phone}
              required
              className=' select'
              placeholder='شماره موبایل'
              pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
              type='text'
              title='Ten digits code'
              style={{
                borderRadius: '0.45rem',
                border: '1px solid #0000004f',
                height: '30px',
                width: '100%',
                outline: 'none',
                background: '#e8f0fe',
              }}
            />
          </div>

          {isCodeSent ? (
            <div className='row mx-0 mt-5'>
              <input
                onChange={handleCodeChange}
                onKeyDown={handleKeyDownSendCode}
                value={code}
                required
                placeholder='کد تایید'
                className=' select'
                type='text'
                title='Ten digits code'
                style={{
                  borderRadius: '0.45rem',
                  border: '1px solid #0000004f',
                  height: '30px',
                  width: '100%',
                  outline: 'none',
                  background: '#e8f0fe',
                }}
              />
            </div>
          ) : null}
          {ispass ? (
            <div className='row mx-0 mt-5'>
              <input
                onChange={handleCodeChange}
                onKeyDown={handleKeyDownsendPass}
                value={code}
                required
                placeholder='رمز عبور'
                className=' select'
                type='password'
                title='Ten digits code'
                style={{
                  borderRadius: '0.45rem',
                  border: '1px solid #0000004f',
                  height: '30px',
                  outline: 'none',
                  width: '100%',
                  background: '#e8f0fe',
                }}
              />
            </div>
          ) : null}

          {inputcode1 ? (
            <div className='row mx-0 mt-5'>
              <input
                onChange={handleCodeChange}
                onKeyDown={handleKeyDownSendCode1}
                value={code}
                required
                placeholder='کد تایید'
                className=' select'
                type='text'
                title='Ten digits code'
                style={{
                  borderRadius: '0.45rem',
                  border: '1px solid #0000004f',
                  height: '30px',
                  width: '100%',
                  outline: 'none',
                  background: '#e8f0fe',
                }}
              />
            </div>
          ) : null}

          {setnewpass ? (
            <div className='row mx-0 mt-5'>
              <input
                onChange={handleNewPassChange}
                onKeyDown={handleKeyDownSetNewpassword}
                value={newpass1}
                required
                placeholder='پسورد جدید '
                className=' select'
                type='text'
                title='Ten digits code'
                style={{
                  borderRadius: '0.45rem',
                  border: '1px solid #0000004f',
                  height: '30px',
                  width: '100%',
                  outline: 'none',
                  background: '#e8f0fe',
                }}
              />
            </div>
          ) : null}

          <div className='d-flex justify-content-between mt-4'>
            {resendcode ? (
              <button className='mainBtn1 ' onClick={resendCode}>
                {!loading1 ? ' ارسال مجدد کد' : <Loading />}
              </button>
            ) : null}
            {coundown ? (
              <p className='text-left mt-auto'>
                {`${
                  seconds !== 0
                    ? `${seconds}   ثانیه در ارسال مجدد کد تائید  `
                    : ` ارسال مجدد کد تایید`
                }`}
              </p>
            ) : null}
          </div>

          <div className='d-flex justify-content-between mt-4'>
            {btnsetpass ? (
              <button className='mainBtn1 ' onClick={foregtpass}>
                فراموشی رمز
              </button>
            ) : null}
            {/* {coundown ? (
              <p className='text-left mt-auto'>
                {`${
                  seconds !== 0
                    ? `${seconds}   ثانیه در ارسال مجدد کد تائید  `
                    : ` ارسال مجدد کد تایید`
                }`}
              </p>
            ) : null} */}
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          {btn ? (
            <button className='mainBtn1' onClick={sendMobile}>
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}

          {btnRegister ? (
            <button className='mainBtn1' onClick={sendCode}>
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}

          {btnLogin ? (
            <button className='mainBtn1' onClick={sendPass}>
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}
          {btncode1 ? (
            <button className='mainBtn1' onClick={sendCode1}>
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}
          {btnnewpass ? (
            <button className='mainBtn1' onClick={setNewpassword}>
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}
        </Modal.Footer>
      </Modal>
      <Modal show={registerModal} onHide={RegisterClose}>
        <Modal.Header>
          <Modal.Title>ثبت نام</Modal.Title>
          <ImCross
            style={{ fontSize: '10px', color: '#a0a8af' }}
            onClick={RegisterClose}
          />
        </Modal.Header>
        <Modal.Body>
          <div className='row mx-0'>
            <div className='col-3 my-auto'>
              <label>نام :</label>
            </div>
            <input
              onChange={handleNameChange}
              value={name}
              required
              className='col-9 mt-3'
              id='name'
              type='text'
              placeholder='نام'
              style={{
                borderRadius: '0.45rem',
                border: '1px solid #0000004f',
                height: '30px',
                width: '100%',
                outline: 'none',
                background: '#e8f0fe',
              }}
            />
          </div>

          <div className='row mx-0 mt-2'>
            <div className='col-3 my-auto'>
              <label>نام خانوادگی :</label>
            </div>
            <input
              onChange={handleLnameChange}
              value={lastName}
              required
              className='col-9 mt-3'
              id='lastname'
              type='text'
              placeholder='نام خانوادگی'
              style={{
                borderRadius: '0.45rem',
                border: '1px solid #0000004f',
                height: '30px',
                width: '100%',
                outline: 'none',
                background: '#e8f0fe',
              }}
            />
          </div>

          <div className='row mx-0 mt-2'>
            <div className='col-3 my-auto'>
              <label> رمز عبور :</label>
            </div>
            <input
              onChange={handlePasswordChange}
              value={password}
              required
              className='col-9 mt-3'
              id='phoneNo_register'
              type='password'
              style={{
                borderRadius: '0.45rem',
                border: '1px solid #0000004f',
                height: '30px',
                width: '100%',
                outline: 'none',
                background: '#e8f0fe',
              }}
            />
          </div>

          <div className='row mx-0 mt-4' style={{ textAlign: 'end' }}>
            <div
              className='col-3 my-auto  text-right'
              style={{ textAlign: 'right' }}
            >
              <label>جنسیت :</label>
            </div>
            <div className='row col-7 col-lg-9 col-md-8 col-sm-8  '>
              <div className='col-6 col-lg-6 col-md-6 col-sm-6 text-right'>
                <label className='fontsize-sm ' style={{ marginLeft: '15px' }}>
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
                  style={{ textAlign: 'end' }}
                />
              </div>
              <div className='col-6 col-lg-6 col-md-6 col-sm-6 text-right'>
                <label className='fontsize-sm ' style={{ marginLeft: '15px' }}>
                  اقا
                </label>
                <input
                  onChange={handleGenderChange}
                  value={gender}
                  required
                  type='radio'
                  name='sex'
                  className='sex text-start'
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
            <div className='col-6'>
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
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <button
            className='mainBtn1'
            onKeyDown={handleKeyDownRegister}
            onClick={Register}
          >
            {!loading ? 'ورود/ثبت نام' : <Loading />}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalLogin
