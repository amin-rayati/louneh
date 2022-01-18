import { React, useState, useCallback, useEffect } from 'react'
import Collapsible from 'react-collapsible'
import { useLocation } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Loading from '../pages/Loading'
import { useFilterContext } from '../context/FilterProvider'
import { IoIosArrowBack } from 'react-icons/io'
const Filter = () => {
  const { pathname } = useLocation()
  const catName = pathname.split('/')[2]
  const catId = pathname.split('/')[3]
  const [subCats, setSubCats] = useState(null)
  const [loading, setLoading] = useState(false)
  const { lastCatId, setLastCatId } = useFilterContext()
  const [cart, setCart] = useState([])
  const [isCatList, setIsCatList] = useState(false)

  const getSubCats = async () => {
    setLoading(true)
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Categories/API/_filterByCats',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            catId: catId,
            page: 1,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setLoading(false)
        setSubCats(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getSubCats1 = async (id) => {
    setLoading(true)
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Categories/API/_filterByCats',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            catId: id,
            page: 1,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setLoading(false)
        setSubCats(content.data)
      } else {
        setLoading(false)
        setLastCatId(id)
        setIsCatList(true)
      }
    } catch (error) {}
  }
  const getSubCats2 = async (id) => {
    setLoading(true)

    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Categories/API/_filterByCats',
        {
          method: 'POST',
          headers: {
            token: 'test',
          },
          body: JSON.stringify({
            catId: id[0],
            page: 1,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setLoading(false)
        setSubCats(content.data)
      } else {
        setLoading(false)
        setLastCatId(id)
        setIsCatList(true)
      }
    } catch (error) {}
  }
  const saveCat = (item) => {
    let tmpCart = cart
    tmpCart.push(item.category_name + item.category_id)
    if (isCatList) {
      tmpCart.splice(tmpCart.length - 2, 1, item.category_name)
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
  }, [])

  return (
    <div>
      <div>
        <div className='filter-box '>
          <div className='d-flex'>
            <p
              onClick={() => {
                getSubCats1(catId)
                setLastCatId('')
                setCart([])
                setIsCatList(false)
              }}
              className='mx-1'
              style={{ color: '#ff9800', fontSize: '10px', cursor: 'pointer' }}
            >
              {catName}
            </p>

            {cart[0] ? <IoIosArrowBack /> : null}
            <p
              onClick={() => {
                getSubCats2(cart[0].match(/\d+/g))
                changeCart(cart[0])
              }}
              className='mx-1'
              style={{ color: '#ff9800', fontSize: '10px', cursor: 'pointer' }}
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
              style={{ color: '#ff9800', fontSize: '10px', cursor: 'pointer' }}
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
              style={{ color: '#ff9800', fontSize: '10px', cursor: 'pointer' }}
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
              style={{ color: '#ff9800', fontSize: '10px', cursor: 'pointer' }}
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
              style={{ color: '#ff9800', fontSize: '10px', cursor: 'pointer' }}
            >
              {cart[4] ? cart[4].replace(/[0-9]/g, '') : null}
            </p>
          </div>

          <div className='mt-3 filter-custom' style={{ marginRight: '20px' }}>
            {loading ? (
              <Loading />
            ) : (
              <div className='d-flex flex-column' style={{ cursor: 'pointer' }}>
                {subCats &&
                  subCats.map((e) => {
                    return (
                      <>
                        <div key={e.category_id}>
                          <hr className='my-2' style={{ color: '#928282' }} />
                          <div
                            onClick={() => {
                              getSubCats1(e.category_id)
                              saveCat(e)
                            }}
                            className='my-2 '
                            key={e.category_id}
                            style={{ marginRight: '20px' }}
                          >
                            <Collapsible
                              className={
                                lastCatId == e.category_id
                                  ? 'font selectFilter'
                                  : 'font'
                              }
                              trigger={e.category_name}
                            ></Collapsible>
                          </div>
                        </div>
                      </>
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className='mt-5'>
        <div className='filter-box '>
          <h3 style={{ color: '#ff9800' }}>بازه قیمت</h3>
          <hr className='my-3' style={{ color: '#928282' }} />
          <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
        </div>
      </div> */}
    </div>
  )
}

export default Filter
