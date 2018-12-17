import axios from 'axios'
import { wpApiBase } from '../../config'

const wpApiEndpoints = {
  getAllPosts: async () => {
    try {
      const result = await axios.get(`${wpApiBase}/posts`)
      return result.data as WPPost[]
    } catch (error) {
      throw error.response.data
    }
  }
}

export default wpApiEndpoints
