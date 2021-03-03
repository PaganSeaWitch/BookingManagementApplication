import Button from '@material-ui/core/Button';
import { useState, useEffect, useRef } from "react";
const CreateUser = ({ onCreateManager, onCreateUser, props }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userButtonType, setUserButtonType] = useState("contained");
    const [managerButtonType, setManagerButtonType] = useState("outlined");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [createUser, setCreateUser] = useState(true);
    const [userType, setUserType] = useState("User");
    const [hotelName, setHotelName] = useState("");
    const [create, setCreate] = useState(false);
    const [hotelstreetAddress1, sethotelstreetAddress1] = useState("");
    const [hotelstreetAddress2, sethotelstreetAddress2] = useState("");
    const [hotelCity, sethotelCity] = useState("");
    const [hotelState, sethotelState] = useState("");
    const [hotelCountry, setHotelCountry] = useState("");
    const [hotelPostalCode, setHotelPostalCode] = useStae("");
    const refToUserForms = useRef(null);
    const refToManagerForms = useRef(null);



    useEffect(() =>
    {
        
        if (create == true) {
            setCreate(false);
            if (username.length == 0 || password.length == 0 || email.length == 0) {
                alert("please enter in all fields and have a password of 5 characters minimum")
                return;
            }
            if (createUser == true) {
                if (firstName.length == 0 || lastName.length == 0)
                {
                    alert("please enter in all fields and have a password of 5 characters minimum")
                    return;
                }
                onCreateUser(username, password, email, firstName, lastName, props)
            }
            else {
                if (hotelName.length == 0 || hotelLocation.length == 0) {
                    alert("please enter in all fields and have a password of 5 characters minimum")
                    return;
                }
                onCreateManager(username, password, email, hotelName, hotelLocation, props);
                
            }
        }

    })

    return (
        <div>
            <div className={"login-header"}>
                <header> New {userType}
                    <div className={"bottom-right-corner"}>
                        <Button variant={userButtonType} className={"switch-button"} color="primary" size="small" onClick={() => { setCreateUser(true); setUserType("User"); setUserButtonType("contained"); setManagerButtonType("outlined"); }}> User </Button>
                        <Button variant={managerButtonType} className={"switch-button"} color="primary" size="small" onClick={() => { setCreateUser(false); setUserType("Manager");setUserButtonType("outlined"); setManagerButtonType("contained"); }}> Manager </Button>
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
                        onChange={(e) => { setUsername(e.target.value); }
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
                        onChange={(e) => { setPassword(e.target.value); }
                        } />
                    <span></span>
                </div>
                <div>
                    <span></span>
                    <label>Email</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='text'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }
                        } />
                    <span></span>

                </div>
                {createUser
                    ? <div ref={refToUserForms}>
                        <div>
                            <span></span>
                            <label>First Name</label>
                            <span></span>
                        </div>
                        <div>
                            <span></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value); }
                                } />
                            <span></span>

                        </div>
                        <div>
                            <span></span>
                            <label>Last Name</label>
                            <span></span>
                        </div>
                        <div>
                            <span></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value); }
                                } />
                            <span></span>

                        </div>
                    </div>
                    : <div ref={refToManagerForms} >
                        <div>
                            <span></span>
                            <label>Hotel Name</label>
                            <span></span>
                        </div>
                        <div>
                            <span></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelName}
                                onChange={(e) => { setHotelName(e.target.value); }
                                } />
                            <span></span>
                        </div>
                        <div>
                            <span></span>
                            <label>Hotel Location</label>
                            <span></span>
                        </div>
                        <div>
                            <span></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelLocation}
                                onChange={(e) => { setHotelLocation(e.target.value); }
                                } />
                            <span></span>
                        </div>
                    </div>
                }
                
                <br></br>
                <div>

                    <span></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setCreate(true); }}> Create Account </button>
                    <span></span>

                </div>
                <br></br>
                <div>

                    <a href="/login" className="help-links">existing account?</a>

                </div>
            </form>
        </div>
    )

}

export default CreateUser
