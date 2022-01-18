import { React, useEffect, useCallback, useState } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import kitty from '../img/kitty.png'
import world from '../img/world.jpg'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Fade from 'react-reveal/Fade'
const url = 'https://new.louneh.louneh.com/admin/Games/API/_getGames'
const Entertainment = () => {
  const [game, setGame] = useState('')
  const getGame = useCallback(async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()

      setGame(content.data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    getGame()
  }, [])

  return (
    <>
      <Header />

      <div style={{ minHeight: '60vh' }}>
        <h4 className='text-center mt-5' style={{ fontSize: '33px' }}>
          سرگرمی
        </h4>
        <div className='justify-content-center text-center mt-5 '>
          <div className='row mx-0'>
            {game &&
              game.map((e) => {
                return (
                  <Fade right>
                    <a
                      href={e.link}
                      key={e.id}
                      className='col-lg-4 col-md-8 col-sm-10 col-12 mt-5'
                      style={{
                        textAlign: '-webkit-center',
                        textDecoration: 'none',
                      }}
                    >
                      <div
                        style={{
                          boxShadow: '3px 8px 21px 6px rgb(228 213 213)',
                          width: '70%',
                          backgroundColor: '#fff',
                          borderRadius: '25px',
                          padding: '20px 15px 15px 15px',
                        }}
                      >
                        <img
                          src={e.image}
                          style={{ width: '100%', borderRadius: '17px' }}
                          alt={e.title}
                        />
                        <h3 className='mt-4' style={{ color: 'black' }}>
                          {e.title}
                        </h3>
                      </div>
                    </a>
                  </Fade>
                )
              })}
          </div>
        </div>
      </div>
      <LogoFooter />
    </>
  )
}

export default Entertainment
