import { useEffect, useState } from 'react'
import apiClient from '../api/apiConfig'

const useFetch = (url) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(url)
        if (!response.data) {
          throw new Error('Failed to fetch data ' + url)
        }

        setData(response.data.results)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
