import { React, useEffect, useCallback, useState } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'

import { GoPlus } from 'react-icons/go'
import { BsFillHeartFill } from 'react-icons/bs'
import { HiUserCircle } from 'react-icons/hi'
import Fade from 'react-reveal/Fade'
import { Button, Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import ModalPetGram from '../components/ModalPetGram'
import { AiOutlineHeart } from 'react-icons/ai'
import { Cookies, useCookies } from 'react-cookie'
import PetgramFooter from './PetgramFooter'
import { ReactVideo } from 'reactjs-media'
import Loading from '../pages/Loading'
import Loading1 from './PaginationLoading'
import Swal from 'sweetalert2'

const url = 'https://new.louneh.louneh.com/admin/Petgrams/API/_getallposts'

const PetGram = () => {
  const { PetModalShow, btnActivePetGram, setBtnActivePetGram } =
    useFilterContext()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [loading, setLoading] = useState(false)
  const [i, setI] = useState(0)
  const [individualId, setIndividualId] = useState(
    cookies['user'] ? cookies['user'].individual_id : ''
  )

  const [petgram, setPetGram] = useState([])

  const getPetGram = async () => {
    setLoading(true)
    if (cookies['user']) {
      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            individualId: individualId,
            page: i + 1,
          }),
          headers: {
            token: 'test',
          },
        })
        const content = await rawResponse.json()
        setPetGram([...petgram, ...content.data.list])
        if (content.data.hasNext) {
          setBtnActivePetGram(false)
          setI(i + 1)
          setLoading(false)
        } else {
          setBtnActivePetGram(true)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            page: i + 1,
          }),
          headers: {
            token: 'test',
          },
        })
        const content = await rawResponse.json()
        setPetGram([...petgram, ...content.data.list])
        if (content.data.hasNext) {
          setBtnActivePetGram(false)
          setI(i + 1)
          setLoading(false)
        } else {
          setBtnActivePetGram(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const addPetPost = () => {
    if (cookies['user']) {
      PetModalShow()
    } else {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'اول باید وارد سایت شوید کنید',
      })
    }
  }

  useEffect(() => {
    getPetGram()
  }, [])

  if (petgram === '') {
    return false
  } else {
    return (
      <>
        <Header />
        <div style={{ minHeight: '60vh' }}>
          <h4 className=' text-center mt-5' style={{ fontSize: '33px' }}>
            پت گرام
          </h4>

          <div className='text-center'>
            <button className=' addpet mt-5 rounded-pill' onClick={addPetPost}>
              <GoPlus
                size={15}
                style={{ marginLeft: '5px', marginTop: '2px' }}
              />
              افزودن پست
            </button>
          </div>
          <ModalPetGram />

          <div className='mt-5 row text-center mx-2 justify-content-center'>
            {petgram &&
              petgram.map((e) => {
                return (
                  <div
                    key={e.id}
                    style={{ height: '450px' }}
                    className='col-lg-3 col-md-6 col-sm-6 col-12 mt-1'
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
                    {e.isVideo ? (
                      <video
                        className='video-height bg-dark'
                        style={{ width: '100%' }}
                        controls='controls'
                        preload='metadata'
                      >
                        <source src={e.file} type='video/mp4' />
                      </video>
                    ) : null}
                    {!e.isVideo ? (
                      <img
                        src={e.file}
                        className='image-size petgram-img'
                        style={{ width: '100%' }}
                        alt='cat'
                      />
                    ) : null}

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
                      <PetgramFooter
                        id={e.id}
                        caption={e.caption}
                        like={e.like}
                        isLike={e.individualLike}
                      />
                    </div>
                  </div>
                )
              })}
            {!btnActivePetGram ? (
              <div className='mb-5 d-flex justify-content-center'>
                <button
                  className='mainBtn1 '
                  onClick={() => {
                    getPetGram()
                    setLoading(true)
                  }}
                >
                  {loading ? <Loading1 /> : 'بارگذاری بیشتر'}
                </button>
              </div>
            ) : null}
          </div>
          <LogoFooter />
        </div>
      </>
    )
  }
}

export default PetGram
