import { React, useEffect, useCallback, useState } from 'react'
import Header from '../components/Header_bg'
import { useLocation } from 'react-router-dom'
import picture from '../img/picture.png'
import { AiFillCalendar, AiOutlinePhone } from 'react-icons/ai'
import { FiShare2, FiBookmark } from 'react-icons/fi'
import { useFilterContext } from '../context/FilterProvider'
import Loading from '../pages/Loading'
import SingleAffiliateProductComp from '../pages/SingleAffiliateProductComp'
import { Cookies, useCookies } from 'react-cookie'
import axios from 'axios'
const url = 'https://new.louneh.louneh.com/admin/ShopAds/API/_singleAffiliateAd'

const SingleAffiliateProduct = () => {
  const { singleAffiliate, setSingleAffiliate } = useFilterContext()
  const { pathname } = useLocation()
  const adId = pathname.split('/')[2]

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const getSingleAffiliateProduct = () => {
    if (cookies['user']) {
      axios
        .post(
          url,
          {
            individualId: cookies['user'].individual_id,
            shopAdId: adId,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setSingleAffiliate(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      axios
        .post(
          url,
          {
            shopAdId: adId,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setSingleAffiliate(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  useEffect(() => {
    getSingleAffiliateProduct()
  }, [url])

  if (singleAffiliate === null) {
    return <Loading />
  } else {
    return (
      <>
        <Header />
        {singleAffiliate && (
          <SingleAffiliateProductComp singleAffiliate={singleAffiliate} />
        )}
      </>
    )
  }
}

export default SingleAffiliateProduct
