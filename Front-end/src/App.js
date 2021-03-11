import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import NavBar from "./Components/navbar.component";
import axios from "axios";
import User from "./Components/user.component";
import Login from "./Components/login.component";
import CreateUser from "./Components/create-user.component";
import Manager from "./Components/manager.component";
import Dashboard from "./Components/dashboard.component";
import SplashPage from "./Components/splashPage.component";
import ForgotPassword from "./Components/forgot-password.component";
import ResetPassword from "./Components/reset-password.component";
import Hotel from "./Components/hotel.component";
import Room from "./Components/room.component";
import CreateRoom from "./Components/create-room.component"
require('dotenv').config()


const App = () => {

    const [user, setUser] = useState({
        _id: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        bookings: []
    })
    const [manager, setManager] = useState({
        _id: "",
        username: "",
        password: "",
        email: "",
        hotel_ID: ""

    })
	
	
    const [hotels, setHotels] = useState([])
    const uri = process.env.REACT_APP_BACK_END_SERVER_URI

    const logOut = () => {
        resetManager();
        resetUser();


    }
    //this happpens at the start of the apps life cycle
    useEffect(() => {

        const loggedInUser = localStorage.getItem('LoggedInUser');
        if (loggedInUser && user.username == "") {
            const userJSON = JSON.parse(loggedInUser);
            setUserStateWithoutPassword(userJSON);
            console.log(userJSON);
        }
        const loggedInManager = localStorage.getItem('LoggedInManager');
        if (loggedInManager && manager.username == "") {
            const managerJSON = JSON.parse(loggedInManager);
            setManagerStateWithoutPassword(managerJSON);
            console.log(managerJSON);
        }
        if (hotels.length == 0) {
            getHotels()
        }

    }, [])

    const getHotels = () => {
        axios.get(uri + "/hotel/allHotels")
            .then(response => {
                console.log(response.data)
                setHotels(response.data)
            })
    }

    const getRooms = (roomIDList, setRooms) => {
        const tempRoomList = [];
        roomIDList.forEach(roomID => {
            axios.get(uri + "/room/getRoomByID/" + roomID)
                .then(response => {
                    if (response.data != null) {
                        tempRoomList.push(response.data)
                    }
                })
                .catch(err => console.log(err))
        })
        setRooms(tempRoomList)


    }


    const onRoomClick = (id, props) => {
        props.history.push("/room/" + id)

    }
    const addRoom = (hotel_id, roomNumber, roomPrice, roomBedAmount, roomTags, props) => {
        const newRoom = ({ roomNumber, price: roomPrice, beds: roomBedAmount, tags:roomTags, bookedDates:[] })
        axios.post(uri + "/room/addRoom", newRoom)
            .then(response => {
                const hotelUpdate = ({id:hotel_id, roomId: response.data.id })
                axios.post(uri + "/hotel/updateRoomsForHotel", hotelUpdate)
                    .catch(err => { console.log(err); return })
                alert("Room has been created!"); props.history.push("/editRoom/" + response.data.id)
            })
    }

    const getHotelForRoom =(room_id, setHotelId, setHotelName, props) => {
        axios.get(uri + "/hotel/getHotelByRoomID/" + room_id)
            .then(response => {
                if (response == null) {
                    alert("Hotel for rooom does not exist!")
                    //axios.delete(uri + "/room/deleteByRoomID/" + room_id)
                    props.history.push("/")
                }
                else {
                    setHotelId(response.data.id);
                    setHotelName(response.data.name);
                }
            })
            .catch(err => console.log(err))
    }

    const getRoom = (room_id, setRoomNumber, setRoomPrice, setRoomBedAmount, setRoomTags, setRoomBookedDates, setHotelId, setHotelName, props) => {
        console.log("Getting Room!")
        axios.get(uri + "/room/getRoomByID/" + room_id)
            .then(response => {
                if (response == null) {
                    props.history.push("/")
                }
                else {
                    setRoomNumber(response.data.roomNumber);
                    setRoomPrice(response.data.price);
                    setRoomBedAmount(response.data.beds);
                    setRoomTags(response.data.tags);
                    setRoomBookedDates(response.data.bookedDates);
                    getHotelForRoom(room_id, setHotelId, setHotelName, props)
                }
            })
            .catch(err => { console.log(err); props.history.push("/") })
    }

    const getHotel = (hotel_id, setHotelLocation, setHotelName, setHotelRooms, props) => {
        console.log("Getting hotel!")
        axios.get(uri + "/hotel/getHotelByID/" + hotel_id)
            .then(response => {
                if (response == null) {
                    props.history.push("/")
                }
                else {
                    setHotelName(response.data.name);
                    setHotelLocation({
                        streetAddress1: response.data.location.streetAddress1,
                        streetAddress2: response.data.location.streetAddress2,
                        city: response.data.location.city,
                        stateOrProvince: response.data.location.stateOrProvince,
                        country: response.data.location.country,
                        postalCode: response.data.location.postalCode
                    });
                    getRooms(response.data.room_IDs, setHotelRooms)
                }
            })
            .catch(err => { console.log(err);props.history.push("/") })
    }

    const getHotelForManager = (hotel_id, setHoteLocation, setHotelName, hotelLocation) => {
        console.log("using the getHotel fuctnion")
        axios.get(uri + "/hotel/getHotelByID/" + hotel_id)
            .then(response => {
                if (response != null) {
                    setHotelName(response.data.name);
                    setHoteLocation({
                        ...hotelLocation,
                        streetAddress1: response.data.location.streetAddress1,
                        streetAddress2: response.data.location.streetAddress2,
                        city: response.data.location.city,
                        stateOrProvince: response.data.location.stateOrProvince,
                        country: response.data.location.country,
                        postalCode:response.data.location.postalCode
                    });
                    console.log(response.data.location)
                }
            })
            .catch(err => {return ""})
    }
	
    const resetManager = () => {
        setManager({
            ...manager,
            _id: "",
            username: "",
            password: "",
            email: "",
            hotel_ID: ""
        })
    }
    const resetUser = () => {
        setUser({
            ...user,
            _id: "",
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            bookings: []
        });
        localStorage.clear();
    }
    const setManagerStateWithoutPassword = (response) => {
        setManager({
            ...manager,
            _id: response._id,
            username: response.username,
            password: response.password,
            email: response.email,
            hotel_ID : response.hotel_ID
        });

        console.log(response);
    }

    const setUserStateWithoutPassword = (response) => {
        setUser({
            ...user,
            _id: response._id,
            username: response.username,
            password: response.password,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            bookings: response.bookings
        });
        
        console.log(response);
    }

    const updateManager = async (manager, username, password, email, hotelName, hotelLocation, setWarning) => {
        const hotel = { id: manager.hotel_ID, name: hotelName, location: hotelLocation, rooms: [] }

        const updatedManager = { id: manager._id, username: username, password: password, email: email, hotel_ID: manager.hotel_ID };

        if (manager.email != email) {
            axios.get(uri + "/email/checkEmail/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen is not valid, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/user/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/manager/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
        }
        if (manager.username == username) {

            axios.post(uri + "/manager/update/", updatedManager)
                .then(response => { setManagerState(response, password); setWarning(""); })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.post(uri + "/hotel/updateHotel/", hotel)
        }
        else{
            axios.get(uri + "/manager/checkIfUsernameExists/" + username)
                .then(response => {
                    if (response.data.length == 2){
                        axios.post(uri + "/manager/update/", updatedManager)
                            .then(response => { setManagerState(response, password); setWarning(""); })
                            .catch(err => { console.log(err); alert("changes were not saved!") });
                        axios.post(uri + "/hotel/updateHotel/", hotel)

                    }
                    else
                    {
                        alert("The username you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });

        };
    };

    const updateUser = async (user, username, password, email, firstName, lastName, setWarning) =>
    {
        const updatedUser = { id:user._id, username, password, email, firstName, lastName };
        if (user.email != email) {
            axios.get(uri + "/email/checkEmail/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen is not valid, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/user/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/manager/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
        }
        
        if (user.username == username) {
            
            axios.post(uri + "/user/update/", updatedUser)
                .then(response => {setUserState(response, password); setWarning(""); })
                .catch(err => { console.log(err); alert("changes were not saved!") });

        }
        else {
           
            axios.get(uri + "/user/checkIfUsernameExists/" + username)
                .then(response => {
                    console.log(response);
                    if (response.data.length == 2) {
                        axios.post(uri + "/user/update/", updatedUser)
                            .then(response => {setUserState(response, password);setWarning("");})
                            .catch(err => { console.log(err); alert("changes were not saved!") });
                    }
                    else {
                        alert("The username you have chosen has already been taken, changes were not saved!");
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
        };
        console.log(updatedUser.username);
    };

    const updatePassword = (password, id,props) =>{
        axios.get(uri + "/email/AccountRecovery/getById/" + id)
            .then(accountTypeResponse => {
                if (accountTypeResponse.data.accountType == "user") {
                    const newPassword = ({ account_id: accountTypeResponse.data.account_id, password})
                    axios.post(uri + "/user/updatePassword/", newPassword)
                        .then(updatePasswordResponse => {
                            console.log(updatePasswordResponse.data)
                            props.history.push("/login")
                            axios.delete(uri + "/email/AccountRecovery/DeleteAllByEmail/" + accountTypeResponse.data.email)
                                .then(console.log("deleted all"))
                                .catch(err => { console.log(err); alert("recovery deletes failed!"); })
                        })
                        .catch(err => { console.log(err); alert("password reset failed!"); })
                }
                if (accountTypeResponse.data.accountType == "manager") {
                    const newPassword = ({ account_id: accountTypeResponse.data.account_id, password })
                    axios.post(uri + "/manager/updatePassword/", newPassword)
                        .then(updatePasswordResponse => {
                            console.log(updatePasswordResponse.data)
                            props.history.push("/login")
                            axios.delete(uri + "/email/AccountRecovery/DeleteAllByEmail/" + accountTypeResponse.data.email)
                                .then(console.log("deleted all"))
                                .catch(err => { console.log(err); alert("recovery deletes failed!"); })
                        })
                        .catch(err => { console.log(err); alert("password reset failed!"); })
                }
            })
            .catch(err => { console.log(err); alert("password reset failed!");})
    }

    const checkUser = (givenUsername, givenPassword, props) => {
        axios.get(uri + "/user/getByUsername/", {
            params: {
                username: givenUsername,
                password: givenPassword
            }
        })
            .then(response =>
            {
                setUserState(response, givenPassword);
                props.history.push('/user');
            })
            .catch(err => alert("Login error!"));
    };

    const createUser = async (username, password, email, firstName, lastName, props) =>
    {
        
            
        axios.get(uri + "/user/checkIfEmailExits/" + email)
            .then(response => {
                if (response.data.length == 3) {
                    alert("The email you have chosen has already been taken");
                    return
                }
        })
            .catch(err => { console.log(err); alert("user email check error!") });

        axios.get(uri + "/manager/checkIfEmailExits/" + email)
            .then(response => {
                if (response.data.length == 3) {
                    alert("The email you have chosen has already been taken");
                    return
                }
        })
                .catch(err => { console.log(err); alert("manager email check error!") });
        
        axios.get(uri + "/email/checkEmail/" + email)
            .then(response => {
                console.log(response.data);
                if (response.data == "yes") {
                    axios.get(uri + "/user/checkIfUsernameExists/" + username)
                        .then(response => {
                            console.log(response.data)
                            if (response.data == "yes") {
                                alert("This username already exists! Please choose another one");
                                return;
                            }
                            else {
                                const newUser = { username, password, email, firstName, lastName };
                                axios.post(uri + "/user/add", newUser)
                                    .then(response => { setUserState(response, password); alert("user created!"); props.history.push("/user"); })
                                    .catch(err => console.log("failed Add: " + err));

                            }
                        })
                        .catch(err => { console.log("failed check: " + err); });
                }
                else {
                    alert("This email doesn't exist! Please choose another one")
                    return;
                }

            })
            .catch(err => console.log("failed emailCheck: " + err));
    }

    const setUserState = (response, givenPassword) =>
    {
        console.log("SETTING STATE");
        setUser(user => ({
            ...user,
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            bookings: response.data.bookings
        }));
        const jsonOjb = {
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            bookings: response.data.bookings
        }
        const json = JSON.stringify(jsonOjb);
        console.log("JSON OF STRINGS: " + json);
        localStorage.setItem('LoggedInUser', json);
        
    }

    const setManagerState = (response, givenPassword) => {
        console.log("SETTING STATE");

        setManager({
            ...manager,
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            email: response.data.email,
            hotel_ID: response.data.hotel_ID,
        });
        const jsonManagerOjb = {
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            email : response.data.email,
            hotel_ID: response.data.hotel_ID,
        }
        const jsonManager = JSON.stringify(jsonManagerOjb);
        console.log("JSON OF STRINGS: " + jsonManager);
        localStorage.setItem('LoggedInManager', jsonManager);
    }

    const createManager = (username, password, email, hotelName, hotelLocation, props) =>
    {
        axios.get(uri + "/email/checkEmail/" + email)
            .then(response => {
                console.log(response.data);
                if (response.data == "yes") {
                    axios.get(uri + "/manager/checkIfUsernameExists/" + username)
                        .then(response => {
                            console.log(response.data)
                            if (response.data == "yes") {
                                alert("This username already exists! Please choose another one");
                                return;
                            }
                            else
                            {
                                const hotel = { name: hotelName, location: hotelLocation, rooms: [] }
                                axios.post(uri + "/hotel/addHotel", hotel)
                                    .then(hotelResponse => {
                                        const newManager = {  username, password, email, hotel_ID: hotelResponse.data }
                                        axios.post(uri + "/manager/add", newManager)
                                            .then(response => { setManagerState(response, password); alert("manager created!"); props.history.push("/manager"); })
                                            .catch(err => alert("Coudln't create account!"));
                                    })
                                    .catch(err => alert("Coudln't create account!"));

                            }
                        }) 
                        .catch(err => alert("Coudln't create account!"));

                }
                else {
                    alert("This email doesn't exist! Please choose another one")
                    return;
                }
                
            })
            .catch(err => console.log("failed Add: " + err));
        
    }

    const checkManager = (givenUsername, givenPassword, props) => {
        axios.get(uri + "/manager/getByUsername/", {
            params: {
                username: givenUsername,
                password: givenPassword
            }
        })
            .then(response => {
                setManagerState(response, givenPassword);
                props.history.push('/manager');
            })
            .catch(err => alert("Login error!"));
    };

    const onHotelClick = (id, props) => {
        props.history.push("/hotel/" +id)

    }
    const checkResetId = (id, props) => {
        console.log("checking reset ID!")
        axios.get(uri + "/email/AccountRecovery/getById/" + id)
            .then(accountResponse => {
                if (accountResponse == null) {
                    props.history.push("/")
                }
            })
            .catch(err => {props.history.push("/")})
    }
    const deleteManager = (id) => {
        //delete generic from backend
        //no implementation for server errors
        axios.delete(uri + "/manager/deleteById/" + id)
        resetManager();
        console.log("Deleted user!");
    }

    // Delete Generic
    const deleteUser = (id) => {
        //delete generic from backend
        //no implementation for server errors
        axios.delete(uri + "/user/deleteById/" + id)
        resetUser();

        console.log("Deleted user!");
    }

    const recoverAccount = (email, props) => {
        axios.get(uri + "/user/getByEmail/" + email)
            .then(userResponse => {
                if (userResponse.data == null) {
                    axios.get(uri + "/manager/getByEmail/" + email)
                        .then(managerResponse => {
                            if (managerResponse.data == null) {
                                alert("please enter an email that is tied to an account!")
                            }
                            else {
                                const managerAccountRecovery = ({ email: email, account_id: managerResponse.data._id, accountType: "manager" })
                                axios.post(uri + "/email/AccountRecovery/Add", managerAccountRecovery)
                                    .then(acountRecoveryResponse => {
                                        axios.post(uri + "/email/AccountRecovery/SendEmailRecoveryRequest/" + acountRecoveryResponse.data._id)
                                            .then(emailSentResponse => {
                                                console.log(emailSentResponse.data)
                                                props.history.push("/resetPassword")

                                            })
                                            .catch(err => { alert("email sent error!"); console.log(err) });
                                    })
                                    .catch(err => { alert("adding acount Recovery error!"); console.log(err) });

                            }
                        })
                        .catch(err => alert("getting manager Acount error!"));

                }
                else {
                    const userAccountRecovery = ({ email: email, account_id: userResponse.data._id, accountType: "user" })
                    console.log(userAccountRecovery)
                    axios.post(uri + "/email/AccountRecovery/Add", userAccountRecovery)
                        .then(acountRecoveryResponse => {
                            axios.post(uri + "/email/AccountRecovery/SendEmailRecoveryRequest/" + acountRecoveryResponse.data._id)
                                .then(emailSentResponse => {
                                    console.log(emailSentResponse.data)
                                    props.history.push("/resetPassword")
                                })
                                .catch(err => { alert("email sent error!"); console.log(err) });
                        })
                        .catch(err => { alert("adding acount Recovery error!"); console.log(err)});
                }
            })
            .catch(err => {alert("getting user Acount error!"); console.log(err);});

    }

    //where render happens
    return (

        <Router>  
           
            <NavBar user={user} manager={manager} />
			
            <br />
            <p> {process.env.BACK_END_SERVER_URI} </p>
            {/* Here instead of using the component, we use the render and then the component
                * we do this because the component cannot take in anything without using render
                * if you just want to route to a componet without passing anyting to it
                * <Route path="/" exact component={<component>} /> works*/}
			
			
            <Route path="/" exact render={(props) => (
                <>
                    {<SplashPage />}
                </>
            )}
            />
			
            <Route path="/hotel/:id" render={(props) => (
                <>
                    {<Hotel getHotel={getHotel} onRoomClick={onRoomClick} props={props}/>}
                </>
            )}
            />

			<Route path="/dashboard" render={(props) => (
                <>
                    {<Dashboard user={user} manager={manager} props={props} hotels={hotels} onHotelClick={onHotelClick}  props={props}/>}
                </>
            )}
            />
			
            <Route path="/manager" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<Manager manager={manager} onDelete={deleteManager} logOut={logOut} props={props} getHotel={getHotelForManager} onUpdate={updateManager} />}
                </>
            )}
            />    

            <Route path="/createRoom" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<CreateRoom manager={manager}  props={props}/>}
                </>
            )}
            />

            <Route path="/room/:id" render={(props) => (
                <>
                    {<Room getRoom={getRoom} props={props} />}

                </>
            )}
            />
           
            <Route path="/user" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<User user={user} onDelete={deleteUser} logOut={logOut} props={props} onUpdate={updateUser} />}
                </>
            )}
            />
            <Route path="/login" render={(props) => (
                <>
                    {<Login onUserLogin={checkUser} onManagerLogin={checkManager} props={props} />}

                </>
            )}
            />
            <Route path="/create" render={(props) => (
                <>
                    {<CreateUser onCreateUser={createUser} onCreateManager={createManager} props={props} />}
                </>
            )}
            />
            <Route path="/forgotPassword" exact render={(props) => (
                <>
                    {<ForgotPassword props={props} onEmailSubmit={recoverAccount} />}
                </>
            )}

            />
            <Route path="/resetPassword/:id" exact render={(props) => (
                <>
                    {<ResetPassword checkResetID={checkResetId} onResetPassword={updatePassword} props={props} />}
                </>
            )}
            />
            <Route path="/resetPassword/" exact render={(props) => (
                <>
                    {<ResetPassword checkResetID={checkResetId} onResetPassword={updatePassword} props={props} />}
                </>
            )}
            />
    </Router>);


};

export default App;
