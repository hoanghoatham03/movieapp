import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbAPI } from '../api/tmdbApi'
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await tmdbAPI.getDisCover(params.explore, pageNo)
      console.log('response', response)
      setData((prevData) => [...prevData, ...response.results])
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    setPageNo((prevPageNo) => prevPageNo + 1)
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  //when swaping from one explore page to another, pageNo should be reset to 1
  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  return (
    <div className='py-16  '>
      <div className=' container mx-auto'>
        <h3 className=' capitalize text-lg lg:text-2xl font-semibold m-3'>Popular {params.explore}</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] justify-center gap-6'>
          {data.map((exploreData, index) => {
            return <Card key={exploreData.id + 'exploreData' + index} data={exploreData} media_type={params.explore} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
