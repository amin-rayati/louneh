import React from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
const Error = () => {
  return (
    <>
      <Header />
      <div
        className='text-center'
        style={{ marginTop: '12%', marginBottom: '12%' }}
      >
        <h4>این صفحه وجود ندارد</h4>
      </div>
      <LogoFooter className='mt-4' />
    </>
  )
}

export default Error
