import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
const Login = ({ onUserLogin, onManagerLogin, props }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userButtonType, setUserButtonType] = useState("contained");
    const [managerButtonType, setManagerButtonType] = useState("outlined");
    const [loginAsUser, setLoginAsUser] = useState(true);
    const [login, setLogin] = useState(false);
    const [loginType, setLoginType] = useState("User");

    useEffect(() => {
        if (login == true) {
            setLogin(false);
            if (username.length == 0 || password.length == 0) {
                return;
            }
            if (loginAsUser == true) {
                onUserLogin(username, password, props)
            }
            else {
                onManagerLogin(username, password, props);
            }
        }
        
    })

    return (
        <div className = {"login-background"}>
            <div className={"login-header"}>
                <header className = {"bold"}> {loginType} Login
                    <div className={"bottom-right-corner"}>
                        <Button variant={userButtonType} className={"switch-button"} color="primary" size="small" onClick={() => { setLoginAsUser(true); setLoginType("User"); setUserButtonType("contained"); setManagerButtonType("outlined");}}> User </Button>
                        <Button variant={managerButtonType} className={"switch-button"} color="primary" size="small" onClick={() => { setLoginAsUser(false); setLoginType("Manager");setUserButtonType("outlined"); setManagerButtonType("contained");}}> Manager </Button>
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
                <br></br>
                <div>
                    
                    <span></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setLogin(true); }}> LogIn </button>
                    <span></span>

                </div>
                <br></br>
                <div>
                    
                    <a href="/create" className="help-links" target="_blank">Create Account</a>
                    <a href="/forgotPassword" className="help-links" target="_blank">Forgot password?</a>
                   
                </div>
            </form>
        </div>
    )

}

export default Login
