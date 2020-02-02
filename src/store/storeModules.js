import _ from 'lodash'
import transcriptionsEndpoints from '@/api/transcriptionsEndpoints'

export default {
  state: {
    transcriptionsData: [],
    messages: {
      successMessage: '',
      errorMessage: '',
    },
  },
  getters: {
    getInfoDataTranscriptions(state) {
      return state.transcriptionsData
    },
    getInfoDataErrorMessage(state) {
      return state.messages.errorMessage
    },
    getInfoDataSuccessMessage(state) {
      return state.messages.successMessage
    },
  },
  mutations: {
    setDataList(state, payload) {
      state.transcriptionsData = payload
    },
    deleteListItem(state, payload) {
      state.transcriptionsData = _.remove(state.transcriptionsData, (arr) => arr.id !== payload)
    },
    addListItem(state) {
      const listItem = {
        id: _.random(100000000, 100000000000000),
        voice: '',
        text: '',
      }
      state.transcriptionsData.push(listItem)
    },
    displaySucecss(state, payload) {
      if (state.messages.errorMessage) {
        state.messages.errorMessage = ''
      }
      state.messages.successMessage = payload

      window.setTimeout(() => {
        state.messages.successMessage = ''
      }, 3000)
    },
    displayError(state, payload) {
      if (state.messages.successMessage) {
        state.messages.successMessage = ''
      }
      state.messages.errorMessage = payload

      window.setTimeout(() => {
        state.messages.errorMessage = ''
      }, 3000)
    },
  },
  actions: {
    async actionGetTranscriptionsData(context) {
      await transcriptionsEndpoints.getTranscriptions()
        .then((response) => {
          context.commit('setDataList', response.data)
        })
        .catch((error) => {
          if (error) {
            context.commit('displayError', 'An error occurred while getting transcriptions from the server. Please try again.')
          }
        })
    },
    addNewTranscription(context) {
      context.commit('addListItem')
    },
    deleteTranscription(context, payload) {
      context.commit('deleteListItem', payload)
    },
    removeTranscriptionMessages(context) {
      context.commit('displayError', '')
      context.commit('displaySucecss', '')
    },
    async uploadTranscriptionsData(context, payload) {
      const invalidFields = payload.filter((element) => Object.values(element).some((x) => x === null || x === '')).length

      if (invalidFields || payload.length < 1) {
        context.commit('displayError', 'The list is empty or has invalid or non saved fields.')
      } else {
        await transcriptionsEndpoints.saveTranscriptions(payload)
          .then(() => {
            context.commit('displaySucecss', 'Transcriptions saved successfully.')
          })
          .catch((error) => {
            if (error) {
              context.commit('displayError', 'An error occured while saving the transcriptions. Please try again.')
            }
          })
      }
    },
  },
}
