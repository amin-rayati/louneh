import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { LinkContainer } from 'react-router-bootstrap'

import { ImCross } from 'react-icons/im'
import AddAdsSlider from './AddAdsSlider'

const Addadds = () => {
  const { Addmodal, AddClose, mainCat } = useFilterContext()
  return (
    <>
      <Modal show={Addmodal} onHide={AddClose} size='lg'>
        <Modal.Header>
          <Modal.Title>
            <h4
              className='mt-2'
              style={{ fontSize: '22px', color: '#3c4559', fontWeight: '700' }}
            >
              {' '}
              انتخاب دسته آگهی
            </h4>
          </Modal.Title>
          <ImCross
            onClick={AddClose}
            style={{ fontSize: '10px', color: '#a0a8af' }}
          />
        </Modal.Header>
        <Modal.Body>
          <AddAdsSlider />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Addadds
