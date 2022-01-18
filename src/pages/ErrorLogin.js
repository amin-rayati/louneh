import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useFilterContext } from '../context/FilterProvider'

const ErrorLogin = () => {
  const {
    show,
    handleClose,
    RegisterShow,
    RegisterClose,
    registerModal,
    handleShow,
  } = useFilterContext()
  return (
    <div
      className='container mx-auto '
      style={{
        marginTop: '110px',
        marginBottom: '520px',
      }}
    >
      <div
        className='row'
        style={{ justifyContent: 'center', textAlign: 'center' }}
      >
        <div
          style={{
            border: '1px solid #cfc7c7',
            borderRadius: '15px',

            padding: '50px',
            boxShadow: '0 0 17px 5px rgb(223 222 222 / 50%)',
            cursor: 'pointer',
          }}
          className='col-lg-6 col-md-12 col-sm-12  col-10 mx-5'
        >
          <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>
            برای دسترسی به این قسمت ابتدا باید وارد سایت شوید
          </p>

          <button
            onClick={() => {
              handleShow()
            }}
            style={{
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              color: 'white',
              backgroundColor: '#ff9800',
            }}
          >
            ورود وثبت نام
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorLogin
