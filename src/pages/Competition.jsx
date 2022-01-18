import { React, useState, useCallback, useEffect } from 'react'
import Header from '../components/Header_bg'
import LogoFooter from '../components/LogoFooter'
import cat1 from '../img/cat1.jpg'
import dog1 from '../img/dog1.jpg'
import CompetitionSingle from './CompetitionSingle'
import Fade from 'react-reveal/Fade'
import Loading from './PaginationLoading'

const url = 'https://new.louneh.louneh.com/admin/Matches/API/_getMatches'

const Competition = () => {
  const [btnActive, setBtnActive] = useState(false)
  const [i, setI] = useState(0)
  const [match, setMatch] = useState('')
  const [loading, setLoading] = useState(false)

  const getMatch = async () => {
    setLoading(true)
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ page: i + 1 }),
        headers: {
          token: 'test',
        },
      })
      const content = await rawResponse.json()
      setMatch([...match, ...content.data.list])
      if (content.data.hasNext) {
        setBtnActive(false)
        setI(i + 1)
        setLoading(false)
      } else {
        setBtnActive(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMatch()
  }, [])

  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh' }}>
        <h4 className='text-center mt-5' style={{ fontSize: '33px' }}>
          مسابقه
        </h4>
        <Fade right>
          <div className='row mt-5 justify-content-center text-center'>
            {match &&
              match.map((e) => {
                return <CompetitionSingle e={e} />
              })}
          </div>
        </Fade>
        {!btnActive ? (
          <div className='my-5 d-flex justify-content-center'>
            <button
              className='mainBtn1 '
              onClick={() => {
                getMatch()
              }}
            >
              {loading ? <Loading /> : 'بارگذاری بیشتر'}
            </button>
          </div>
        ) : null}
        <LogoFooter />
      </div>
    </>
  )
}

export default Competition
