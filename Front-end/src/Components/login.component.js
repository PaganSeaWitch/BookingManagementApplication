import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
const Login = (getUser) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div className={"login-header"}>
                <header> Hotels R US Login
                    <div className={"bottom-right-corner"}>
                        <Button> User </Button>
                        <Button> Manager </Button>
                    </div>
                </header>
            </div>
            <form className={"login-form"}>
                <div>
                    <span></span>
                        <label>Username</label>
                    <span></span>
                </div>
                
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='text'
                        value={username}
                        onChange={(e) => {setUsername(e.target.value); }
                        } />
                    <span></span>

                </div>
                <br></br>
                <div>
                    <span></span>
                    <label>Password</label>
                    <span></span>
                </div>

                <div>
                    <span></span>
                    <input className={"rounded-login"}
                        type={'password'}
                        value={password}
                        onChange={(e) => {  setPassword(e.target.value); }
                        } />
                    <span></span>
                </div>
            </form>
        </div>
    )

}

export default Login
