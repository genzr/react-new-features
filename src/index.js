import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
    const storage = localStorage.getItem('notes')
    const parseStorage = JSON.parse(storage)
    const [ notes, setNotes ] = useState(parseStorage || [])
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

    // const retrieveNotes = () => {
    //     
    //     
    //     setNotes([])
    // }

    // console.log(notes)

    useEffect(() => {
        const jsonString = JSON.stringify(notes)
        localStorage.setItem('notes', jsonString)
    })

    return (
    <div>
        <h1>Notes</h1>
        {notes.map((note) => (
            <div key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <button onClick={() => removeNote(note.title)}>Remove</button>
            </div>
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

// const App = (props) => {
//     const [count, setCount] = useState(props.count) 
//     const [text, setText] = useState('')

//     useEffect(() => {
//         console.log('use Effect ran')
//         document.title = count
//     })

//     const increment = () => {
//         setCount(count +1)
//     }

//     const decrement = () => {
//         setCount(count -1)
//     }

//     const reset = () => {
//         setCount(props.count)
//     }

//     return (
//         <div>
//             <p>The current {text || 'count'} is {count}</p>
//             <button onClick={increment}> +1 </button>
//             <button onClick={decrement}> -1 </button>
//             <button onClick={reset}> Reset </button>
//             <input value={text} onChange={(e) => setText(e.target.value)} />
//         </div>
//     )
// }

ReactDOM.render(<NoteApp count={0} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
