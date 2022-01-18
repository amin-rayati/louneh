import { React, useEffect, useCallback, useState } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import cat from '../img/cat.jpg'
import { GoPlus } from 'react-icons/go'
import { HiUserCircle } from 'react-icons/hi'
import Fade from 'react-reveal/Fade'
import { useLocation } from 'react-router-dom'

import { Button, Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import ModalCompetition from '../pages/ModalCompetition'
import { Cookies, useCookies } from 'react-cookie'
import SingleCompFooter from './SingleCompFooter'
import { ReactVideo } from 'reactjs-media'
import Loading from '../pages/Loading'
import Loading1 from './PaginationLoading'
import Swal from 'sweetalert2'

const SingleCompetition = () => {
  const { pathname } = useLocation()
  const matchID = pathname.split('/')[3]
  const { JoinCompModalOpen, compPost, setCompPost, Btn, setBtn } =
    useFilterContext()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [loading, setLoading] = useState(false)
  const [btnActive, setBtnActive] = useState(false)
  const [i, setI] = useState(0)

  const [individualId, setIndividualId] = useState(
    cookies['user'] ? cookies['user'].individual_id : 0
  )

  const getCompPost = async () => {
    setLoading(true)
    if (cookies['user']) {
      try {
        const rawResponse = await fetch(
          'https://new.louneh.louneh.com/admin/Races/API/_getAllPosts',
          {
            method: 'POST',
            body: JSON.stringify({
              individualId: individualId,
              page: i + 1,
              matchId: matchID,
            }),
            headers: {
              token: 'test',
            },
          }
        )
        const content = await rawResponse.json()

        setCompPost([...compPost, ...content.data.list])
        if (content.data.hasNext) {
          setBtnActive(false)
          setI(i + 1)
          setLoading(false)
        } else {
          setBtnActive(true)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const rawResponse = await fetch(
          'https://new.louneh.louneh.com/admin/Races/API/_getAllPosts',
          {
            method: 'POST',
            body: JSON.stringify({
              page: i + 1,
              matchId: matchID,
            }),
            headers: {
              token: 'test',
            },
          }
        )
        const content = await rawResponse.json()

        setCompPost([...compPost, ...content.data.list])
        if (content.data.hasNext) {
          setBtnActive(false)
          setI(i + 1)
          setLoading(false)
        } else {
          setBtnActive(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const addPetPost = () => {
    if (cookies['user']) {
      JoinCompModalOpen()
    } else {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'اول باید وارد سایت شوید کنید',
      })
    }
  }

  useEffect(() => {
    getCompPost()
  }, [])

  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className=' text-center mt-5' style={{ fontSize: '33px' }}>
          شرکت در مسابقه
        </h4>

        {!Btn ? (
          <div className='text-center'>
            <button className=' addpet mt-5 rounded-pill' onClick={addPetPost}>
              <GoPlus
                size={15}
                style={{ marginLeft: '5px', marginTop: '2px' }}
              />
              افزودن پست
            </button>
          </div>
        ) : null}

        <ModalCompetition />

        <div className='mt-5 row text-center mx-5 justify-content-center'>
          {compPost &&
            compPost.map((e) => {
              return (
                <Fade right>
                  <div
                    style={{ height: '500px' }}
                    className='col-lg-3 col-md-10 col-sm-12 col-12 mt-1'
                  >
                    <div
                      className=' text-center d-flex  image-size'
                      style={{
                        width: '100%',
                        margin: 'auto',
                        padding: '10px',
                        textAlign: 'left',
                        borderTopLeftRadius: '25px',
                        borderTopRightRadius: '25px',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px',
                        boxShadow: '0px 2px 26px 23px rgb(173 168 168 / 43%)',
                      }}
                    >
                      <HiUserCircle
                        size={20}
                        style={{ color: '#ff9800', marginLeft: '10px' }}
                      />
                      <h5 className='title-font'>{e.individualName}</h5>
                    </div>

                    <img
                      src={e.file}
                      className='image-size petgram-img'
                      alt='cat'
                    />

                    <div
                      className='d-flex justify-content-between image-size'
                      style={{
                        width: '100%',
                        margin: 'auto',
                        padding: '15px',
                        textAlign: 'left',
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                        borderBottomLeftRadius: '25px',
                        borderBottomRightRadius: '25px',
                        boxShadow: '0px 2px 26px 23px rgb(173 168 168 / 43%)',
                      }}
                    >
                      <SingleCompFooter
                        id={e.id}
                        caption={'amin'}
                        like={e.like}
                        isLike={e.individualLike}
                      />
                    </div>
                  </div>
                </Fade>
              )
            })}
        </div>
        <LogoFooter />
      </div>
    </>
  )
}

export default SingleCompetition
