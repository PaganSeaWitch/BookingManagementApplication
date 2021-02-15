import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react'
import NavBar from "./Components/navbar.component";
import GenericList from "./Components/generic-list.component";
import CreateGeneric from "./Components/generic-create.component";
import axios from "axios";
import User from "./Components/user.component";
import { Redirect } from 'react-router-dom';

const App = () => {

    const [generics, setGenerics] = useState([])
    const [user, setUser] = useState()
    const [manager, setManager] = useState()

    const logOut = () => {
        
        //setUser({});
        localStorage.clear();
        console.log("logged out");
        return < Redirect  to = "/" />;
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
    }, [])

    // Fetch Generics
    const fetchGenerics = async () => {
        //gets all generics
        //no implementation for server errors
        return axios.get("http://localhost:5000/generic/")
            
            
    }

    //creates a generic
    const createGeneric = async (generic) => {
        //send generic to backend
        //no implementation for server errors
        axios.post("http://localhost:5000/generic/add", generic)
            .then(response => setGenerics([...generics, response.data]));

    }
    
    // Delete Generic
    const deleteGeneric = async (id) => {
        //delete generic from backend
        //no implementation for server errors
        axios.delete("http://localhost:5000/generic/"+id)
            .then(setGenerics(generics.filter((generic) => generic._id !== id)))
        
    }

    //where render happens
    return (
    <Router>  
            <NavBar />
            <br />
            {/* Here instead of using the component, we use the render and then the component
                * we do this because the component cannot take in anything without using render
                * if you just want to route to a componet without passing anyting to it
                * <Route path="/" exact component={<component>} /> works*/}
            <Route path="/" exact render={(props) => (
                <>
                    {/* we pass a function and the array of generics */}
                    {<GenericList generics={generics} onDelete={deleteGeneric}/>}
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
                    {<User user={user} onDelete={deleteGeneric} logOut={logOut} props={props}/>}
                </>
            )}
            />
    </Router>);


};

export default App;
