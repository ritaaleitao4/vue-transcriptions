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
    modifyListData(state, payload) {
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
          context.commit('modifyListData', response.data)
        })
        .catch((error) => {
          if (error) {
            context.commit('displayError', 'An error occured while retrieving the transcriptions. Please try again.')
          }
        })
    },
    removeTranscriptionMessages(context) {
      context.commit('displayError', '')
      context.commit('displaySucecss', '')
    },
    addNewTranscription(context) {
      context.commit('addListItem')
    },
    deleteTranscription(context, payload) {
      context.commit('deleteListItem', payload)
    },
    async uploadTranscriptionsData(context, payload) {
      const invalidFields = payload.filter((element) => Object.values(element).some((x) => x === null || x === '')).length

      if (invalidFields) {
        context.commit('displayError', 'The list you\'re trying to upload is empty or has invalid or non saved fields.')
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
