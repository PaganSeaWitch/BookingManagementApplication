import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react'
import NavBar from "./Components/navbar.component";
import CreateGeneric from "./Components/generic-create.component";
import axios from "axios";
import User from "./Components/user.component";
require('dotenv').config({
    path: __dirname +  "C:\Users\palmerjw\source\repos\BookingManagementApplication\Front-end\.env" })


const App = () => {

    const [generics, setGenerics] = useState([])
    const [user, setUser] = useState()
    const [manager, setManager] = useState()
    const uri = process.env.REACT_APP_BACK_END_SERVER_URI

    const logOut = () =>
    {
        //setUser({});
        localStorage.clear();
        console.log("logged out");
        
    }
    //this happpens at the start of the apps life cycle
    useEffect(() => {
        const getGenerics = async () => {
            //const genericsFromServer = await fetchGenerics()

            //we only add to generics if the data exists
            //if (genericsFromServer.data.length > 0)
            //{
            //    setGenerics(genericsFromServer.data)
            //}
            
        }

        getGenerics()
        console.log(__dirname);
        console.log(uri);
    }, [])

    // Fetch Generics
    const fetchGenerics = async () => {
        //gets all generics
        //no implementation for server errors
        return axios.get( uri +"/generic/")
            
            
    }



    const updateUser = async (user, username, password, email, firstName, lastName, setWarning) =>
    {
        const updatedUser = { username, password, email, firstName, lastName };
        //Todo, call email checking function first

        if (user.username == username) {
            
            axios.post(uri + "/user/update" + user._id, updatedUser)
                .then(response => setUser(response.data));
        }
        else {
            axios.get("http://localhost:5000/user/username" + username)
                .then(response => {
                    if (response.data.length == 0) {
                        axios.post("http://localhost:5000/user" + user._id, updatedUser)
                            .then(response => setUser(response.data));
                    }
                    else {
                        alert("The username you have chosen has already been taken");
                        return;
                    }
                });
        };
        console.log(updatedUser.username);
        setWarning("");
    };

    //creates a generic
    const createGeneric = async (generic) => {
        //send generic to backend
        //no implementation for server errors
        axios.post("http://localhost:5000/generic/add", generic)
            .then(response => setGenerics([...generics, response.data]));

    }
    
    // Delete Generic
    const deleteUser = (id) => {
        //delete generic from backend
        //no implementation for server errors
        //axios.delete("http://localhost:5000/user/"+id)
        console.log("Deleted user!");
    }

    //where render happens
    return (
    <Router>  
            <NavBar />
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
                
            <Route path="/create" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<CreateGeneric onCreate={createGeneric} />}
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
    </Router>);


};

export default App;
