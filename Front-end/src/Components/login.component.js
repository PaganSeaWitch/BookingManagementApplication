import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
import GoogleSocialAuth from "./google-auth.component";
const Login = ({ onUserLogin, onManagerLogin, props, onGoogleLogin }) => {
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
                <header className={"bold-left"}> {loginType} Login
                    <div className={"bottom-right-corner"}>
                        <Button variant={userButtonType} color="primary" size="medium" onClick={() => { setLoginAsUser(true); setLoginType("User"); setUserButtonType("contained"); setManagerButtonType("outlined");}}> User </Button>
                        <Button variant={managerButtonType} color="primary" size="medium" onClick={() => { setLoginAsUser(false); setLoginType("Manager");setUserButtonType("outlined"); setManagerButtonType("contained");}}> Manager </Button>
                    </div>
                </header>
            </div>
            <form className={"login-form"}>

                {loginAsUser ? <GoogleSocialAuth loginUser={onGoogleLogin} props={props} /> : <div> </div>}
                <div> 
                    <span className={"move-middle-span"}></span>
                    <label>Username</label>
                    <span className={"move-middle-span"}></span>
                </div>
                
                <div>
                    <span className={"move-middle-span"}></span>

                    <input className={"rounded-login"}
                        type='text'
                        value={username}
                        onChange={(e) => {setUsername(e.target.value); }
                        } />
                    <span className={"move-middle-span"}></span>

                </div>
                
                <div>
                    <span className={"move-middle-span"}></span>
                    <label>Password</label>
                    <span className={"move-middle-span"}></span>
                </div>

                <div>
                    <span className={"move-middle-span"}></span>
                    <input className={"rounded-login"}
                        type={'password'}
                        value={password}
                        onChange={(e) => {  setPassword(e.target.value); }
                        } />
                    <span className={"move-middle-span"}></span>
                </div>
                <br></br>
                <div>
                    
                    <span className={"move-middle-span"}></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setLogin(true); }}> LogIn </button>
                    <span className={"move-middle-span"}></span>

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
