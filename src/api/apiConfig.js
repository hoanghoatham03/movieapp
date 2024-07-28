import axios from 'axios'

//use ACCESS TOKEN
const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
  }
}

const apiClient = axios.create(apiConfig)

export default apiClient

//use API KEY

// const apiConfig = {
//   baseURL: 'https://api.themoviedb.org/3',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// }

// const apiClient = axios.create(apiConfig)

// apiClient.interceptors.request.use(
//   (config) => {
//     const apiKey = import.meta.env.VITE_API_KEY

//     console.log('API Key:', apiKey) // Log API key để kiểm tra

//     if (!apiKey) {
//       throw new Error('API Key is missing!')
//     }

//     config.params = {
//       ...config.params,
//       api_key: apiKey
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// export default apiClient
