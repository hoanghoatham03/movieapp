import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import loadingGif from '../assets/loading.gif'
import { tmdbAPI } from '../api/tmdbApi'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const trendingData = useSelector((state) => state.movieData.bannerData)
  const { data: nowPlayingData, loading, error } = useFetch(tmdbAPI.getNowPlayingMovie())
  const { data: topRatedData } = useFetch(tmdbAPI.getTopRatedMovie())
  const { data: popularTvShowData } = useFetch(tmdbAPI.getPopularTvShow())
  const { data: onTheAirShowData } = useFetch(tmdbAPI.getOnTheAirTvShow())

  if (loading) {
    return (
      <div>
        <BannerHome />
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
        <BannerHome />
        <HorizontalScrollCard data={trendingData} heading='Trending' trending={true} />
        <HorizontalScrollCard data={nowPlayingData} heading='Now Playing' media_type={'movie'} />
        <HorizontalScrollCard data={topRatedData} heading='Top Rated Movies' media_type={'movie'} />
        <HorizontalScrollCard data={popularTvShowData} heading='Popular TV Show' media_type={'tv'} />
        <HorizontalScrollCard data={onTheAirShowData} heading='On the Air' media_type={'tv'} />
      </div>
    )
  }
}

export default Home
