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

                    {(user._id == "" && manager._id == "")
                        ? <div>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">New Account</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/Login" className="nav-link">Returning Account</Link>
                            </li>
                        </div>
                        : <div>{(manager._id != "")
                            ? <div>
                                <li className="navbar-item">
                                    <Link to="/manager" className="nav-link">account Information</Link>
                                </li>
                            </div>
                            :
                            <div>
                                <li className="navbar-item">
                                    <Link to="/user" className="nav-link">account Information</Link>
                                </li>
                            </div>}
                        </div>}
            </ul>
        </div>
    </nav>);
};

export default NavBar
