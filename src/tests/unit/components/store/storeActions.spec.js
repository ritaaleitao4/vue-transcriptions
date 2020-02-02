import axios from 'axios'
import storeActions from '@/store/storeModules'

jest.mock('axios', () => ({
  get: jest.fn(() => new Promise(() => '')),
  post: jest.fn( () => new Promise(() => '')),
}))

let data = [
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
const url = 'https://www.mocky.io/v2/5ae1c5792d00004d009d7e5c'
const commit = jest.fn()

describe('Testing actions', () => {
  it('actionGetTranscriptionsData: should get a list of transcriptions', () => {
    storeActions.actions.actionGetTranscriptionsData({ commit })
    expect(axios.get).toBeCalledWith(url)
  })

  it('addNewTranscription: should add a new transcription', () => {
    storeActions.actions.addNewTranscription({ commit })
    expect(commit).toHaveBeenCalled()
  })

  it('deleteTranscription: should delete a transcription', () => {
    storeActions.actions.deleteTranscription({ commit }, 1)
    expect(commit).toHaveBeenCalled()
  })

  it('removeTranscriptionMessages: should remove transcriptions messages error&success', () => {
    storeActions.actions.removeTranscriptionMessages({ commit })
    expect(commit).toHaveBeenCalled()
  })

  it('uploadTranscriptionsData: should upload transcriptions', () => {
    storeActions.actions.uploadTranscriptionsData({ commit }, data)
    expect(axios.post).toBeCalledWith(url, data)
  })

  it('uploadTranscriptionsData: should throw error when the list is empty', () => {
    data = []
    storeActions.actions.uploadTranscriptionsData({ commit }, data)
    expect(axios.post).not.toBeCalledWith(url, data)
    expect(commit).toHaveBeenCalled()
  })

  it('uploadTranscriptionsData: should throw error when the list has invalid or non saved fields', () => {
    const transcription = {
      id: 4,
      text: '',
      voice: 'Test',
    }
    data.push(transcription)

    storeActions.actions.uploadTranscriptionsData({ commit }, data)
    expect(axios.post).not.toBeCalledWith(url, data)
    expect(commit).toHaveBeenCalled()
  })
})
