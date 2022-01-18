import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingModal = () => {
  return (
    <div className='text-center'>
      <Spinner
        animation='border'
        role='status'
        style={{ marginTop: '10px', marginLeft: '30px', marginRight: '30px' }}
      >
        <span className='visually-hidden'></span>
      </Spinner>
    </div>
  )
}

export default LoadingModal
