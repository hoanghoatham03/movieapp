import apiClient from './apiConfig'

export const tmdbAPI = {
  getBanner: () => '/trending/all/week',
  getConfigurations: () => '/configuration',
  getNowPlayingMovie: () => '/movie/now_playing',
  getTopRatedMovie: () => '/movie/top_rated',
  getPopularTvShow: () => '/tv/popular',
  getOnTheAirTvShow: () => '/tv/on_the_air',
  getDisCover: (type, pageNo) => {
    const endpoint = `/discover/${type}`
    const response = apiClient.get(endpoint, {
      params: {
        page: pageNo
      }
    })
    return response.then((res) => res.data)
  },
  getSearch: (query, pageNo) => {
    const endpoint = '/search/multi'
    const response = apiClient.get(endpoint, {
      params: {
        query: query,
        page: pageNo
      }
    })
    return response.then((res) => res.data)
  },
  getDetails: (type, id) => `/${type}/${id}`,
  getCredits: (type, id) => `/${type}/${id}/credits`,
  getSimilar: (type, id) => `/${type}/${id}/similar`,
  getRecommendations: (type, id) => `/${type}/${id}/recommendations`,
  getVideos: (type, id) => `/${type}/${id}/videos`
}
