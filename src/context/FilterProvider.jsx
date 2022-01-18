import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const FilterContext = React.createContext()

const url =
  'https://new.louneh.louneh.com/admin/Categories/API/_apiCategory?token:test'

export const FilterProvider = ({ children }) => {
  const [iSearch, setISearch] = useState(0)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [btnActiveSearch, setBtnActiveSearch] = useState(false)
  const [btnActiveDashboard, setBtnActiveDashboard] = useState(false)
  const [iDashbord, setIDashboard] = useState(0)
  const [btnActive, setBtnActive] = useState(false)
  const [btnActive1, setBtnActive1] = useState(false)
  const [affiliateId, setAffiliateId] = useState('')
  const [i, setI] = useState(0)
  const [stateValue, setStateValue] = useState([])
  const [cityValue, setCityValue] = useState([])
  const [files, setFiles] = useState([])
  const [petimg, setpetimg] = useState([])
  const [gridView, setGridView] = useState(true)
  const [loading, setLoading] = useState(true)
  const [Error, setError] = useState(false)
  const [singleAffiliate, setSingleAffiliate] = useState()
  const [searchProduct, setSearchProduct] = useState([])
  const [Gender, setgender] = useState(false)
  const [Brand, setbrand] = useState(false)
  const [Petname, setpetname] = useState(false)
  const [mainCat, setMainCat] = useState(null)
  const ID = []
  const [single, setSingle] = useState()
  const [product, setProduct] = useState([])
  const [singleAd, setSingleAd] = useState(null)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [registerModal, setRegisterModal] = useState(false)
  const RegisterClose = () => setRegisterModal(false)
  const RegisterShow = () => setRegisterModal(true)

  const [Addmodal, setAddModal] = useState(false)
  const AddClose = () => setAddModal(false)
  const AddShow = () => setAddModal(true)

  const [PetGramModal, setAddPetGramModal] = useState(false)
  const PetModalClose = () => setAddPetGramModal(false)
  const PetModalShow = () => setAddPetGramModal(true)

  const [JoinCompModal, setJoinCompModal] = useState(false)
  const JoinCompModalClose = () => setJoinCompModal(false)
  const JoinCompModalOpen = () => setJoinCompModal(true)

  const [StateModal, setStateModal] = useState(false)
  const StateModalClose = () => setStateModal(false)
  const StateModalShow = () => setStateModal(true)

  const [allMallModal, setAllMallModal] = useState(false)
  const allMallModalClose = () => setAllMallModal(false)
  const allMallModalShow = () => setAllMallModal(true)

  const [affiliateList, setAffiliateList] = useState(false)
  const affiliateListClose = () => setAffiliateList(false)
  const affiliateListOpen = () => setAffiliateList(true)

  const [editProfileModal, setEditProfileModal] = useState(false)
  const editProfileModalClose = () => setEditProfileModal(false)
  const editProfileModalOpen = () => setEditProfileModal(true)

  const [editAffiliateAdsModal, setEditAffiliateAdsModal] = useState(false)
  const editAffiliateAdsModalClose = () => setEditAffiliateAdsModal(false)
  const editAffiliateAdsModalOpen = () => setEditAffiliateAdsModal(true)

  const [editMyAdModal, setEditMyAdModal] = useState(false)
  const editMyAdModalClose = () => setEditMyAdModal(false)
  const editMyAdModalOpen = () => setEditMyAdModal(true)

  const [likestatus, setLikestatus] = useState(false)
  const [randAd, setRandAd] = useState('')
  const [selectedFile, setSelectedFile] = useState([])
  const categoryId = '-1'
  const pro = []
  const [Btn, setBtn] = useState(false)
  const [petgram, setPetGram] = useState('')
  const [shopInfo, setShopInfo] = useState([])
  const [video, setVideo] = useState(null)

  const [shopAds, setShopAds] = useState([])
  const [compPost, setCompPost] = useState([])
  const [btnActivePetGram, setBtnActivePetGram] = useState(false)
  const [search, setSearch] = useState('')

  const [lastCatId, setLastCatId] = useState('')

  const getMAinCat = useCallback(async () => {
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',

        headers: {
          token: 'test',
        },
        body: JSON.stringify({
          categoryId: categoryId,
        }),
      })
      const content = await rawResponse.json()

      setMainCat(content.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const [cityModal, setCityModal] = useState(false)
  const cityModalClose = () => setCityModal(false)
  const cityModalShow = () => setCityModal(true)

  const [stateId, setStateId] = useState('')
  const [cityId, setCityId] = useState('')
  const [cityIdChange, setCityIdChange] = useState('')

  useEffect(() => {
    getMAinCat()
  }, [])

  const GridView = () => {
    setGridView(true)
  }
  const ListView = () => {
    setGridView(false)
  }

  return (
    <FilterContext.Provider
      value={{
        cityModal,
        cityModalClose,
        cityModalShow,
        stateId,
        setStateId,
        cityId,
        setCityId,
        cityIdChange,
        setCityIdChange,
        lastCatId,
        setLastCatId,
        search,
        video,
        setVideo,
        setSearch,
        loadingSearch,
        setLoadingSearch,
        btnActiveSearch,
        setBtnActiveSearch,
        iSearch,
        setISearch,
        searchProduct,
        setSearchProduct,
        singleAffiliate,
        setSingleAffiliate,
        editMyAdModal,
        editMyAdModalClose,
        editMyAdModalOpen,
        Btn,
        setBtn,
        compPost,
        setCompPost,
        JoinCompModal,
        JoinCompModalClose,
        JoinCompModalOpen,
        btnActivePetGram,
        setBtnActivePetGram,
        btnActiveDashboard,
        setBtnActiveDashboard,
        iDashbord,
        setIDashboard,
        btnActive,
        setBtnActive,
        btnActive1,
        setBtnActive1,
        affiliateId,
        setAffiliateId,
        editAffiliateAdsModal,
        editAffiliateAdsModalClose,
        editAffiliateAdsModalOpen,
        editProfileModal,
        editProfileModalClose,
        editProfileModalOpen,
        shopInfo,
        setShopInfo,
        shopAds,
        setShopAds,
        affiliateList,
        affiliateListClose,
        affiliateListOpen,
        single,
        setSingle,
        selectedFile,
        petgram,
        setPetGram,
        setSelectedFile,
        allMallModal,
        likestatus,
        setLikestatus,
        allMallModalClose,
        allMallModalShow,
        i,
        pro,
        setI,
        randAd,
        setRandAd,
        cityValue,
        setCityValue,
        setStateValue,
        stateValue,
        StateModal,
        StateModalClose,
        StateModalShow,
        files,
        setFiles,
        petimg,
        setpetimg,
        GridView,
        ListView,
        gridView,
        loading,
        product,
        setProduct,
        setLoading,
        Error,
        setError,
        mainCat,
        setMainCat,
        singleAd,
        setSingleAd,
        show,
        handleClose,
        handleShow,
        registerModal,
        RegisterClose,
        RegisterShow,
        Addmodal,
        AddClose,
        AddShow,
        ID,
        Gender,
        setgender,
        Brand,
        setbrand,
        Petname,
        setpetname,
        PetGramModal,
        PetModalClose,
        PetModalShow,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
