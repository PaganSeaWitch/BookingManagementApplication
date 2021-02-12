import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./Components/navbar.component";
import GenericList from "./Components/generic-list.component";
import EditGeneric from "./Components/generic-edit.component";
import CreateGeneric from "./Components/generic-create.component";


const App = () => {
    return (
    <Router>
        <NavBar />
        <br />
        <Route path="/" exact component={GenericList} />
        <Route path="/edit:id" component={EditGeneric} />
        <Route path="/create" component={CreateGeneric} />
    </Router>);


};

export default App;
