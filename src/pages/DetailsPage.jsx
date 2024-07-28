import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbAPI } from '../api/tmdbApi'
import useFetchDetails from '../hooks/useFetchDetails'
import useFetch from '../hooks/useFetch'
import loadingGif from '../assets/loading.gif'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay'

const DetailsPage = () => {
  const params = useParams()
  const imageURL = useSelector((state) => state.movieData.imageURL)
  const { data, loading, error } = useFetchDetails(tmdbAPI.getDetails(params.explore, params.id))
  const { data: creditsData } = useFetchDetails(tmdbAPI.getCredits(params.explore, params.id))
  const { data: similarData } = useFetch(tmdbAPI.getSimilar(params.explore, params.id))
  const { data: recommendationsData } = useFetch(tmdbAPI.getRecommendations(params.explore, params.id))
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState('')
  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  const duration = data?.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : 'N/A'
  const writer =
    creditsData?.crew
      .filter((crew) => crew.job === 'Writer')
      ?.map((writer) => writer.name)
      .join(', ') || 'N/A'
  console.log('creData', creditsData)

  if (loading) {
    return (
      <div>
        <div className='flex justify-center items-center h-screen w-screen'>
          <img src={loadingGif} alt='loading' className='w-full h-full' />
        </div>
      </div>
    )
  } else if (error) {
    return <div>Error: {error.message}</div>
  } else {
    return (
      <div>
        <div className='w-full h-[50vh] relative hidden lg:block'>
          <div className='w-full h-full'>
            <img src={imageURL + data?.backdrop_path} alt='' className='w-full h-full object-cover' />
          </div>

          <div className='absolute h-full w-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
        </div>

        <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
          <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
            <img src={imageURL + data?.poster_path} alt='' className='w-60 h-80 object-cover rounded' />
            <button
              onClick={() => handlePlayVideo(data)}
              className='w-full bg-white text-black py-2 mt-3 font-bold rounded-md hover:scale-105 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all '
            >
              Watch Now
            </button>
          </div>
          <div>
            <h2 className='text-2xl lg:text-4xl text-white font-bold'>{data?.title || data?.name}</h2>
            <p className=' text-neutral-400'>{data.tagline}</p>
            <Divider />
            <div className='flex items-center gap-3'>
              <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
              <span>|</span>
              <p>View : {Number(data?.vote_count)}</p>
              <span>|</span>
              <p>Duration : {duration}</p>
            </div>
            <Divider />

            <div>
              <h3 className='text-white text-xl font-bold '>Overview</h3>

              <p className='text-neutral-400'>{data?.overview}</p>
              <Divider />

              <div className='flex items-center gap-3 my-3 text-center '>
                <p>Status : {data?.status} </p>
                <span>|</span>
                <p>Release Date : {moment(data?.release_date || data?.first_air_date).format('MMMM Do YYYY')}</p>
                <span>|</span>
                <p> Language: {data?.original_language}</p>
              </div>
              <Divider />

              <div>
                <p>
                  {' '}
                  <span className='text-white'>Director</span> : {creditsData?.crew[0]?.name}
                </p>
                <Divider />
                <p>
                  <span className='text-white'>Writer : {writer} </span>
                </p>
              </div>
              <Divider />

              <h2 className='text-lg font-bold '>Star Cast :</h2>
              <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 mt-3'>
                {creditsData?.cast
                  ?.filter((el) => el?.profile_path)
                  .map((cast, index) => {
                    return (
                      <div key={cast.id + 'cast' + index} className='flex flex-col justify-center items-center'>
                        <img
                          src={imageURL + cast?.profile_path}
                          alt={cast.name}
                          className='w-24 h-24 object-cover rounded-full'
                        />
                        <p className='font-bold text-center text-sm'>{cast.name}</p>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <HorizontalScrollCard
            data={similarData}
            heading={'Similar ' + params?.explore}
            media_type={params?.explore}
          />
          <HorizontalScrollCard
            data={recommendationsData}
            heading={'Recommendation ' + params?.explore}
            media_type={params?.explore}
          />
        </div>
        {playVideo && <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />}
      </div>
    )
  }
}

export default DetailsPage
