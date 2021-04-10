import { Link } from "react-router-dom";
import SplashPage from "./splashPage.component";


const NavBar = ({  user, manager }) => {
   
    return (
	
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            {/* This navbar based off the bootstrap navbar */}
        <Link to="" className="navbar-brand"><img className = "logo" src = './RendezView_Logo.png' /></Link>
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
                                <li className="navbar-item">
                                    <Link to="/createRoom" className="nav-link">Create Room</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/editRooms" className="nav-link">Edit Rooms</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/messages" className="nav-link">Messages</Link>
                                </li>
                            </ul>
                            
                        </div>
                        : <div>
                            < ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/user" className="nav-link">Account Information</Link>
                                </li>
								<li className="navbar-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/bookings" className="nav-link">Bookings</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/messages" className="nav-link">Messages</Link>
                                </li>
                            </ul>
                            </div>}
                    </div>}
                <form className="form-inline">
                    {(user._id == "" && manager._id == "") //if true, display first div
                        ? <div>
                            <p>
                            <label> You are not logged in! </label>
                            </p>
                        </div>
                        : <div>

                            <label> Hello {manager.username}{user.username}!</label>
                            <label> You have 0 messages </label>
                        </div>}
                </form>
           
            </div>
    </nav>);
};

export default NavBar
