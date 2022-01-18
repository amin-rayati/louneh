import { React, useEffect, useCallback, useState } from 'react'
import Header from '../components/Header_bg'
import { useLocation } from 'react-router-dom'
import picture from '../img/picture.png'
import { AiFillCalendar, AiOutlinePhone } from 'react-icons/ai'
import { FiShare2, FiBookmark } from 'react-icons/fi'
import { useFilterContext } from '../context/FilterProvider'
import Loading from '../pages/Loading'
import Single from '../components/Single'
import { Cookies, useCookies } from 'react-cookie'
import axios from 'axios'
const url =
  'https://new.louneh.louneh.com/admin/Ads/API/_getSingleAd?token:test'

const Singleproduct = () => {
  const [singleAd, setSingleAd] = useState()
  const { pathname } = useLocation()
  const adId = pathname.split('/')[4]

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const getSingleProduct = () => {
    if (cookies['user']) {
      axios
        .post(
          url,
          {
            individualId: cookies['user'].individual_id,
            adId: adId,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setSingleAd(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      axios
        .post(
          url,
          {
            adId: adId,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setSingleAd(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  useEffect(() => {
    getSingleProduct()
  }, [url])

  if (singleAd === null) {
    return <Loading />
  } else {
    return (
      <>
        <Header />
        {singleAd && <Single singleAd={singleAd} setSingleAd={setSingleAd} />}
      </>
    )
  }
}

export default Singleproduct
