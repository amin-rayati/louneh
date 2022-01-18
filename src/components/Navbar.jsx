import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Logo from '../assets/logo.png'
import { LinkContainer } from 'react-router-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import Login from './Login'
import LoginMobile from './LoginMob'
import { FaPhoneAlt } from 'react-icons/fa'
import { GoLaw } from 'react-icons/go'
import { MdStoreMallDirectory } from 'react-icons/md'
const BootstrapNavbar = () => {
  return (
    <Navbar expand='xxl' className='fixed-top bg-white shadow-lg '>
      <LinkContainer to='/' className='logo-container'>
        <Nav.Link eventKey={2}>
          <img src={Logo} alt='logo' className='nav-logo' />
        </Nav.Link>
      </LinkContainer>
      <Login />
      <Navbar.Toggle aria-controls='basic-navbar-nav' className='nav-toggle' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className=' text-center'>
          <LinkContainer to='/' className='nav-m'>
            <Nav.Link eventKey={2} className='d-flex nav-items'>
              <AiFillHome className='color-text mx-2 h5' />
              <p className='text-dark '>خانه</p>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/Foroshgah' className='nav-m'>
            <Nav.Link eventKey={2} className='d-flex nav-items'>
              <MdStoreMallDirectory className='color-text mx-2 h5' />
              <p className='text-dark  margin-left'>محصولات مشارکتی</p>
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to='/Rules'>
            <Nav.Link eventKey={2} className='d-flex nav-items'>
              <GoLaw className='color-text mx-2 h5' />
              <p className='text-dark  margin-left'>قوانین و مقررات</p>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/contact'>
            <Nav.Link eventKey={2} className='d-flex nav-items'>
              <FaPhoneAlt className='color-text mx-2 h5' />
              <p className='text-dark  margin-left'>تماس با ما</p>
            </Nav.Link>
          </LinkContainer>

          <LoginMobile />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default BootstrapNavbar
