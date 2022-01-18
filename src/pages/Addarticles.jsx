import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from './Loading'
import Header from '../components/Header_bg'
import Collapsible from 'react-collapsible'
import { useFilterContext } from '../context/FilterProvider'
import Fade from 'react-reveal/Fade'
import { IoIosArrowBack } from 'react-icons/io'
import FormAdd from './FormAdd'
import LogoFooter from '../components/LogoFooter'
const url =
  'https://new.louneh.louneh.com/admin/Categories/API/_apiCategoryApp?token:test'

const Addarticles = () => {
  const { setID, ID, setgender, setbrand, setpetname } = useFilterContext()
  const { pathname } = useLocation()
  const categoryId = pathname.split('/')[3]
  const categoryName = pathname.split('/')[2]

  const [subCats, setSubCats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastcatId, setLastcatID] = useState('')
  const [cart, setCart] = useState([])
  const [isCatList, setIsCatList] = useState(false)

  const getid = (id) => {
    setLastcatID(id)
  }

  const getgender = (gender) => {
    if (gender === true) {
      setgender(true)
    } else {
      setgender(false)
    }
  }

  const getbrand = (brand) => {
    if (brand === true) {
      setbrand(true)
    } else {
      setbrand(false)
    }
  }

  const getpetname = (petname) => {
    if (petname === true) {
      setpetname(true)
    } else {
      setpetname(false)
    }
  }

  const getSubCats = useCallback(async () => {
    try {
      setLoading(true)

      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          categoryId: categoryId,
        }),
      })
      const content = await rawResponse.json()
      if (content.isDone) {
        setSubCats(content.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }, [pathname])

  const getSubCats1 = useCallback(
    async (id) => {
      setLoading(true)

      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            categoryId: id,
          }),
        })
        const content = await rawResponse.json()

        if (content.isDone) {
          setSubCats(content.data)
          setLoading(false)
        }
        if (content.data.length === 0) {
          setIsCatList(true)
        }
      } catch (error) {}
    },
    [categoryId]
  )

  const getSubCats2 = useCallback(
    async (id) => {
      setLoading(true)

      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            categoryId: id[0],
          }),
        })
        const content = await rawResponse.json()

        if (content.isDone) {
          setSubCats(content.data)
          setLoading(false)
        }
        if (content.data.length === 0) {
          setIsCatList(true)
        }
      } catch (error) {}
    },
    [categoryId]
  )

  const saveCat = (item) => {
    let tmpCart = cart
    tmpCart.push(item.name + item.id)
    if (isCatList) {
      tmpCart.splice(tmpCart.length - 2, 1, item.name)
      tmpCart.pop()
    }
    setCart(tmpCart)
  }
  const changeCart = (item) => {
    if (cart.includes(item)) {
      setIsCatList(false)
      const index = cart.indexOf(item)
      cart.splice(index + 1, cart.length - 1)
    }
  }

  useEffect(() => {
    getSubCats()
    setCart([])
  }, [categoryId])

  if (!subCats) {
    return <Loading />
  } else if (subCats.length < 1) {
    return (
      <>
        <FormAdd lastcatId={lastcatId} />
      </>
    )
  } else {
    return (
      <>
        <Header title='افزودن آگهی' />

        <div className='row justify-content-center mt-5 mx-2'>
          <div className='product_details_title  single_card mt-3 col-lg-7'>
            <h5 className='underline1 mx-3'>
              دسته بندی مورد نظر را انتخاب کنید :{' '}
            </h5>
            <div className='d-flex'>
              <p
                onClick={() => {
                  getSubCats1(categoryId)
                  setCart([])
                  setIsCatList(false)
                }}
                className='mx-1'
                style={{
                  color: '#ff9800',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                {categoryName}
              </p>

              {cart[0] ? <IoIosArrowBack /> : null}
              <p
                onClick={() => {
                  getSubCats2(cart[0].match(/\d+/g))
                  changeCart(cart[0])
                }}
                className='mx-1'
                style={{
                  color: '#ff9800',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                {cart[0] ? cart[0].replace(/[0-9]/g, '') : null}
              </p>

              {cart[1] ? <IoIosArrowBack /> : null}
              <p
                onClick={() => {
                  getSubCats2(cart[1].match(/\d+/g))
                  changeCart(cart[1])
                }}
                className='mx-1'
                style={{
                  color: '#ff9800',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                {cart[1] ? cart[1].replace(/[0-9]/g, '') : null}
              </p>

              {cart[2] ? <IoIosArrowBack /> : null}
              <p
                onClick={() => {
                  getSubCats2(cart[2].match(/\d+/g))
                  changeCart(cart[2])
                }}
                className='mx-1'
                style={{
                  color: '#ff9800',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                {cart[2] ? cart[2].replace(/[0-9]/g, '') : null}
              </p>

              {cart[3] ? <IoIosArrowBack /> : null}
              <p
                onClick={() => {
                  getSubCats2(cart[3].match(/\d+/g))
                  changeCart(cart[3])
                }}
                className='mx-1'
                style={{
                  color: '#ff9800',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                {cart[3] ? cart[3].replace(/[0-9]/g, '') : null}
              </p>

              {cart[4] ? <IoIosArrowBack /> : null}
              <p
                onClick={() => {
                  getSubCats2(cart[4].match(/\d+/g))
                  changeCart(cart[4])
                }}
                className='mx-1'
                style={{
                  color: '#ff9800',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                {cart[4] ? cart[4].replace(/[0-9]/g, '') : null}
              </p>
            </div>
            <div
              className=' mt-3'
              style={{ color: '#6d7588', fontSize: '20px' }}
            >
              {loading ? (
                <Loading />
              ) : (
                <div
                  className='d-flex flex-column'
                  style={{ cursor: 'pointer' }}
                >
                  <Fade top>
                    {subCats &&
                      subCats.map((e) => {
                        return (
                          <>
                            <div key={e.id}>
                              <hr
                                className='my-2'
                                style={{ color: '#928282' }}
                              />
                              <div
                                onClick={() => {
                                  saveCat(e)
                                  getSubCats1(e.id)
                                  getid(e.id)
                                  getgender(e.hasGender)
                                  getbrand(e.hasBrand)
                                  getpetname(e.hasPetName)
                                }}
                                className='my-2 '
                                key={e.id}
                                style={{ marginRight: '20px' }}
                              >
                                <Collapsible
                                  className='font'
                                  trigger={e.name}
                                ></Collapsible>
                              </div>
                            </div>
                          </>
                        )
                      })}
                  </Fade>
                </div>
              )}
            </div>
          </div>
        </div>
        <LogoFooter className='mt-2' />
      </>
    )
  }
}

export default Addarticles
