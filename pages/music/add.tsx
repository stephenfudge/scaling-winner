import React, { useState } from 'react';

export default function AddMusic(){
    const [ artist, setArtist ] = useState('');
    const [title, setTitle] = useState('');
    const [format, setFormat] = useState('');
    const [error, setError ] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( artist && title && format ){
            try{
                let response = await fetch('/api/addMusic', {
                    method: 'POST',
                    body: JSON.stringify({
                        artist,
                        title,
                        format,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                response = await response.json();
                setArtist('');
                setTitle('');
                setFormat('');
                setError('');
                setMessage('Media added successfully');
            }catch(errorMessage: any){
                setError(errorMessage);
            }
        }else{
            return setError('All fields are required')
        }
    };


    return(
        <div>
            <h1>Add Music</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="artist">Artist</label>
                <input type="text" name="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="format">Format</label>
                <input type="text" name="format" value={format} onChange={(e) => setFormat(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}