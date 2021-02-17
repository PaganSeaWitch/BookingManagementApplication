import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";

const Login = (getUser) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <form className={"login-form"}>
                <header className={"main-header"}> Hotels R US Login</header>
                <div>
                    <label>Username:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => {setUsername(e.target.value); }
                        } />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type={'password'}
                        value={password}
                        onChange={(e) => {  setPassword(e.target.value); }
                        } />
                </div>
            </form>
        </div>
    )

}

export default Login
