import { React, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { Cookies, useCookies } from 'react-cookie'

import { useFilterContext } from '../context/FilterProvider'
import Swal from 'sweetalert2'

const PetgramFooter = ({ id, caption, like, isLike }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [islike, setislike] = useState(cookies['user'] ? isLike : false)
  const [likeLength, setlikeLength] = useState(like)

  let individualId = cookies['user'] ? cookies['user'].individual_id : 0

  const likePost = async (id) => {
    if (cookies['user']) {
      try {
        const rawResponse = await fetch(
          'https://new.louneh.louneh.com/admin/RaceLikes/API/_like',
          {
            method: 'POST',
            headers: {
              token: 'test',
            },
            body: JSON.stringify({
              raceId: id,
              individualId: individualId,
            }),
          }
        )
        const content = await rawResponse.json()

        if (content.data === 'لایک شد') {
          setlikeLength(likeLength + 1)
          setislike(true)
        } else {
          setlikeLength(likeLength - 1)
          setislike(false)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'error',
        text: 'اول باید وارد سایت شوید کنید',
      })
    }
  }
  return (
    <>
      <h5
        className='title-font lineBreak  '
        style={{ textAlign: 'initial', width: '60%' }}
      >
        {caption}
      </h5>
      <div>
        <span style={{ marginLeft: '10px' }}> لایک : {likeLength}</span>
        {islike ? (
          <BsFillHeartFill
            className='title-font'
            size={20}
            onClick={() => likePost(id)}
            style={{
              color: '#D7443e',
              marginLeft: '10px',
              cursor: 'pointer',
            }}
          />
        ) : (
          <AiOutlineHeart
            className='title-font'
            size={20}
            onClick={() => likePost(id)}
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
            }}
          />
        )}
      </div>
    </>
  )
}

export default PetgramFooter
