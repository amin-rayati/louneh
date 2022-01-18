import { react, useState, useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Cookies, useCookies } from 'react-cookie'
import CityModal from './CityModal'

const stateurl = 'https://new.louneh.louneh.com/admin/States/API/_apiStates'
const cityurl = 'https://new.louneh.louneh.com/admin/Cities/API/_apiCities'
const StateModal = () => {
  const {
    StateModal,
    StateModalClose,
    cityModalShow,
    stateValue,
    setStateValue,
  } = useFilterContext()

  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const getState = useCallback(async () => {
    try {
      const rawResponse = await fetch(stateurl, {
        method: 'POST',
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()
      setState(content.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getCity = useCallback(async (id) => {
    setStateValue(id)

    axios
      .post(
        cityurl,
        {
          state_id: id,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        setCity(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    getState()
  }, [])

  return (
    <>
      <Modal show={StateModal} onHide={StateModalClose}>
        <Modal.Header>
          <Modal.Title>منطقه خود را انتخاب کنید</Modal.Title>
          <ImCross
            onClick={StateModalClose}
            style={{ fontSize: '10px', color: '#a0a8af' }}
          />
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            {state &&
              state.map((e) => {
                return (
                  <div className='col-lg-3 col-md-4 col-sm-4 col-4 mt-3'>
                    <button
                      className='stateBtn  rounded-pill'
                      onClick={() => {
                        cityModalShow()
                        getCity(e.stateId)
                      }}
                    >
                      {e.stateName}
                    </button>
                  </div>
                )
              })}
            <CityModal cityInfo={city} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default StateModal
