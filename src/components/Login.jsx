import React, { useState } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { Button, Modal } from 'react-bootstrap'
import { FiLogIn } from 'react-icons/fi'
import { LinkContainer } from 'react-router-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import ModalLogin from './ModalLogin'
import StateModal from '../pages/StateModal'
import CityModal from '../pages/CityModal'
import Addadds from './Addadds'
import { Cookies, useCookies } from 'react-cookie'
import { FaPlus, FaPaw, FaAffiliatetheme, FaUserSecret } from 'react-icons/fa'
import { RiFileUnknowFill } from 'react-icons/ri'
import { GiTrophy } from 'react-icons/gi'
import { FaGamepad } from 'react-icons/fa'
import {
  AiOutlineFullscreenExit,
  AiFillDashboard,
  AiOutlineUser,
} from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { BsBookmarkFill, BsLayersFill } from 'react-icons/bs'
import { MdStoreMallDirectory } from 'react-icons/md'
import Swal from 'sweetalert2'
import { BiGame } from 'react-icons/bi'

import man from '../img/man.png'
import woman from '../img/woman.png'

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [cookiesCityname, setCookieCityname, removeCookieCityname] = useCookies(
    ['cityname']
  )
  const { handleShow, AddShow, cityModalShow, cityModal } = useFilterContext()

  const handleRemoveCookie = () => {
    Swal.fire({
      title: 'آیا میخواهید از سایت خارج شوید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff8334',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
      }
    })
  }

  const logOut = () => {
    removeCookie('user')
    Swal.fire({
      confirmButtonText: 'فهمیدم',
      title: 'شما با موفقیت از سایت خارج شدید',
      icon: 'success',
    })
  }

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const showmodal = () => {
    Swal.fire({
      text: 'ابتدا باید ثبت نام کنید',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1fb811',
      cancelButtonColor: '#ff8900',
      cancelButtonText: 'بعدا',
      confirmButtonText: 'ثبت نام',
    }).then((result) => {
      if (result.isConfirmed) {
        handleShow()
      }
    })
  }

  const toggle = () => setDropdownOpen((prevState) => !prevState)
  return (
    <>
      {!cookies['user'] ? (
        <>
          <button className='loginBtn  rounded-pill' onClick={handleShow}>
            <FiLogIn />
            ورود
          </button>
          <ModalLogin />

          <button className='addBtn1  rounded-pill' onClick={showmodal}>
            <FaPlus style={{ marginLeft: '5px' }} />
            انتشار آگهی
          </button>

          <Dropdown
            className='dropdowndesktop '
            style={{ boxShadow: '0px 0px 0px 0px rgb(0 0 0 /100%)' }}
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle caret className='dropdown-border'>
              <BiGame
                size={15}
                style={{
                  marginLeft: '5px',
                  marginRight: '10px',
                  color: 'ff9800',
                }}
              />
              سرگرمی
            </DropdownToggle>
            <DropdownMenu className='dropdown-box '>
              <LinkContainer to='/petgram'>
                <DropdownItem className='d-flex'>
                  <FaPaw />
                  <h6 style={{ marginRight: '30px' }}>پت گرام</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/doc'>
                <DropdownItem className='d-flex'>
                  <RiFileUnknowFill />
                  <h6 style={{ marginRight: '30px' }}>دانستنی ها</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/competition'>
                <DropdownItem className='d-flex'>
                  <GiTrophy />
                  <h6 style={{ marginRight: '30px' }}>مسابقات</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/entertainment'>
                <DropdownItem className='d-flex'>
                  <FaGamepad />
                  <h6 style={{ marginRight: '30px' }}>بازی</h6>
                </DropdownItem>
              </LinkContainer>

              <LinkContainer to='/Foroshgah'>
                <DropdownItem className='d-flex'>
                  <MdStoreMallDirectory />
                  <h6 style={{ marginRight: '30px' }}>محصولات مشارکتی</h6>
                </DropdownItem>
              </LinkContainer>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : (
        <>
          <button className='addBtn  rounded-pill' onClick={AddShow}>
            <FaPlus style={{ marginLeft: '5px' }} />
            انتشار آگهی
          </button>
          <Addadds />
          <button
            className='logoutBtn rounded-pill '
            onClick={() => handleRemoveCookie()}
          >
            <AiOutlineFullscreenExit style={{ marginLeft: '5px' }} />
            خروج
          </button>

          <Dropdown
            className='dropdowndesktop '
            style={{ boxShadow: 'none' }}
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle caret className='dropdown-border'>
              <AiOutlineUser
                size={15}
                style={{
                  marginLeft: '5px',
                  marginRight: '10px',
                  color: 'ff9800',
                }}
              />
              {cookies['user'].first_name} {cookies['user'].last_name}
            </DropdownToggle>
            <DropdownMenu className='dropdown-box '>
              <DropdownItem className='d-flex justify-content-center'>
                {cookies['user'].image ? (
                  <img
                    src={cookies['user'].image}
                    style={{
                      width: '40%',
                      height: '40%',
                      borderRadius: '50px',
                      border: '1px solid #d4c9c9',
                    }}
                    alt='man'
                  />
                ) : null}
                {cookies['user'].gender === 1 &&
                cookies['user'].image === '' ? (
                  <img
                    src={man}
                    style={{
                      width: '40%',
                      height: '40%',
                      borderRadius: '50px',
                      border: '1px solid #d4c9c9',
                    }}
                    alt='man'
                  />
                ) : null}
                {cookies['user'].gender === 2 &&
                cookies['user'].image === '' ? (
                  <img
                    src={woman}
                    style={{
                      width: '40%',
                      height: '40%',
                      borderRadius: '50px',
                      border: '1px solid #d4c9c9',
                    }}
                    alt='man'
                  />
                ) : null}
              </DropdownItem>
              <LinkContainer to='/compeleteProfile'>
                <DropdownItem className='d-flex'>
                  <ImProfile />
                  <h6 style={{ marginRight: '30px' }}>پروفایل</h6>
                </DropdownItem>
              </LinkContainer>
              {cookies['user'].cooperation === 1 ? (
                <LinkContainer
                  to={`/CustomPet/${cookies['user'].individual_id}`}
                >
                  <DropdownItem className='d-flex'>
                    <FaUserSecret />
                    <h6 style={{ marginRight: '30px' }}>فروشگاه من</h6>
                  </DropdownItem>
                </LinkContainer>
              ) : null}
              <LinkContainer to='/dashboard'>
                <DropdownItem className='d-flex'>
                  <AiFillDashboard />
                  <h6 style={{ marginRight: '30px' }}>داشبورد</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/myadds'>
                <DropdownItem className='d-flex'>
                  <BsLayersFill />
                  <h6 style={{ marginRight: '30px' }}>آگهی های من</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/bookmarks'>
                <DropdownItem className='d-flex'>
                  <BsBookmarkFill />
                  <h6 style={{ marginRight: '30px' }}>نشان شده ها</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/petgram'>
                <DropdownItem className='d-flex'>
                  <FaPaw />
                  <h6 style={{ marginRight: '30px' }}>پت گرام</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/doc'>
                <DropdownItem className='d-flex'>
                  <RiFileUnknowFill />
                  <h6 style={{ marginRight: '30px' }}>دانستنی ها</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/competition'>
                <DropdownItem className='d-flex'>
                  <GiTrophy />
                  <h6 style={{ marginRight: '30px' }}>مسابقات</h6>
                </DropdownItem>
              </LinkContainer>
              <LinkContainer to='/entertainment'>
                <DropdownItem className='d-flex'>
                  <FaGamepad />
                  <h6 style={{ marginRight: '30px' }}>بازی</h6>
                </DropdownItem>
              </LinkContainer>
              {/* <LinkContainer to='/affiliate'>
                <DropdownItem className='d-flex'>
                  <FaAffiliatetheme />
                  <h6 style={{ marginRight: '30px' }}>همکاری در فروش</h6>
                </DropdownItem>
              </LinkContainer> */}
              <LinkContainer to='/Foroshgah'>
                <DropdownItem className='d-flex'>
                  <MdStoreMallDirectory />
                  <h6 style={{ marginRight: '30px' }}>محصولات مشارکتی</h6>
                </DropdownItem>
              </LinkContainer>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
      <button className='cityBtn  rounded-pill' onClick={cityModalShow}>
        <FiLogIn style={{ marginLeft: '5px' }} />
        {cookies['cityname'] ? cookies['cityname'] : 'شهر'}
      </button>
      {cityModal ? <CityModal /> : null}
    </>
  )
}

export default Login
