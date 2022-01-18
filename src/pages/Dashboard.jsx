import { React, useEffect, useState } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { Cookies, useCookies } from 'react-cookie'
import { AiOutlineFullscreenExit, AiOutlineDashboard } from 'react-icons/ai'
import { FiLayers, FiBookmark } from 'react-icons/fi'
import { LinkContainer } from 'react-router-bootstrap'
import Profile from '../components/Profile'
import axios from 'axios'
import Loading from './Loading'
import { useFilterContext } from '../context/FilterProvider'

const url =
  'https://new.louneh.louneh.com/admin/Contact/API/_getIndividualsTicket'
const Dashboard = () => {
  const {
    btnActiveDashboard,
    setBtnActiveDashboard,
    iDashbord,
    setIDashboard,
  } = useFilterContext()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [messeges, setMesseges] = useState([])

  const date = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('en-US')
  }

  const [loading, setLoading] = useState(false)

  const getMessage = async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          individualId: cookies['user'].individual_id,
          page: iDashbord + 1,
        }),
      })
      const content = await rawResponse.json()
      setMesseges([...messeges, ...content.data.list])

      if (content.data.hasNext) {
        setBtnActiveDashboard(false)
        setIDashboard(iDashbord + 1)
        setLoading(false)
      } else {
        setBtnActiveDashboard(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMessage()
  }, [])

  return (
    <>
      <Header />
      {cookies['user'] ? (
        <>
          <div className='my-5 container'>
            <div className='row'>
              <div className='col-lg-3 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 mt-2'>
                <Profile />
              </div>
              <div className='col-lg-9 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 mt-2'>
                <div className='product_details_title  single_card'>
                  <h5 className='underline mx-3'> داشبورد: </h5>
                  <div className='text-center mt-3'>
                    <LinkContainer
                      to='/myadds'
                      style={{ cursor: 'pointer', marginRight: '30px' }}
                    >
                      <button className='mainBtn1  mt-2'>
                        <FiLayers size={15} style={{ marginLeft: '10px' }} />
                        آکهی های من
                      </button>
                    </LinkContainer>
                    <LinkContainer
                      to='/bookmarks'
                      style={{ cursor: 'pointer', marginRight: '30px' }}
                    >
                      <button className='mainBtn1 mt-2 '>
                        <FiBookmark size={25} style={{ marginLeft: '10px' }} />
                        نشان شده ها
                      </button>
                    </LinkContainer>
                  </div>
                </div>

                <div className='product_details_title  single_card mt-5'>
                  <h5 className='underline mx-3'> پیام های من: </h5>

                  {messeges &&
                    messeges.map((e) => {
                      return (
                        <div
                          className='mt-3'
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #c3adad',
                            borderRadius: '25px',
                            padding: '20px',
                          }}
                        >
                          <div className='d-flex justify-content-between'>
                            <h4 style={{ fontSize: '13px', fontWeight: '200' }}>
                              {cookies['user'].first_name}{' '}
                              {cookies['user'].last_name}
                            </h4>
                            <h4 style={{ color: '#ff9800' }}>{date(e.date)}</h4>
                          </div>
                          <h5
                            className='mt-3'
                            style={{
                              lineHeight: '30px',
                              lineBreak: 'anywhere',
                            }}
                          >
                            {e.message}
                          </h5>
                        </div>
                      )
                    })}
                  {!btnActiveDashboard ? (
                    <div className='my-5 d-flex justify-content-center'>
                      <button
                        className='mainBtn1 '
                        onClick={() => {
                          getMessage()
                          setLoading(true)
                        }}
                      >
                        {loading ? <Loading /> : 'بارگذاری بیشتر'}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <LogoFooter className='mt-4' />
        </>
      ) : null}
    </>
  )
}

export default Dashboard
