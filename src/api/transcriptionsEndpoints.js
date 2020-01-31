import axios from 'axios'

export default {
  getTranscriptions() {
    return axios.get('http://www.mocky.io/v2/5ae1c5792d00004d009d7e5c')
  },
  saveTranscriptions(payload) {
    return axios.post('http://www.mocky.io/v2/5ae1c5792d00004d009d7e5c', payload)
  },
}
