import storeActions from '@/store/storeModules'

let state
const transcriptionDataMock = [
  {
    id: 1,
    voice: 'Voice 2',
    text: 'This is a one line sentence made to show how it fits',
  },
  {
    id: 2,
    voice: 'Voice 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
  },
  {
    id: 3,
    voice: 'Voice 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
]

describe('Testing mutations', () => {
  beforeEach(() => {
    state = {
      transcriptionsData: [],
      messages: {
        successMessage: '',
        errorMessage: '',
      },
    }
  })

  it('setDataList: should has a transcription list loaded', () => {
    storeActions.mutations.setDataList(state, transcriptionDataMock)

    expect(state.transcriptionsData).toHaveLength(3)
    expect(state.transcriptionsData).toStrictEqual(transcriptionDataMock)
  })

  it('setDataList: should not has a transcription list loaded', () => {
    storeActions.mutations.setDataList(state, [])
    expect(state.transcriptionsData).toHaveLength(0)
  })

  it('should save an error if server responded with error to list load', () => {
    const errorMessage = 'An error occurred while getting transcriptions from the server. Please try again.'

    storeActions.mutations.displayError(state, errorMessage)
    expect(state.messages.errorMessage).toEqual(errorMessage)
    expect(state.messages.successMessage).toEqual('')
  })

  it('displaySucecss: should save an success message if server responded with 200', () => {
    const successMessage = 'Transcriptions saved successfully.'

    storeActions.mutations.displaySucecss(state, successMessage)
    expect(state.messages.errorMessage).toEqual('')
    expect(state.messages.successMessage).toEqual(successMessage)
  })

  it('should dismiss error or success message', () => {
    state.messages.errorMessage = 'error msg'
    state.messages.successMessage = 'success msg'

    storeActions.mutations.displayError(state, '')
    storeActions.mutations.displaySucecss(state, '')
    expect(state.messages.errorMessage).toEqual('')
    expect(state.messages.successMessage).toEqual('')
  })

  it('deleteListItem: should delete a new item to the list', () => {
    state.transcriptionsData = transcriptionDataMock

    storeActions.mutations.deleteListItem(state, 1)
    expect(state.transcriptionsData).toHaveLength(2)
  })

  it('addListItem: should add a new item to the list', () => {
    storeActions.mutations.addListItem(state)
    expect(state.transcriptionsData).toHaveLength(1)
  })
})

