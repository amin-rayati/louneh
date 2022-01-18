import { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div>
      {isVisible && (
        <button className='scrolltoTop' onClick={scrollToTop}>
          <AiOutlineArrowUp className='' />
        </button>
      )}
    </div>
  )
}
