import React from "react";
import { useState } from "react";

const GenericCreate = ({ onCreate }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    //submits form back to app
    const onSubmit = (e) => {
        e.preventDefault()

        //makes sure forms are filled correctly
        if (!username) {
            alert('Please add a username')
            return
        }
        if (!password) {
            alert("Please add a password")
            return
        }

        onCreate({ username, password })

        setUsername('')
        setPassword('')
    }


    return(
        <form className='create-generic-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Enter a generic username</label>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Enter a generic password</label>
                <input
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type='submit' value='Create Generic' className='btn btn-block' />
        </form>
    );
};

export default GenericCreate;
