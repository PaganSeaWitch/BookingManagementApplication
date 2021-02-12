import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import NavBar from "./Components/navbar.component";
import GenericList from "./Components/generic-list.component";
import EditGeneric from "./Components/generic-edit.component";
import CreateGeneric from "./Components/generic-create.component";


const App = () => {
    const [generics, setGenerics] = useState([])

    const createGeneric = async (generic) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(generic),
        })

        const data = await res.json()

        setGenerics([...generics, data])

        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
    }

    return (
    <Router>
            <div className="container">     
                <NavBar />
                <br />
                <Route path="/" exact component={GenericList} />
                <Route path="/edit:id" component={EditGeneric} />
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
