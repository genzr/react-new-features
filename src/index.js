import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
    const [ notes, setNotes ] = useState([])
    const [ title, setTitle ] = useState('')
    const [ body, setBody ]= useState('')
    const addNote = (e) => {
        e.preventDefault()
        setNotes([
            ...notes,
            {
                title,
                body
            }
        ])
        
        setTitle('')
        setBody('')
    }

    const removeNote = (title) => {
        setNotes(notes.filter((note) => {
            return note.title !== title
        }))
    }

    useEffect(() => {
        const storage = localStorage.getItem('notes')
        const parseStorage = JSON.parse(storage)
        setNotes( parseStorage )
    }, [])

    useEffect(() => {
        const jsonString = JSON.stringify(notes)
        localStorage.setItem('notes', jsonString)
    }, [ notes ])

    return (
    <div>
        <h1>Notes</h1>
        {notes.map((note) => (
            <Note key={note.title} note={note} removeNote={removeNote} />    
        ))}
        {notes.length <1 ? <p>Add Note</p> : ''}
        <form onSubmit={addNote}>
            <input placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder='body' value={body} onChange={(e) => setBody(e.target.value)} />
            <button>Add Note</button>
        </form>
    </div>
    )
}

const Note = ({ note, removeNote }) => {
    useEffect(() => {
        console.log('setting up effect')

        return () => {
            console.log('cleaning up effect')
        }

    }, [])

    return (
    <div>
        <h3>{note.title}</h3>
        <p>{note.body}</p>
        <button onClick={() => removeNote(note.title)}>Remove</button>
    </div>
    )
}

ReactDOM.render(<NoteApp count={0} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
