import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { tmdbAPI } from '../api/tmdbApi'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await tmdbAPI.getSearch(location.search.split('=')[1], pageNo)
      setData((prevData) => [...prevData, ...response.results])
    } catch (error) {
      throw new Error('Failed to fetch data SearchPage' + error)
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    setPageNo((prevPageNo) => prevPageNo + 1)
  }

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [location?.search])

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here..'
          onChange={(e) => {
            navigate(`/search?q=${e.target.value}`)
          }}
          value={location.search.split('=')[1]}
          className='w-full bg-white   px-4 py-1 text-lg text-neutral-900    rounded-full'
        />
      </div>
      <div className='container mx-auto'>
        <h2 className='capitalize text-lg lg:text-2xl font-semibold my-3'>Search Results</h2>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] justify-center lg:justify-start gap-6'>
          {data.map((searchData, index) => {
            return (
              <Card key={searchData.id + 'searchData' + index} data={searchData} media_type={searchData.media_type} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
