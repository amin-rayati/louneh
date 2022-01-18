import React from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

import user from '../img/user.jpg'
const Affiliate = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className='text-center mt-5' style={{ fontSize: '33px' }}>
          همکاری در فروش
        </h4>
        <div>
          <div className='mt-5 text-center  '>
            <input
              type='search'
              placeholder='جستجو کنید'
              style={{
                width: '35%',
                padding: '10px',
                borderRadius: '20px',
                border: 'none',
                boxShadow: 'inset 8px 8px 29px 2px rgb(107 107 107 / 21%)',
              }}
              className='search-input'
            />
          </div>
        </div>
        <div className='row mt-5 mx-1 text-center justify-content-center'>
          <div className='col-lg-5 col-md-12 col-sm-12 col-12 mt-5 '>
            <div className='d-flex'>
              <img
                src={user}
                style={{
                  width: '35%',

                  position: 'relative',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                  boxShadow: 'rgb(160 151 151) 1px 2px 27px 9px',
                }}
                alt='user'
              />
              <div
                style={{
                  backgroundColor: '#fff',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '40px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',

                  padding: '20px',
                }}
              >
                <div className='d-flex justify-content-between '>
                  <div>
                    <h5
                      className='mb-2 mt-2 fontsize-pet-title '
                      style={{ fontSize: '14px', textAlign: 'initial' }}
                    >
                      امین رعیتی
                    </h5>
                    <hr
                      style={{
                        boxShadow: '0px 1px 14px 6px rgb(195 173 173 / 83%)',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div>
                    <div className='count-sale'>
                      <h5
                        className='m-0 fontsize-pet-title '
                        style={{ fontSize: '12px' }}
                      >
                        تعداد فروش : 170{' '}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-between '>
                  <div className=''>
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                  </div>
                </div>
                <h4
                  className='mt-3 fontsize-pet-title '
                  style={{ fontSize: '13px', textAlign: 'justify' }}
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </h4>
              </div>
            </div>
            <div
              className='justify-content-center'
              style={{
                textAlign: '-webkit-left',
                position: 'relative',
                top: '-46px',
              }}
            >
              <div className='visit-btn ' style={{ paddingLeft: '27px' }}>
                مشاهده
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-md-12 col-sm-12 col-12 mt-5 '>
            <div className='d-flex'>
              <img
                src={user}
                style={{
                  width: '35%',

                  position: 'relative',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                  boxShadow: 'rgb(160 151 151) 1px 2px 27px 9px',
                }}
                alt='user'
              />
              <div
                style={{
                  backgroundColor: '#fff',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '40px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',

                  padding: '20px',
                }}
              >
                <div className='d-flex justify-content-between '>
                  <div>
                    <h5
                      className='mb-2 mt-2 fontsize-pet-title '
                      style={{ fontSize: '14px', textAlign: 'initial' }}
                    >
                      امین رعیتی
                    </h5>
                    <hr
                      style={{
                        boxShadow: '0px 1px 14px 6px rgb(195 173 173 / 83%)',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div>
                    <div className='count-sale'>
                      <h5
                        className='m-0 fontsize-pet-title '
                        style={{ fontSize: '12px' }}
                      >
                        تعداد فروش : 170{' '}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-between '>
                  <div className=''>
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                  </div>
                </div>
                <h4
                  className='mt-3 fontsize-pet-title '
                  style={{ fontSize: '13px', textAlign: 'justify' }}
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </h4>
              </div>
            </div>
            <div
              className='justify-content-center'
              style={{
                textAlign: '-webkit-left',
                position: 'relative',
                top: '-46px',
              }}
            >
              <div className='visit-btn ' style={{ paddingLeft: '27px' }}>
                مشاهده
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-md-12 col-sm-12 col-12 mt-5 '>
            <div className='d-flex'>
              <img
                src={user}
                style={{
                  width: '35%',

                  position: 'relative',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                  boxShadow: 'rgb(160 151 151) 1px 2px 27px 9px',
                }}
                alt='user'
              />
              <div
                style={{
                  backgroundColor: '#fff',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '40px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',

                  padding: '20px',
                }}
              >
                <div className='d-flex justify-content-between '>
                  <div>
                    <h5
                      className='mb-2 mt-2 fontsize-pet-title '
                      style={{ fontSize: '14px', textAlign: 'initial' }}
                    >
                      امین رعیتی
                    </h5>
                    <hr
                      style={{
                        boxShadow: '0px 1px 14px 6px rgb(195 173 173 / 83%)',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div>
                    <div className='count-sale'>
                      <h5
                        className='m-0 fontsize-pet-title '
                        style={{ fontSize: '12px' }}
                      >
                        تعداد فروش : 170{' '}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-between '>
                  <div className=''>
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                  </div>
                </div>
                <h4
                  className='mt-3 fontsize-pet-title '
                  style={{ fontSize: '13px', textAlign: 'justify' }}
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </h4>
              </div>
            </div>
            <div
              className='justify-content-center'
              style={{
                textAlign: '-webkit-left',
                position: 'relative',
                top: '-46px',
              }}
            >
              <div className='visit-btn ' style={{ paddingLeft: '27px' }}>
                مشاهده
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-md-12 col-sm-12 col-12 mt-5 '>
            <div className='d-flex'>
              <img
                src={user}
                style={{
                  width: '35%',

                  position: 'relative',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                  boxShadow: 'rgb(160 151 151) 1px 2px 27px 9px',
                }}
                alt='user'
              />
              <div
                style={{
                  backgroundColor: '#fff',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '40px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',

                  padding: '20px',
                }}
              >
                <div className='d-flex justify-content-between '>
                  <div>
                    <h5
                      className='mb-2 mt-2 fontsize-pet-title '
                      style={{ fontSize: '14px', textAlign: 'initial' }}
                    >
                      امین رعیتی
                    </h5>
                    <hr
                      style={{
                        boxShadow: '0px 1px 14px 6px rgb(195 173 173 / 83%)',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div>
                    <div className='count-sale'>
                      <h5
                        className='m-0 fontsize-pet-title '
                        style={{ fontSize: '12px' }}
                      >
                        تعداد فروش : 170{' '}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-between '>
                  <div className=''>
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                    <AiFillStar size={15} style={{ color: '#ffd252' }} />
                  </div>
                </div>
                <h4
                  className='mt-3 fontsize-pet-title '
                  style={{ fontSize: '13px', textAlign: 'justify' }}
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </h4>
              </div>
            </div>
            <div
              className='justify-content-center'
              style={{
                textAlign: '-webkit-left',
                position: 'relative',
                top: '-46px',
              }}
            >
              <div className='visit-btn ' style={{ paddingLeft: '27px' }}>
                مشاهده
              </div>
            </div>
          </div>
        </div>
        <LogoFooter />
      </div>
    </>
  )
}

export default Affiliate
