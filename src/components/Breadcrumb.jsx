import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LinkContainer } from 'react-router-bootstrap'
import { IoIosArrowBack } from 'react-icons/io'

export default function App({ title }) {
  return (
    <div
      style={{
        width: 'auto',
        padding: '20px 0px 20px 10px',
        marginRight: '0px',
      }}
    >
      <Breadcrumb className='bread'>
        <LinkContainer to='/' style={{ cursor: 'pointer' }}>
          <p href='#' className='mx-2'>
            خانه
          </p>
        </LinkContainer>
        <IoIosArrowBack className='mt-1 h5' />
        <p className='text-light mx-2'>{title}</p>
      </Breadcrumb>
    </div>
  )
}
