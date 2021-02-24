import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({  user, manager }) => {
    
    return (

    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            {/* This navbar based off the bootstrap navbar */}
        <Link to="/" className="navbar-brand">Hotels R US</Link>
        <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {/* creates the two items in the navbar for navigation */}

                    {(user._id == "" || user == Object)
                        ? <div>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">New User</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/Login" className="nav-link">Returning User</Link>
                            </li>
                        </div>
                        : <div>
                                <li className="navbar-item">
                                <Link to="/user" className="nav-link">user Information</Link>
                                </li>
                                
                        </div>}
            </ul>
        </div>
    </nav>);
};

export default NavBar
