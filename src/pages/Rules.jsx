import { React, useState, useCallback, useEffect } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { FiSearch } from 'react-icons/fi'
import dog from '../img/dog.jpg'
import Fade from 'react-reveal/Fade'
import { RiEditCircleFill } from 'react-icons/ri'
import { useFilterContext } from '../context/FilterProvider'
import AllMallModal from './AllMallModal'

const Rules = () => {
  const [siteInfo, setSiteInfo] = useState('')

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
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className=' text-center mt-5' style={{ fontSize: '33px' }}>
          قوانین و مقررات
        </h4>
        <div
          className='mt-5 col-lg-7 mx-auto col-md-8 col-sm-8 col-10 '
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '25px',
            padding: '40px',
            boxShadow: '0px 0px 12px 12px rgb(206 206 206/50%)',
          }}
        >
          <p style={{ lineHeight: '40px' }}>
            {siteInfo && siteInfo[0]['rules']}
          </p>

          {/* <div className='row mx-0 mt-4' style={{ textAlign: 'right' }}>
            <div className='col-1 text-center'>
              <input
                required
                type='checkbox'
                id='horns'
                name='horns'
                style={{ textAlign: 'right', marginTop: '3px' }}
              />
            </div>
            <div
              className='col-10 my-auto  text-right'
              style={{ textAlign: 'right' }}
            >
              <label htmlFor='horns'>
                <p style={{ color: 'red' }}> قوانین و مقررات </p>
                <p>را قبول دارم</p>
              </label>
            </div>
          </div> */}
        </div>
        <LogoFooter />
      </div>
    </>
  )
}

export default Rules
