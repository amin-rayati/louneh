import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Filter from '../components/Filter'
import { useFilterContext } from '../context/FilterProvider'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import ProductList from '../components/ProductList'
import BreadCrumbCat from '../components/BreadCrumb/BreadCrumbCat'
const Products = () => {
  const { pathname } = useLocation()
  const catname = pathname.split('/')[2]
  const name = pathname.split('/')[3]

  const catId = []
  catId.push(JSON.parse(name))
  const { gridView, GridView, ListView, setProduct, product, i, setI } =
    useFilterContext()

  return (
    <>
      <div>
        <Header title={name} />
        <div className='my-5 container'>
          <BreadCrumbCat categoryName={catname} catId={name} />
          <div className='row'>
            <div className='col-lg-4 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1'>
              <Filter />
            </div>

            <div className='col-lg-8 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2'>
              <div className='d-flex justify-content-end row'>
                <div
                  className='col-xl-2 col-lg-3 col-md-3 col-sm-3 col-6 mt-2 mx-2 d-flex justify-content-between d-lg-block d-md-none d-sm-none d-none'
                  style={{ backgroundColor: '#ff9800', borderRadius: '10px' }}
                >
                  <FaListUl
                    size={30}
                    className={`${
                      !gridView ? 'active-btn icon-color' : 'icon-color'
                    }`}
                    onClick={ListView}
                  />

                  <BsFillGrid3X3GapFill
                    size={30}
                    className={`${
                      gridView ? 'active-btn icon-color' : 'icon-color'
                    }`}
                    onClick={GridView}
                  />
                </div>
              </div>
              <ProductList />
            </div>
          </div>
        </div>
        <LogoFooter className='mt-4' />
      </div>
    </>
  )
}

export default Products
