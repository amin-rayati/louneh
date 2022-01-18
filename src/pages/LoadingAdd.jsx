import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingAdd = () => {
  return (
    <div className='text-center'>
      <Spinner animation='border' role='status' style={{ marginTop: '7px' }}>
        <span className='visually-hidden'></span>
      </Spinner>
    </div>
  )
}

export default LoadingAdd
