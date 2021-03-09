import { Link } from "react-router-dom";
import SplashPage from "./splashPage.component";


const NavBar = ({  user, manager }) => {
   
    return (
	
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            {/* This navbar based off the bootstrap navbar */}
        <Link to="" className="navbar-brand">RendezView</Link>
            <div className="collapse navbar-collapse" >
                {(user._id == "" && manager._id == "") //if true, display first div
                    ? <div>
                        <ul className="navbar-nav mr-auto">
                            {/* creates the items in the navbar for navigation */}
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">New Account</Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/Login" className="nav-link">Returning Account</Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                    
                        </ul>
                        
                            
                        </div>
                    : <div>{(manager._id != "") //If not true, display second div
                        
                        ? <div>
                            < ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/manager" className="nav-link">Account Information</Link>
                                </li>
								<li className="navbar-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                        : <div>
                            < ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/user" className="nav-link">account Information</Link>
                                </li>
								<li className="navbar-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                </li>
                            </ul>
                            </div>}
                        </div>}
           
        </div>
    </nav>);
};

export default NavBar
