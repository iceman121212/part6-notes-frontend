import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })
  test('toggles state for a note', () => {
    const state = [{
      content: 'the app state is in redux store',
      important: true,
      id: 1
    }]
    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: { id: 1 }
    }

    const newState = noteReducer(state, action)

    expect(newState[0].important).toEqual(false)
  })
})