import { React, useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ImCross } from 'react-icons/im'
import { useFilterContext } from '../context/FilterProvider'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Cookies, useCookies } from 'react-cookie'
import Loading from '../pages/LoadingModal'
import { useLocation } from 'react-router-dom'
import { StepButton } from '@material-ui/core'

const url = 'https://new.louneh.louneh.com/admin/Races/API/_addPost'

const ModalCompetition = () => {
  const { pathname } = useLocation()
  const matchID = pathname.split('/')[3]
  const { JoinCompModal, JoinCompModalClose, Btn, setBtn } = useFilterContext()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [profileImg, setProfileImg] = useState([])
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)

  let individualId = cookies['user'] ? cookies['user'].individual_id : 0
  const { compPost, setCompPost } = useFilterContext()
  const getCompPost = async () => {
    setLoading(true)
    try {
      const rawResponse = await fetch(
        'https://new.louneh.louneh.com/admin/Races/API/_getAllPosts',
        {
          method: 'POST',
          body: JSON.stringify({
            individualId: individualId,
            page: 1,
            matchId: matchID,
          }),
          headers: {
            token: 'test',
          },
        }
      )
      const content = await rawResponse.json()
      setCompPost(content.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCaptionChange = (e) => {
    setCaption(e.target.value)
  }
  const onDrop = async (acceptedFiles) => {
    if (profileImg.length < 1) {
      profileImg.push(...acceptedFiles)
      setProfileImg(profileImg)
    } else {
      profileImg.length = 0
      profileImg.push(acceptedFiles.pop())
      setProfileImg(profileImg)
    }
  }

  const upload = () => {
    setLoading(true)

    var formData = new FormData()
    formData.append('file', profileImg[0])
    formData.append('individualId', cookies['user'].individual_id)
    formData.append('matchId', matchID)

    axios
      .post(url, formData, {
        headers: {
          token: 'test',
          'Content-type': 'multipart/form-data',
        },
      })

      .then((response) => {
        setBtn(true)
        getCompPost()
        setLoading(false)
        JoinCompModalClose()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Modal show={JoinCompModal} onHide={JoinCompModalClose}>
      <Modal.Header>
        <Modal.Title>افزودن پست</Modal.Title>
        <ImCross
          style={{ fontSize: '10px', color: '#a0a8af' }}
          onClick={JoinCompModalClose}
        />
      </Modal.Header>
      <Modal.Body>
        <Dropzone onDrop={onDrop} accept='image/*,audio/*,video/*'>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                height: '11em',
                width: '100%',
                background: '#ffffff',
                borderRadius: '0.45rem',
                border: '2px solid rgb(194 194 194)',
              }}
              className='mt-2 text-center container'
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className='mt-2'>پست خود را اپلود کنید</p>
                <br />
                <div className='d-flex flex-wrap justify-content-center'>
                  {profileImg.map((e) => {
                    return (
                      <div className='d-flex mx-2'>
                        <img
                          style={{
                            width: '75px',
                            height: '75px',
                            borderRadius: '50%',
                          }}
                          alt='img'
                          src={URL.createObjectURL(e)}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </Dropzone>
        <div className='mt-1' style={{ textAlign: 'initial' }}></div>
        <div className='row mx-0 mt-2'>
          <textarea
            required
            onChange={handleCaptionChange}
            value={caption}
            className='p-3 select'
            placeholder='متن  را وارد کنید'
            pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
            type='text'
            title='Ten digits code'
            style={{
              borderRadius: '0.45rem',
              border: '1px solid #0000004f',
              height: '100px',
              width: '100%',
              outline: 'none',
              background: '#ffffff',
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <button className='mainBtn1' onClick={upload}>
          {loading ? <Loading /> : 'افزودن'}
        </button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalCompetition
