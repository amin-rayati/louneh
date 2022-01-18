import { React, useEffect, useCallback, useState } from 'react'
import { useFilterContext } from '../context/FilterProvider'
import { useLocation } from 'react-router-dom'
import Loading from '../pages/Loading'
import Loading1 from '../pages/PaginationLoading'
import List from './List'
import Grid from './Grid'

const url =
  'https://new.louneh.louneh.com/admin/Categories/API/_apiCategory?token:test'
const ProductList = () => {
  const { pathname } = useLocation()
  const categoryId = pathname.split('/')[3]
  const { gridView, setProduct, product, i, setI, lastCatId, setLastCatId } =
    useFilterContext()

  const [j, setj] = useState(1)
  const [btnMoreLoadActive, setBtnMoreLoadActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    try {
      setLoading(true)
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          lastCatId: lastCatId,
          categoryId: categoryId,
          page: 1,
        }),
      })

      const content = await rawResponse.json()
      console.log(content)
      if (content.isDone) {
        setLoading(false)
        setProduct([...content.data.list])
        if (content.data.hasNext) {
          setBtnMoreLoadActive(true)
        } else {
          setBtnMoreLoadActive(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getMoreProducts = async () => {
    try {
      setLoading(true)
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          lastCatId: lastCatId,
          categoryId: categoryId,
          page: j + 1,
        }),
      })

      const content = await rawResponse.json()

      if (content.isDone) {
        setLoading(false)
        let productData = [...product, ...content.data.list]
        setProduct(productData)
        if (content.data.hasNext) {
          setj(j + 1)
          setBtnMoreLoadActive(true)
        } else {
          setBtnMoreLoadActive(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
    setLastCatId('')
  }, [categoryId, pathname])

  useEffect(() => {
    getProducts()
  }, [pathname, lastCatId])

  if (product === null) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <>
        <div>
          {!gridView ? (
            <div>
              <List product={product} />
            </div>
          ) : (
            <div className='mt-5'>
              <Grid product={product} />
            </div>
          )}
        </div>

        {btnMoreLoadActive ? (
          <button
            className='mainBtn text-center'
            style={{ padding: '0px 50px 0px 50px' }}
            onClick={getMoreProducts}
          >
            {!loading ? 'بارگذاری بیشتر' : <Loading1 />}
          </button>
        ) : null}
      </>
    )
  }
}

export default ProductList
