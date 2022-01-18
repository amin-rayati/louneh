import { React, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useFilterContext } from '../context/FilterProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Loading from '../pages/LoadingAdd'
import { AiOutlineCheck } from 'react-icons/ai'
import Swal from 'sweetalert2'

const url = 'https://new.louneh.louneh.com/admin/Ads/API/_submitAd'

const ModalType = ({ data, typemodal, typeclose, AddType, video, link }) => {
  const [loading, setLoading] = useState(false)
  const [adTypes, setAdTypes] = useState([])
  const {
    type,
    title,
    money,
    desc,
    brand,
    gender,
    petname,
    imageUrl,
    CatId,
    LastCatId,
    individualId,
    affiliate,
    affiliatePricevalue,
  } = data
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleAdTypeChange = (e) => {
    let newAdTypes = adTypes

    if (newAdTypes.includes(6)) {
      const freeIndex = newAdTypes.indexOf(6)
      if (freeIndex > -1) {
        newAdTypes.splice(freeIndex, 1)
      }
    }

    if (e === 6) {
      newAdTypes = []
    }
    if (e === 2) {
      if (newAdTypes.includes(4)) {
        const index = newAdTypes.indexOf(4)
        newAdTypes.splice(index, 1)
      }
      if (newAdTypes.includes(5)) {
        const index = newAdTypes.indexOf(5)
        newAdTypes.splice(index, 1)
      }
    }
    if (e === 4) {
      if (newAdTypes.includes(2)) {
        const index = newAdTypes.indexOf(2)
        newAdTypes.splice(index, 1)
      }
      if (newAdTypes.includes(5)) {
        const index = newAdTypes.indexOf(5)
        newAdTypes.splice(index, 1)
      }
    }
    if (e === 5) {
      if (newAdTypes.includes(4)) {
        const index = newAdTypes.indexOf(4)
        newAdTypes.splice(index, 1)
      }
      if (newAdTypes.includes(2)) {
        const index = newAdTypes.indexOf(2)
        newAdTypes.splice(index, 1)
      }
    }

    if (!newAdTypes.includes(e)) {
      newAdTypes.push(e)
    } else {
      const index = newAdTypes.indexOf(e)
      if (index > -1) {
        newAdTypes.splice(index, 1)
      }
    }

    setAdTypes((prevState) => {
      return newAdTypes
    })

    setLoading(true)
    setTimeout(() => setLoading(false), 50)
  }

  const FormSubmit = async () => {
    if (adTypes.length < 1) {
      Swal.fire({
        confirmButtonText: 'فهمیدم',
        icon: 'warning',
        title: 'لطفا  نوع آگهی  خود را انتخاب کنید ',
      })
    } else {
      setLoading(true)
      let adtype = [...new Set(adTypes)]
      var formData = new FormData()
      formData.append('title', title)
      formData.append('lastCatId', LastCatId)
      formData.append('catId', CatId)
      formData.append('desc', desc)
      formData.append('adTypeId', JSON.stringify(adtype))
      formData.append('priceTypeId', type)
      formData.append('price', money)
      formData.append('images', JSON.stringify(imageUrl))
      formData.append('gender', gender)
      formData.append('petName', petname)
      formData.append('brand', brand)
      formData.append('individualId', individualId)
      formData.append('affiliate', affiliate)
      formData.append('affiliatePrice', affiliatePricevalue)
      formData.append('video', video)
      formData.append('link', link)
      axios
        .post(url, formData, {
          headers: {
            token: 'test',
            'Content-type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.isDone) {
            if (!response.data.data.url) {
              Swal.fire({
                confirmButtonText: 'فهمیدم',
                icon: 'success',
                text: 'آگهی  شما با موفقیت ثبت شد',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload(true)
                }
              })
            } else {
              window.location.href = `${response.data.data.url}`
            }
          }
          setLoading(false)
          typeclose()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  useEffect(() => {
    setLoading(false)
    if (video) {
      adTypes.push(1)
    }
    if (link.length > 0) {
      adTypes.push(3)
    }
  }, [AddType, video, adTypes, link])

  return (
    <Modal show={typemodal} onHide={typeclose} size='lg'>
      <Modal.Header>
        <Modal.Title>نوع آگهی</Modal.Title>
        <ImCross
          onClick={typeclose}
          style={{ fontSize: '10px', color: '#a0a8af' }}
        />
      </Modal.Header>
      <Modal.Body>
        {AddType &&
          AddType.map((e) => {
            return (
              <div
                onClick={() => handleAdTypeChange(e.adTypeId)}
                className='addtype d-flex justify-content-around mt-3'
              >
                <div
                  style={{
                    backgroundColor: adTypes.includes(e.adTypeId)
                      ? 'orange'
                      : '#bfbfbf6b',
                    width: '2em',
                    borderRadius: '10px',
                    marginBottom: 'auto',
                    marginRight: '1em',
                    marginTop: 'auto',
                    height: '2em',
                    textAlign: 'center',
                  }}
                >
                  {adTypes.includes(e.adTypeId) ? (
                    <AiOutlineCheck
                      style={{
                        marginTop: '7px',
                        marginBottom: 'auto',
                        color: 'white',
                      }}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                <h5 className='addtypetitle'>{e.adTypeName} </h5>
                <h6
                  className='addtypeprice'
                  style={{ fontSize: '16px', fontWeight: '700' }}
                >
                  {nummber(e.price)} تومان
                </h6>
              </div>
            )
          })}

        <div className='text-center mt-3'>
          <button
            className='mainBtn1  '
            style={{ width: '100%' }}
            onClick={FormSubmit}
          >
            {loading ? <Loading /> : 'ثبت آگهی'}
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'></Modal.Footer>
    </Modal>
  )
}

export default ModalType
