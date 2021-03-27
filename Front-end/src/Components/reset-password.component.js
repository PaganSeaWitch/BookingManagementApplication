// JavaScript source code
import { useState, useEffect } from "react";
require('dotenv').config()

const ResetPassword = ({ onResetPassword, props, checkResetID }) => {
    const [password, setPassword] = useState("");
    const [reset, setReset] = useState(false);
    const [stub, setStub] = useState(false);
    const [id, setId] = useState("")
    const page = window.location.href;
    const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
    console.log(page)
    const currentPageType1 = "/resetPassword"
    const currentPageType2 = "/resetPassword/"
    
    
    useEffect(() => {
        if ((page != uri + currentPageType1 && page != uri + currentPageType2)) {
            setId(page.substring(uri.length + currentPageType2.length))
            checkResetID(page.substring(uri.length + currentPageType2.length), props);
        }

    },[])
    useEffect(() => {
        if (reset == true) {
            setReset(false);
            if (password.length == 0) {
                alert("Please enter new password")
                return;
            }
            else {
                onResetPassword(password,id ,props)
            }
        }

    })

    return (
        <div>
            <div className={"margin-50"}>
                <header> Password Reset
                
                </header>
            </div>
            

            {(page != uri + currentPageType1 && page != uri + currentPageType2)
                ? <div>
                    <form className={"login-form"}>
                            <div >
                            <span className={"move-middle-span"}></span>
                                <label>Enter a new password</label>
                            <span className={"move-middle-span"}></span>
                            </div>

                            <div>
                            <span className={"move-middle-span"}></span>

                                <input className={"rounded-login"}
                                    type='text'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); }
                                    } />
                            <span className={"move-middle-span"}></span>

                            </div>
                            <div>

                            <span className={"move-middle-span"}></span>
                                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setReset(true); }}> Recover Account </button>
                            <span className={"move-middle-span"}></span>
                    
                            </div>
                        <br></br>
                    </form>
                    </div>
                : <div>
                    <div className={"recover-stub"}>
                        <span className={"move-middle-span"}></span>
                            <label className={"recover-stub"}>Please check your email to recover password</label>
                        <span className={"move-middle-span"}></span>
                        </div>
                    </div>}
                
            
        </div>
    )
}

export default ResetPassword