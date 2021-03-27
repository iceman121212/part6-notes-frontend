import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const generateId = () => Math.floor(Math.random() * 1000000)

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  }
})


const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content, important: false, id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id: id }
  }
}

const addNote = (event) => {
  event.preventDefault()
  const content = event.target.note.value

  console.log(event)
  console.log('\n^^^ event')
  console.log(event.target)
  console.log('\n^^^ target')
  console.log(event.target.note)
  console.log('\n^^^ event.target.note')
  console.log(event.target.note.value)
  console.log('\n^^^ event.target.note.value')

  store.dispatch(createNote(content))
}

const toggleImportance = (id) => {
  store.dispatch(toggleImportanceOf(id))
}


const App = () => {
  return (
    <div>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >
            {note.content}
            <strong>{note.important ? 'important' : ''}</strong>
          </li>)}
      </ul>
    </div >
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)