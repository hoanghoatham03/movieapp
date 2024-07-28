import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import noImage from '../assets/noImage.webp'

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.movieData.imageURL)
  const mediaType = data?.media_type || media_type
  return (
    <Link
      to={'/' + mediaType + '/' + data.id}
      className='w-full h-80 min-w-[230px] max-w-[230px] overflow-hidden block rounded relative hover:scale-105 transition-transform duration-300'
    >
      {data?.poster_path ? (
        <img src={imageURL + data?.poster_path} alt={data.title} />
      ) : (
        <img src={noImage} alt={data.title} />
      )}

      <div className='absolute top-4'>
        {trending && (
          <div className='backdrop-blur-3xl   bg-black/60 w-full  h-full py-1 px-4 flex items-center justify-center text-white text-lg font-bold rounded-r-full overflow-hidden'>
            #{index} Trending
          </div>
        )}
      </div>
      <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full  bg-black/60 p-2'>
        <h2 className=' text-ellipsis line-clamp-1 text-lg font-bold'>{data?.title || data?.name}</h2>
        <div className='flex justify-between items-center'>
          <p className='text-xs  text-gray-400'>
            {moment(data?.release_date || data?.first_air_date).format('MMMM Do YYYY')}
          </p>
          <p className='bg-black px-2 rounded-full text-xs'>Rating: {Number(data?.vote_average).toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
