import { react, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import { Cookies, useCookies } from 'react-cookie'

const CityModal = ({ cityInfo }) => {
  const [cookiesStateid, setCookieStateid, removeCookieStateid] = useCookies([
    'stateid',
  ])
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [cookiesCityname, setCookieCityname, removeCookieCityname] = useCookies(
    ['cityname']
  )

  const {
    cityModal,
    cityModalClose,
    cityModalShow,
    stateId,
    setStateId,
    cityId,
    setCityId,
    cityIdChange,
    setCityIdChange,
  } = useFilterContext()

  const [states, setStates] = useState('')
  const [city, setCity] = useState('')

  const getAllStates = async () => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/States/API/_apiStates',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: {
            token: 'test',
          },
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setStates(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const stateIdset = (id) => {
    setCookieStateid('stateid', id, {
      path: '/',
    })
  }
  const cityIdset = (id) => {
    setCookieCityid('cityid', id, {
      path: '/',
    })
    setCityIdChange(id)
  }
  const cityNameset = (name) => {
    setCookieCityname('cityname', name, {
      path: '/',
    })

    cityModalClose()
    window.location.reload(true)
  }
  const getAllcities = async (id) => {
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Cities/API/_apiCities',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            state_id: id,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setCity(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllStates()
    getAllcities(cookiesStateid['stateid'])
  }, [])

  return (
    <Modal
      show={cityModal}
      size='lg'
      style={{ height: '80%', overFelow: 'scroll' }}
      backdrop='static'
    >
      <Modal.Header style={{ justifyContent: 'center' }}>
        <Modal.Title
          style={{ color: '#ff8334', marginTop: '10px', textAlign: 'center' }}
        >
          منطقه خود را انتخاب کنید
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row' style={{ justifyContent: 'end' }}>
          <div
            className='col-lg-4 col-md-4 col-sm-4 col-7 d-flex flex-column'
            style={{ borderLeft: '3px solid #ff873b' }}
          >
            {states &&
              states.map((e) => {
                return (
                  <span
                    onClick={() => {
                      stateIdset(e.stateId)
                      getAllcities(e.stateId)
                    }}
                    className={
                      e.stateId == cookiesStateid['stateid']
                        ? 'choosen-state'
                        : 'state'
                    }
                  >
                    {e.stateName}
                  </span>
                )
              })}
          </div>
          <div
            className='col-lg-8 col-md-8 col-sm-8 col-5   row'
            style={{ justifyContent: 'end', height: '100%' }}
          >
            {city.length > 0 ? (
              city.map((e) => {
                return (
                  <div
                    onClick={() => {
                      cityIdset(e.id)
                    }}
                    className='col-lg-4 col-md-6 col-sm-6 col-12 pl-0'
                  >
                    <p
                      onClick={() => {
                        cityNameset(e.name)
                      }}
                      className={
                        e.id == cookiesCityid['cityid']
                          ? 'choosen-city'
                          : 'city'
                      }
                    >
                      {e.name}
                    </p>
                  </div>
                )
              })
            ) : (
              <div>شهری برای استان شما وجود ندارد</div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CityModal
