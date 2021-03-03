import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react'
import NavBar from "./Components/navbar.component";
import axios from "axios";
import User from "./Components/user.component";
import Login from "./Components/login.component";
import CreateUser from "./Components/create-user.component";
import Manager from "./Components/manager.component";

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
        hotel: {
            name: "",
            location: "",
            rooms: []
        }

    })
    
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
        
        
    }, [])
    const resetManager = () => {
        setManager({
            ...manager,
            _id: "",
            username: "",
            password: "",
            email: "",
            hotel: {
                name: "",
                location: "",
                rooms: []
            }
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
            hotel : response.hotel
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
        const hotel = { name: hotelName, location: hotelLocation, rooms: [] }

        const updatedManager = {oldUsername :manager.username, username, password, email, hotel };
        //Todo, call email checking function first

        if (manager.username == username) {

            axios.post(uri + "/manager/update/", updatedManager)
                .then(response => { setManagerState(response, password); setWarning(""); })
                .catch(err => { console.log(err); alert("changes were not saved!") });
        }
        else{
            axios.get(uri + "/manager/checkIfUsernameExists/" + username)
                .then(response => {
                    if (response.data.length == 2){
                        axios.post(uri + "/manager/update/", updatedManager)
                            .then(response => { setManagerState(response, password); setWarning(""); })
                            .catch(err => { console.log(err); alert("changes were not saved!") });
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
        const updatedUser = { oldUsername : user.username, username, password, email, firstName, lastName };
        //Todo, call email checking function first

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
        
        axios.get(uri + "/user/checkIfUsernameExists/" + username)
            .then(response => {
                console.log(response.data)
                if (response.data == "yes")
                {
                    alert("This username already exists! Please choose another one");
                    return;
                }
                else
                {
                    const newUser = { username, password, email, firstName, lastName };
                    axios.post(uri + "/user/add", newUser)
                        .then(response => { setUserState(response, password); alert("user created!"); props.history.push("/user"); })
                        .catch(err => console.log("failed Add: " + err));
                    
                }
            })
            .catch(err => { console.log("failed check: " + err); });
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
            hotel: response.data.hotel,
        });
        const jsonManagerOjb = {
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            email : response.data.email,
            hotel: response.data.hotel,
        }
        const jsonManager = JSON.stringify(jsonManagerOjb);
        console.log("JSON OF STRINGS: " + jsonManager);
        localStorage.setItem('LoggedInManager', jsonManager);
    }

    const createManager = (username, password, email, hotelName, hotelLocation, props) =>
    {
        axios.get(uri + "/manager/checkIfUsernameExists/" + username)
            .then(response => {
                console.log(response.data)
                if (response.data == "yes") {
                    alert("This username already exists! Please choose another one");
                    return;
                }
                else {
                    const hotel = { name: hotelName, location: hotelLocation, rooms: [] }
                    const newManager = {username, password, email, hotel};
                    axios.post(uri + "/manager/add", newManager)
                        .then(response => { setManagerState(response, password); alert("manager created!"); props.history.push("/manager"); })
                        .catch(err => console.log("failed Add: " + err));

                }
            })
            .catch(err => { console.log("failed check: " + err); });
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
                  
                </>
            )}
            />
            <Route path="/manager" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<Manager manager={manager} onDelete={deleteManager} logOut={logOut} props={props} onUpdate={updateManager} />}
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
    </Router>);


};

export default App;
