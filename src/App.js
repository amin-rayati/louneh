import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// import Header from './components/Header_bg'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Error from './pages/Error'
import Singleproduct from './pages/Singleproduct'
import Addarticles from './pages/Addarticles'
import Dashboard from './pages/Dashboard'
import Myadds from './pages/Myadds'
import Bookmark from './pages/Bookmark'
import Entertainment from './pages/Entertainment'
import Docs from './pages/Docs'
import Singledoc from './pages/Singledoc'
import { Cookies, useCookies } from 'react-cookie'
import Competition from './pages/Competition'
import PetGram from './pages/PetGram'
import Affiliate from './pages/Affiliate'
import Foroshgah from './pages/Foroshgah'
import Custom from './pages/CustomPet'
import CompeleteProfile from './pages/CompeleteProfile'
import Rules from './pages/Rules'
import Contact from './pages/Contact'
import UsualPetShop from './pages/UsualPetShop'
import SingleCompetition from './pages/SingleCompetition'
import SingleAffiliateProduct from './pages/SingleAffiliateProduct'
import SearchPage from './pages/SearchPage'
import { useFilterContext } from './context/FilterProvider'
import axios from 'axios'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [cookiesCityname, setCookieCityname, removeCookieCityname] = useCookies(
    ['cityname']
  )

  const handleCookie = (infoObject) => {
    setCookie(
      'user',
      {
        mobile: infoObject,
      },
      {
        path: '/',
      }
    )
  }

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

  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }

  window.onload = function () {
    if (!cookiesCityname['cityname']) {
      cityModalShow()
    }
  }

  return (
    <div style={{ backgroundColor: '#f4f5f7' }}>
      <Router>
        <Navbar />

        {/* <ScrollToTop /> */}
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/entertainment'>
            <Entertainment />
          </Route>
          <Route exact path='/doc'>
            <Docs />
          </Route>
          <Route exact path='/singledoc/:id'>
            <Singledoc />
          </Route>
          <Route exact path='/competition'>
            <Competition />
          </Route>
          <Route exact path='/petgram'>
            <PetGram />
          </Route>
          <Route exact path='/competition/SingleCompetition/:id'>
            <SingleCompetition />
          </Route>
          <Route exact path='/UsualPetShop/:id'>
            <UsualPetShop />
          </Route>
          <Route exact path='/Foroshgah'>
            <Foroshgah />
          </Route>
          <Route exact path='/CustomPet/:id'>
            {cookies['user'] ? <Custom /> : <Error />}
          </Route>
          <Route exact path='/rules'>
            <Rules />
          </Route>{' '}
          <Route exact path='/Contact'>
            <Contact />
          </Route>
          <Route exact path='/CompeleteProfile'>
            {cookies['user'] ? <CompeleteProfile /> : <Error />}
          </Route>
          <Route exact path='/articles/:name/:id'>
            <Products />
          </Route>
          <Route exact path='/articles/:name/:id/:id'>
            <Singleproduct />
          </Route>
          <Route exact path='/dashboard'>
            {cookies['user'] ? <Dashboard /> : <Error />}
          </Route>
          <Route exact path='/myadds'>
            {cookies['user'] ? <Myadds /> : <Error />}
          </Route>
          <Route exact path='/bookmarks'>
            {cookies['user'] ? <Bookmark /> : <Error />}
          </Route>
          <Route exact path='/addarticles/:name/:id'>
            {cookies['user'] ? <Addarticles /> : <Error />}
          </Route>
          <Route exact path='/affiliateAds/:id'>
            <SingleAffiliateProduct />
          </Route>
          <Route exact path='/searchpage/:name'>
            <SearchPage />
          </Route>
          <Route exact path='/SingleArticles/:id'>
            <Singleproduct />
          </Route>
          <Route exact path='/*'>
            <Error />
          </Route>
        </Switch>
        <ScrollToTop />
        <Footer />
      </Router>
    </div>
  )
}

export default App
