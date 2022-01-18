import React from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { AiOutlineFullscreenExit, AiOutlineDashboard } from 'react-icons/ai'
import { FiLayers, FiBookmark } from 'react-icons/fi'
import { LinkContainer } from 'react-router-bootstrap'
const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  function handleRemoveCookie() {
    removeCookie(['user'])
  }
  return (
    <>
      {cookies['user'] ? (
        <div>
          <div>
            <div className='filter-box '>
              <div
                className='mt-3 filter-custom'
                style={{ marginRight: '20px' }}
              >
                <div className='dash-box text-center py-3'>
                  <h6
                    style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#3c4559',
                    }}
                  >
                    {cookies['user'].first_name} {cookies['user'].last_name}
                  </h6>
                  <h6
                    style={{
                      fontSize: '13px',
                      color: '#3c4559',
                      marginTop: '20px',
                    }}
                  >
                    {cookies['user'].mobile}
                  </h6>
                </div>
                <div className='d-flex flex-column mt-5'>
                  <LinkContainer to='/dashboard' style={{ cursor: 'pointer' }}>
                    <div className='d-flex flex-row'>
                      <AiOutlineDashboard
                        size={25}
                        style={{ color: '#3c4559' }}
                      />
                      <h4
                        style={{
                          marginRight: '20px',
                          fontSize: '16px',
                          color: '#3c4559',
                        }}
                        className='profile-hover'
                      >
                        داشبورد
                      </h4>
                    </div>
                  </LinkContainer>

                  <LinkContainer to='/myadds' style={{ cursor: 'pointer' }}>
                    <div
                      className='d-flex flex-row mt-4'
                      style={{ cursor: 'pointer' }}
                    >
                      <FiLayers size={25} style={{ color: '#3c4559' }} />
                      <h4
                        style={{
                          marginRight: '20px',
                          fontSize: '16px',
                          color: '#3c4559',
                        }}
                        className='profile-hover'
                      >
                        آکهی های من
                      </h4>
                    </div>
                  </LinkContainer>
                  <LinkContainer to='/bookmarks' style={{ cursor: 'pointer' }}>
                    <div
                      className='d-flex flex-row mt-4'
                      style={{ cursor: 'pointer' }}
                    >
                      <FiBookmark size={25} style={{ color: '#3c4559' }} />
                      <h4
                        style={{
                          marginRight: '20px',
                          fontSize: '16px',
                          color: '#3c4559',
                        }}
                        className='profile-hover'
                      >
                        نشان شده ها
                      </h4>
                    </div>
                  </LinkContainer>
                  <div
                    className='d-flex flex-row mt-4 '
                    style={{ cursor: 'pointer' }}
                  >
                    <AiOutlineFullscreenExit
                      size={25}
                      style={{ color: '#3c4559' }}
                    />
                    <h4
                      style={{
                        marginRight: '20px',
                        fontSize: '16px',
                        color: '#3c4559',
                        cursor: 'pointer',
                      }}
                      className='profile-hover'
                      onClick={handleRemoveCookie}
                    >
                      خروج
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Profile
