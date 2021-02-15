import { useState, useEffect, useRef} from "react";

//the user component, also functions as the user information page
//props for later { user, onDelete, editUser }
const User = ({ user, onDelete, logOut, props}) => {
    const [hidden, setHidden] = useState(true);
    const [warning, setWarning] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    //this happpens at the start of the apps life cycle
    useEffect(() => {

        //this is a reference to the button
        //basically, we add an event listener after its loaded up
        //the reason we do this instead of directly in-line
        //is beacuse I either could not prevent default
        //or I would cause a render infinit loop
        //this solves all those problems
        refToLogout.current.addEventListener("click", function (e) {
            e.preventDefault();
            const logOutUser = () => {
                props.history.push('/');
                logOut();
            }
            logOutUser();
        });

    });

    //fills out the form based on current user
    const fillForms = () => {
        setUsername(user.username);
        setPassword(user.password);
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }

    const refToLogout = useRef(null);

    //toggles whether to show password
    const toggleHidden = (e) =>
    {
        e.preventDefault();

        setHidden(!hidden);
    };

    
    //TODO: check if they changed username
    //check if new username isn't already in use
    //if not, update data
    //else, tell user
    const saveChanges = (e) =>
    {
        e.preventDefault();

    }

    //only fillforms if the user exists
    if (user != null) {
        fillForms();
    }



    return (
        
        <div>
            <form className={"user-information"}>
                {/* we wrap this function call in a lambda to prevent render infi loop*/}
                <header>User Information <button id={"logOutButton"} ref={refToLogout } > log out</button></header>
                    
                <div>
                    <label>Username:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => { setWarning("changes made "); setUsername(e.target.value); }
                        }/>
                </div>
                <div> 
                    <label>Password:</label>
                    <input 
                        type={hidden ? 'password' : 'text'}
                        value={password}
                        onChange={(e) => { setWarning("changes made "); setPassword(e.target.value); }
                        }/>
                    <button onClick={toggleHidden}> Show Password</button>
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => { setWarning("changes made "); setFirstName(e.target.value); }
                        }/>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => { setWarning("changes made "); setLastName(e.target.value); }
                        }/>
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => { setWarning("changes made "); setEmail(e.target.value); }
                        }/>
                    
                </div>
                <div className={"bottom-right-corner"}>
                    <i>{warning}</i>
                    <button onClick={saveChanges} > Save Changes</button>
                    <button> Cancel</button>
                </div>
            </form>
        </div>
    )

    
}

export default User