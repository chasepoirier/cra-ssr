import axios from 'axios'
import { apiBase } from '../../config'

const MailEndpoints = {
  sendEmail: async data => {
    try {
      const result = await axios.post(`${apiBase}/mail/get_in_touch`, { data })
      return result.data.result
    } catch (error) {
      throw error.response.data
    }
  }
}

export default MailEndpoints
