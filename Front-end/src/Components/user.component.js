import { useState, useEffect, useRef} from "react";
import DeleteDialogue from "./deleteDialogue.component"
import Button from '@material-ui/core/Button';

//the user component, also functions as the user information page
//props for later { user, onDelete, editUser }
const User = ({ user, onDelete, logOut, props, onUpdate }) => {
    const [hidden, setHidden] = useState(true);
    const [warning, setWarning] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState( "");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [safty, setSafty] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [userSave, setUserSave] = useState(false);

  
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

        //sends data back up to app then to backend
        const saveChanges = () => {
            onUpdate(user, username, password, email, firstName, lastName, setWarning);
        }

        //if the user clicked save
        if (userSave == true) {
            setUserSave(false);
            console.log(username);
            saveChanges();
        }

        //constantly check whether they can save
        const checkStates = () => {
            if (warning.length == 0) {
                setCanSave(false)
                return;
            }
            if (username.length <= 3) {
                setCanSave(false)
                return;
            }
            if (password.length <= 5) {
                setCanSave(false)
                return;
            }
            if (!email) {
                setCanSave(false)
                return;
            }
            if (!firstName) {
                setCanSave(false)
                return;
            }
            if (!lastName) {
                setCanSave(false)
                return;
            }
            setCanSave(true);
        }
        checkStates();
        
        //only fillforms if the user exists
        if (user._id != null && username == "") {
            fillForms();
        }
    });
    console.log(user);
    if (user._id == "") {
        props.history.push("/");
    }
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

    const sendAlertOrUser = (e) =>
    {
        e.preventDefault();
        if (canSave == false) {
            alert("cannot save due to invalid fields")
            console.log(email);
        }
        else {
            setUserSave(true)
        }
    }

    
    
    //TODO: check if they changed username
    //check if new username isn't already in use
    //if not, update data
    //else, tell user
    


    const deleteAccount = () =>
    {
        onDelete(user._id);
        props.history.push('/');

    }

 
    return (

        <div className={"user-background"}>
            <div className={"margin-50"}>
                <header className={"bold-center"}>User Account Information </header>
            </div>
            <form className={"user-information"}>
                {/* we wrap this function call in a lambda to prevent render infi loop*/}
                <header className={"main-header"}><Button id={"logOutButton"} ref={refToLogout} > log out</Button></header>

                <div>
                    <label>Username:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => { setWarning("changes made "); setUsername(e.target.value);  }
                        }/>
                </div>
                <div> 
                    <label>Password:</label>
                    <input 
                        type={hidden ? 'password' : 'text'}
                        value={password}
                        onChange={(e) => { setWarning("changes made "); setPassword(e.target.value); }
                        }/>
                    <Button  onClick={toggleHidden}> Show Password</Button>
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
                    <Button  onClick={sendAlertOrUser}> Save Changes</Button>
                    <Button onClick={() => window.location.reload()}> Cancel</Button>

                </div>
                <br></br>
                <DeleteDialogue
                    title="Delete Account?"
                    open={safty}
                    setOpen={setSafty}
                    onConfirm={deleteAccount}
                > Are you sure you want to delete your account? this is Permanent </DeleteDialogue>
                <Button
                    variant="contained"
                    color="secondary"

                    onClick={() => setSafty(true)}
                > Permanently delete your account </Button>
            </form>
            
            
            
            
        </div>
         
    )

    
}

export default User