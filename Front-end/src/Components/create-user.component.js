import Button from '@material-ui/core/Button';
import { useState, useEffect, useRef } from "react";
import GoogleSocialAuth from "./google-auth.component";
import axios from "axios";
require('dotenv').config()

const CreateUser = ({ onCreateManager, onCreateUser, onGoogleLogin, props }) => {
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
    const [hotelStreetAddress1, setHotelStreetAddress1] = useState("");
    const [hotelStreetAddress2, setHotelStreetAddress2] = useState("");
    const [hotelCity, setHotelCity] = useState("");
    const [hotelState, setHotelState] = useState("");
    const [hotelCountry, setHotelCountry] = useState("");
    const [hotelPostalCode, setHotelPostalCode] = useState("");
	
    const refToUserForms = useRef(null);
    const refToManagerForms = useRef(null);
    const geocodeAPIBegining = "https://maps.googleapis.com/maps/api/geocode/json?address="
    const geocodeAPIEnding = "&key=" + process.env.REACT_APP_GOOOGLE_API_KEY


    useEffect(() =>
    {
        
        if (create == true) {
            setCreate(false);
            if (username.length == 0 || password.length <= 5 || email.length == 0) {
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
                if (hotelName.length == 0){
                    alert("please enter your hotel name!")
                    return;
                }
                if (hotelCity.length == 0) {
                    alert("please enter your hotel's city!")
                    return;
                }
                if (hotelState.length == 0) {
                    alert("please enter your hotel's state or province!")
                    return;
                }
                if (hotelStreetAddress1.length == 0) {
                    alert("please enter your hotel's street address!")
                    return;
                }
                if (hotelCountry.length == 0) {
                    alert("please enter your hotel's country!")
                    return;
                }
                if (hotelPostalCode.length == 0) {
                    alert("please enter your hotel's postal code!")
                    return;
                }
                let addressString = ""
                if (hotelStreetAddress1 != "" && hotelStreetAddress1 != undefined && hotelStreetAddress1 != null) {
                    for (let i = 0; i < hotelStreetAddress1.length; i++) {
                        let character = hotelStreetAddress1.charAt(i);
                        if (character == " ") {
                            addressString = addressString + "+"
                        }
                        else {
                            addressString = addressString + character
                        }
                    }
                }
                if (hotelStreetAddress2 != "" && hotelStreetAddress2 != undefined && hotelStreetAddress2 != null) {
                    for (let i = 0; i < hotelStreetAddress2.length; i++) {
                        let character = hotelStreetAddress2.charAt(i);
                        if (character == " ") {
                            addressString = addressString + "+"
                        }
                        else {
                            addressString = addressString + character
                        }
                    }
                }
                if (hotelCity != "") {
                    addressString = addressString + "+" + hotelCity

                }
                if (hotelState != "") {
                    addressString = addressString + "+" + hotelState

                }
                if (hotelCountry != "") {
                    addressString = addressString + "+" + hotelCountry

                }
                if (hotelPostalCode != "") {
                    addressString = addressString + "+" + hotelPostalCode

                }
                if (addressString.length > 5) {
                    axios.get(geocodeAPIBegining + addressString + geocodeAPIEnding)
                        .then(response => {
                            if (response.data != null) {
                                console.log(response)
                                console.log(response.data)
                                if (response.data.results.length != 0) {
                                    const hotelLocation = { streetAddress1: hotelStreetAddress1, streetAddress2: hotelStreetAddress2, city: hotelCity, stateOrProvince: hotelState, country: hotelCountry, postalCode: hotelPostalCode };
                                    console.log(hotelLocation);
                                    onCreateManager(username, password, email, hotelName, hotelLocation, props);
                                }
                                else {
                                    alert("please input a real address!")
                                }
                            }
                            else {
                                alert("please input a real address!")
                            }
                        })
                        .catch(err => { alert("geocoder Error: cant get location!"); console.log(err) })
                }
                
                
            }
        }

    })

    return (
        <div className= {"login-background"}>
            <div className={"margin-50"}>
                <header className={"bold-left"}> New {userType}
                    <div className={"bottom-right-corner"}>
                        <Button variant={userButtonType} className={"switch-button"} color="primary" size="medium" onClick={() => { setCreateUser(true); setUserType("User"); setUserButtonType("contained"); setManagerButtonType("outlined"); }}> User </Button>
                        <Button variant={managerButtonType} className={"switch-button"} color="primary" size="medium" onClick={() => { setCreateUser(false); setUserType("Manager");setUserButtonType("outlined"); setManagerButtonType("contained"); }}> Manager </Button>
                    </div>
                </header>
            </div>
            <form className={"login-form"}>

                {createUser ? <GoogleSocialAuth loginUser={onGoogleLogin} props={props} /> : <div> </div>}

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
                        onChange={(e) => { setUsername(e.target.value); }
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
                        onChange={(e) => { setPassword(e.target.value); }
                        } />
                    <span className={"move-middle-span"}></span>
                </div>
                <div>
                    <span className={"move-middle-span"}></span>
                    <label>Email</label>
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
                {createUser
                    ? <div ref={refToUserForms}>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>First Name</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>

                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>Last Name</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>

                        </div>
                    </div>
                    : <div ref={refToManagerForms} >
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>Hotel Name</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelName}
                                onChange={(e) => { setHotelName(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>Street Address 1</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelStreetAddress1}
                                onChange={(e) => { setHotelStreetAddress1(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>Street Address 2</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelStreetAddress2}
                                onChange={(e) => { setHotelStreetAddress2(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>City</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelCity}
                                onChange={(e) => { setHotelCity(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>State/Province</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelState}
                                maxlength="2"
                                onChange={(e) => { setHotelState(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>Country</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelCountry}
                                onChange={(e) => { setHotelCountry(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>
                            <label>Postal Code</label>
                            <span className={"move-middle-span"}></span>
                        </div>
                        <div>
                            <span className={"move-middle-span"}></span>

                            <input className={"rounded-login"}
                                type='text'
                                value={hotelPostalCode}
                                onChange={(e) => { setHotelPostalCode(e.target.value); }
                                } />
                            <span className={"move-middle-span"}></span>
                        </div>
						
						
						
                    </div>
                }
                
                <br></br>
                <div>

                    <span className={"move-middle-span"}></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setCreate(true); }}> Create Account </button>
                    <span className={"move-middle-span"}></span>

                </div>
                <br></br>
                <div>

                    <a href="/login" className="help-links">Already have an account?</a>

                </div>
            </form>
        </div>
    )

}

export default CreateUser
