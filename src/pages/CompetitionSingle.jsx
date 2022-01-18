import { React, useState } from 'react'
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa'
import Fade from 'react-reveal/Fade'
import { LinkContainer } from 'react-router-bootstrap'

const CompetitionSingle = ({ e }) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className='col-lg-8 col-md-8 col-sm-0 col-12 mt-4'>
      <img
        src={e.image}
        style={{
          width: '70%',
          borderTopLeftRadius: '25px',
          borderTopRightRadius: '25px',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          boxShadow: '0px 2px 26px 23px rgb(173 168 168 / 63%)',
        }}
        alt={e.title}
      />

      <div
        style={{
          cursor: 'pointer',
          width: '70%',
          margin: 'auto',
          padding: '10px',
          textAlign: 'left',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          borderBottomLeftRadius: '25px',
          borderBottomRightRadius: '25px',
          boxShadow: '0px 2px 26px 23px rgb(173 168 168 / 43%)',
        }}
      >
        <button
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
          onClick={() => setShowInfo(!showInfo)}
        >
          {!showInfo ? (
            <FaArrowCircleDown style={{ color: '#ff9800' }} size={30} />
          ) : (
            <FaArrowCircleUp style={{ color: '#ff9800' }} size={30} />
          )}
        </button>
        <Fade top when={showInfo}>
          {showInfo && (
            <>
              <h6
                className='mx-4 doc-text '
                style={{
                  marginTop: '30px',
                  fontSize: '14px',
                  lineHeight: '35px',
                  textAlign: 'justify',
                }}
              >
                {e.detail}
              </h6>
              <LinkContainer to={`/competition/singlecompetition/${e.id}`}>
                <button className='mainBtn3' style={{ borderRadius: '12px' }}>
                  شرکت در مسابقه
                </button>
              </LinkContainer>
            </>
          )}
        </Fade>
      </div>
    </div>
  )
}

export default CompetitionSingle
