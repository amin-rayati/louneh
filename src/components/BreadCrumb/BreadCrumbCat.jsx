import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LinkContainer } from 'react-router-bootstrap'
import { IoIosArrowBack } from 'react-icons/io'

export default function App({ categoryName, catId, petName }) {
  return (
    <div
      style={{
        width: 'auto',
        padding: '20px 0px 20px 10px',
        marginRight: '0px',
      }}
    >
      <Breadcrumb className='bread'>
        <LinkContainer to='/' style={{ cursor: 'pointer', color: 'black' }}>
          <p className='mx-2'>خانه</p>
        </LinkContainer>
        <IoIosArrowBack className='mt-1 h5' style={{ color: 'black' }} />
        <LinkContainer
          to={`/articles/${categoryName}/${catId}`}
          style={{ cursor: 'pointer', color: 'black' }}
        >
          <p className='mx-2'>{categoryName}</p>
        </LinkContainer>
        {petName ? (
          <IoIosArrowBack className='mt-1 h5' style={{ color: 'black' }} />
        ) : null}
        {petName ? (
          <>
            <div style={{ cursor: 'pointer', color: 'black' }}>
              <p className='mx-2'>{petName}</p>
            </div>
          </>
        ) : null}
      </Breadcrumb>
    </div>
  )
}
