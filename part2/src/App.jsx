import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("...input a note")
  const [showAll, setShowAll] = useState(true)

  useEffect(()=> {
    console.log("use effect")
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5
    }
    noteService
    .create(noteObj)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleInputChange = (event) => {
    setNewNote(event.target.value)
  }
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important )

  
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })

  }
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note=> 
          <Note key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
        
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange}/>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App