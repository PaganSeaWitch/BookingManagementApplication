// JavaScript source code
import { useState, useEffect } from "react";

const ForgotPassword = ({ onEmailSubmit, props}) => {
    const [email, setEmail] = useState("");
    const [recover, setRecover] = useState(false);

    useEffect(() => {
        if (recover == true) {
            setRecover(false);
            if (email.length == 0) {
                alert("Please enter an email")
                return;
            }
            else {
                onEmailSubmit(email, props)
            }
        }

    })

    return (
<div className = {"login-background"}>
            <div className={"login-header"}>
                <header> Password Recovery
                    
                </header>
            </div>
            <form className={"login-form"}>


                <div>
                    <span className={"move-middle-span"}></span>
                    <label>Enter the email for your account</label>
                    <span className={"move-middle-span"}></span>
                </div>

                <div>
                    <span className={"move-middle-span"}></span>

                    <input className={"rounded-login"}
                        type='text'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }
                        } />
                    <span className={"move-middle-span"}></span>

                </div>
                <div>

                    <span className={"move-middle-span"}></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setRecover(true); }}> Recover Account </button>
                    <span className={"move-middle-span"}></span>

                </div>
                
                <br></br>
                <div>

                    <a href="/create" className="help-links" target="_blank">Create Account</a>
                    <a href="/login" className="help-links" target="_blank">Remembered password?</a>

                </div>
            </form>
        </div>
    )
}

export default ForgotPassword

