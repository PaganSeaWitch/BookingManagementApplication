import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react'
import NavBar from "./Components/navbar.component";
import GenericList from "./Components/generic-list.component";
import CreateGeneric from "./Components/generic-create.component";
import axios from "axios";

const App = () => {

    const [generics, setGenerics] = useState([])

    useEffect(() => {
        const getGenerics = async () => {
            const genericsFromServer = await fetchGenerics()
            if (genericsFromServer.data.length > 0)
            {
                setGenerics(genericsFromServer.data)
            }
            
        }

        getGenerics()
    }, [])

    // Fetch Generics
    const fetchGenerics = async () => {
        return axios.get("http://localhost:5000/generic/")
            
            
    }

    const fetchGeneric = async (id) =>
    {
        return axios.get("http://localhost;5000/generic/"+id)
    }

    const editGeneric = async (generic) =>
    {
        axios.post('http://localhost:5000/exercises/update/' + generic._id, generic)
    }

    //creates a generic
    const createGeneric = async (generic) => {
        //send generic to backend
        //the current strategy is not good, no catch for server errors
        axios.post("http://localhost:5000/generic/add", generic)
            .then(response => setGenerics([...generics, response.data]));

    }
    
    // Delete Generic
    const deleteGeneric = async (id) => {
        axios.delete("http://localhost:5000/generic/"+id)
            .then(setGenerics(generics.filter((generic) => generic._id !== id)))
        
    }


    return (
    <Router>
            <div className="container">     
                <NavBar />
                <br />
                <Route path="/" exact render={(props) => (
                    <>
                        {<GenericList generics={generics} onDelete={deleteGeneric}/>}
                    </>
                )}
                />
                
                <Route path="/create" render={(props) => (
                    <>
                        {<CreateGeneric onCreate={createGeneric} />}
                    </>
                )}
                />
            </div>
    </Router>);


};

export default App;
