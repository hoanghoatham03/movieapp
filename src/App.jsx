import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerData, setImageURL } from './store/movieSlice'
import apiClient from './api/apiConfig'
import { tmdbAPI } from './api/tmdbApi'

function App() {
  const dispath = useDispatch()
  const fetchTrendingData = async () => {
    try {
      const response = await apiClient.get(tmdbAPI.getBanner())
      dispath(setBannerData(response.data.results))
    } catch (error) {
      console.log('trending error', error)
    }
  }

  const fetchConfiguration = async () => {
    try {
      const response = await apiClient.get(tmdbAPI.getConfigurations())

      dispath(setImageURL(response.data.images.secure_base_url + 'original'))
    } catch (error) {
      console.log('configuration error', error)
    }
  }

  useEffect(() => {
    fetchTrendingData()
    fetchConfiguration()
  }, [])
  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>

      <Footer />
      <MobileNavigation />
    </main>
  )
}

export default App
