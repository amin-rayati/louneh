import React from 'react'
import { Spinner } from 'react-bootstrap'

const PaginationLoading = () => {
  return (
    <div className='text-center'>
      <Spinner
        animation='border'
        role='status'
        style={{ marginTop: '18%', marginBottom: '15%' }}
      >
        <span className='visually-hidden'></span>
      </Spinner>
    </div>
  )
}

export default PaginationLoading
