import { useState } from 'react'
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
import Addadds from './Addadds'
import { Cookies, useCookies } from 'react-cookie'
import { FaPlus } from 'react-icons/fa'
import { AiOutlineFullscreenExit } from 'react-icons/ai'
import { BiGame } from 'react-icons/bi'
import { FaPaw, FaAffiliatetheme } from 'react-icons/fa'
import { RiFileUnknowFill } from 'react-icons/ri'
import { GiTrophy } from 'react-icons/gi'
import { FaGamepad, FaUserSecret } from 'react-icons/fa'
import { AiFillDashboard, AiOutlineUser } from 'react-icons/ai'
import { BsBookmarkFill, BsLayersFill } from 'react-icons/bs'
import { MdStoreMallDirectory } from 'react-icons/md'
import { ImProfile } from 'react-icons/im'
import man from '../img/man.png'
import woman from '../img/woman.png'
import Swal from 'sweetalert2'
import CityModal from '../pages/CityModal'

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const { handleShow, AddShow, cityModalShow, cityModal } = useFilterContext()
  const handleRemoveCookie = () => {
    removeCookie('user')
  }
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const showmodal = () => {
    Swal.fire({
      text: 'ابتدا باید ثبت نام کنید',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#d33',
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
          <Dropdown
            className='dropdownMobile  text-center'
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle caret>
              <BiGame
                size={15}
                style={{ color: '#ff9800', marginLeft: '5px' }}
              />
              سرگرمی
            </DropdownToggle>

            <DropdownMenu className='dropdownMobile-box dropdownMobile-box-left'>
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

          <button
            className='addBtnMobile1  rounded-pill mt-2'
            onClick={showmodal}
          >
            <FaPlus style={{ marginLeft: '5px' }} />
            انتشار آگهی
          </button>
          <button
            className='loginBtnMobile mt-2  rounded-pill'
            onClick={handleShow}
          >
            <FiLogIn />
            ورود
          </button>
          <ModalLogin />
        </>
      ) : (
        <>
          <Dropdown
            className='dropdownMobile mb-2'
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle caret>
              <AiOutlineUser style={{ color: '#ff9800' }} />
              {cookies['user'].first_name} {cookies['user'].last_name}
            </DropdownToggle>

            <DropdownMenu className='dropdownMobile-box dropdownMobile-box-left'>
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

              <LinkContainer to='/Foroshgah'>
                <DropdownItem className='d-flex'>
                  <MdStoreMallDirectory />
                  <h6 style={{ marginRight: '30px' }}>محصولات مشارکتی</h6>
                </DropdownItem>
              </LinkContainer>
            </DropdownMenu>
          </Dropdown>

          <button className='addBtnMobile mt-2 rounded-pill' onClick={AddShow}>
            <FaPlus />
            انتشار آگهی
          </button>
          <Addadds />
          <button
            className='logoutBtnMobile  rounded-pill mt-2'
            onClick={handleRemoveCookie}
          >
            <AiOutlineFullscreenExit />
            خروج
          </button>
        </>
      )}

      <button
        className='cityBtnMobile  rounded-pill mt-2'
        onClick={cityModalShow}
      >
        <FiLogIn />
        {cookies['cityname'] ? cookies['cityname'] : 'شهر'}
      </button>
      {cityModal ? <CityModal /> : null}
    </>
  )
}

export default Login
