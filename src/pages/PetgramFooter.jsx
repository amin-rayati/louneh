import { React, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { Cookies, useCookies } from 'react-cookie'

import { useFilterContext } from '../context/FilterProvider'
import Swal from 'sweetalert2'

const urllike = 'https://new.louneh.louneh.com/admin/Likes/API/_like'

const PetgramFooter = ({ id, caption, like, isLike }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [islike, setislike] = useState(cookies['user'] ? isLike : false)
  const [likeLength, setlikeLength] = useState(like)

  let individualId = cookies['user'] ? cookies['user'].individual_id : 0

  const likePost = async (id) => {
    if (cookies['user']) {
      try {
        const rawResponse = await fetch(urllike, {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            petgramId: id,
            individualId: individualId,
          }),
        })
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
      <p style={{ textAlign: 'initial', width: '60%', lineBreak: 'anywhere' }}>
        {caption}
      </p>
      <div>
        <span style={{ marginLeft: '10px' }}> لایک : {likeLength}</span>
        {islike ? (
          <BsFillHeartFill
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
