import { React, useState, useCallback, useEffect } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import { FiSearch } from 'react-icons/fi'
import dog from '../img/dog.jpg'
import cat from '../img/cat.jpg'
import kasko from '../img/kasko.jpg'
import Fade from 'react-reveal/Fade'
import tiger from '../img/tiger.jpg'
import { LinkContainer } from 'react-router-bootstrap'

const url = 'https://new.louneh.louneh.com/admin/Knows/API/_getKnows'

const Docs = () => {
  const [docs, setDocs] = useState('')
  const getDocs = useCallback(async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ page: 1 }),
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()

      setDocs(content.data.list)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getDocs()
  }, [])

  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className='text-center mt-5' style={{ fontSize: '33px' }}>
          دانستنی ها
        </h4>

        <div className='mt-5 row text-center mx-5 justify-content-center'>
          <Fade right>
            {docs &&
              docs.map((e) => {
                return (
                  <div key={e.id} className='col-lg-3 col-md-6 col-sm-6 col-12'>
                    <img
                      src={e.image}
                      style={{
                        width: '90%',
                        borderTopLeftRadius: '25px',
                        borderTopRightRadius: '25px',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px',
                        height: '60%',
                      }}
                      alt={e.title}
                    />

                    <LinkContainer
                      to={`/singledoc/${e.id}`}
                      style={{
                        width: '90%',
                        margin: 'auto',
                        padding: '15px',
                        backgroundColor: '#ffffff',
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                        borderBottomLeftRadius: '25px',
                        borderBottomRightRadius: '25px',
                        boxShadow: '0px 1px 26px 5px rgb(132 132 132 / 63%)',
                        cursor: 'pointer',
                      }}
                    >
                      <h4 style={{ fontSize: '12px' }}>{e.title}</h4>
                    </LinkContainer>
                  </div>
                )
              })}
          </Fade>
        </div>
        <LogoFooter />
      </div>
    </>
  )
}

export default Docs
