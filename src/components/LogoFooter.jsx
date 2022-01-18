import { React, useCallback, useEffect, useState } from 'react'
import google from '../img//google.png'
import apple from '../img/apple.png'
import Logo from '../assets/logo.png'
import { FiPhoneCall } from 'react-icons/fi'
import { GiWorld } from 'react-icons/gi'
import { GoLocation } from 'react-icons/go'
const LogoFooter = () => {
  const [siteInfo, setSiteInfo] = useState('')

  const downloadAndroid = () => {
    const url = 'https://new.neganoon.ir/app/apk/v2/neganoon.apk'
    window.open(url, '_blank')
  }
  const downloadIos = () => {
    const url = 'https://anardoni.com/ios/app/hxZrP2ho6'
    window.open(url, '_blank')
  }

  const getSiteInfo = useCallback(async () => {
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
      if (content.isDone) {
        setSiteInfo(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getSiteInfo()
  }, [])

  return (
    <div
      className=' px-5 pt-5'
      style={{ backgroundColor: '#ECECEC', marginTop: '200px' }}
    >
      <div className='row '>
        <div className='newbox col-lg-4 col-md-12 col-sm-12 col-12 text-center '>
          <h5>درباره ما</h5>
          <p className='mt-3 px-1' style={{ textAlign: 'justify' }}>
            {siteInfo && siteInfo[0]['aboutUs']}
          </p>
        </div>

        <div
          style={{
            borderRight: '1px solid #d4d0d0',
            borderLeft: '1px solid #d4d0d0',
          }}
          className='newbox col-lg-4 col-md-12 col-sm-12 col-12 text-center'
        >
          <img src={Logo} alt='logo' />
          <p className='text-secondary my-4' style={{ textAlign: 'center' }}>
            لونه اولین بازار خرید و فروش آنلاین حیوانات
          </p>
          <div
            className='d-flex  align-items-center'
            style={{ justifyContent: 'flex-end' }}
          ></div>

          <div>
            <img
              className='btn-width'
              src={google}
              alt='google'
              onClick={downloadAndroid}
              style={{ width: '20%', cursor: 'pointer' }}
            />
            <img
              className='btn-width'
              src={apple}
              onClick={downloadIos}
              alt='apple'
              style={{ width: '20%', marginRight: '10px', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div className='newbox col-lg-4 col-md-12 col-sm-12 col-12 text-center justify-content-center'>
          <div
            className='d-flex flex-row'
            style={{ justifyContent: 'space-evenly' }}
          >
            <div
              className='d-flex flex-column w-50'
              style={{ marginTop: '17px', fontSize: '17px', fontWeight: '300' }}
            >
              <p>{siteInfo ? siteInfo[0]['infoMobile'] : null}</p>
            </div>
            <div className='footer-icon '>
              <FiPhoneCall size={30} style={{ color: '#ff9800' }} />
            </div>
          </div>
          <div
            className='d-flex  mt-3  flex-row'
            style={{ justifyContent: 'space-evenly' }}
          >
            <div
              className='d-flex flex-column w-50'
              style={{ marginTop: '17px', fontSize: '17px', fontWeight: '300' }}
            >
              <p>{siteInfo ? siteInfo[0]['infoAddress'] : null}</p>
            </div>
            <div className='footer-icon '>
              <GiWorld size={30} style={{ color: '#ff9800' }} />
            </div>
          </div>
          <div
            className='d-flex  mt-3  flex-row'
            style={{ justifyContent: 'space-evenly' }}
          >
            <div
              className='d-flex flex-column w-50'
              style={{ marginTop: '17px', fontSize: '17px', fontWeight: '300' }}
            >
              <p>{siteInfo ? siteInfo[0]['infoEmail'] : null}</p>
            </div>
            <div className='footer-icon' style={{ marginRight: '20px' }}>
              <GoLocation size={30} style={{ color: '#ff9800' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoFooter
