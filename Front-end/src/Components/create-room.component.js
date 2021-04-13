import { useState, useEffect } from "react";
import axios from "axios";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI

const checkRoomNumber = (hotelID, roomNumber, props) => {
    console.log("checking number")
    axios.get(uri + "/hotel/getHotelByID/" + hotelID)
        .then(response => {
            if (response != null) {
                console.log(response)
                const roomIDs = response.data.room_IDs;
                if (roomIDs != 0) {
                    roomIDs.forEach(roomID => {
                        console.log(roomID)
                        axios.get(uri + "/room/getRoomByID/" + roomID)
                            .then(roomResponse => {
                                console.log(roomResponse.data.roomNumber)
                                console.log(roomNumber)
                                if (roomResponse.data.roomNumber == roomNumber) {
                                    return true
                                }
                            })
                            .catch(err => { return true })
                    })
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        })
        .catch(err => { return true })
    return false;
}

const CreateRoom = ({ manager, onCreateRoom, props }) => {
    const [hotelID, setHotelID] = useState("")
    const [hotelName, setHotelName] = useState("")
    const [roomPrice, setRoomPrice] = useState(0);
    const [amountOfBeds, setAmountOfBeds] = useState(1);
    const [smoking, setSmoking] = useState(false);
    const [handicap, setHandicap] = useState(false);
    const [suite, setSuite] = useState(false);
    const [createRoom, setCreateRoom] = useState(false);
    const [roomNumber, setRoomNumber] = useState(100);
    useEffect(() => {

        if (manager._id == "") {
            props.history.push("/");
        }
        axios.get(uri + "/hotel/getHotelByID/" + manager.hotel_ID)
            .then(response => {
                if (response != null) {
                    console.log(response.data)
                    setHotelID(response.data._id)
                    setHotelName(response.data.name)
                }
                else {
                    props.push("/")
                }
            })
            .catch(err => { return "" })

    }, [])
    const handleSmoker = (event) => {
        setSmoking(event.target.checked);
    };
    const handleSuite = (event) => {
        setSuite(event.target.checked)
    }
    const handleHandicap = (event) => {
        setHandicap(event.target.checked)
    }

    useEffect(() => {

        if (createRoom == true) {
            setCreateRoom(false)
            if (isNaN(roomPrice)) {
                alert("Please enter a number for price")
                return;
            }
            if (isNaN(amountOfBeds)) {
                alert("Please enter a number for amount of beds")
                return;

            }
            if (isNaN(roomNumber)) {
                alert("Please enter a number for hotel room")
                return;

            }
            
            if (checkRoomNumber(hotelID, roomNumber, props) == false) {
                const tags = ({ smoking, handicap, suite })
                console.log(tags)
                onCreateRoom(hotelID, roomNumber, amountOfBeds, roomPrice, tags, props)

            }
            else {
                alert("Room number already exists!")
                
            }
        }

    },[createRoom])

    return (
            
        <div className = 'login-background'>
            <div className={"margin-50"}>
                <header className='bold-center'>{hotelName}: Create New Room</header>
            </div>
            <form className={"login-form"}>
                
                <div>
                    <span className={"move-middle-span"}></span>
                    <label>Room Number</label>
                    <span className={"move-middle-span"}></span>
                </div>
                <div>
                    <span className={"move-middle-span"}></span>

                    <input className={"rounded-login"}
                        type='number'
                        min="1"
                        value={roomNumber}
                        onChange={(e) => { setRoomNumber(e.target.value); }
                        } />
                    <span className={"move-middle-span"}></span>

                </div>
                <div>
                    <span className={"move-middle-span"}></span>
                    <label>Price per Night in Dollars</label>
                    <span className={"move-middle-span"}></span>
                </div>
                <div>
                    <span className={"move-middle-span"}></span>

                    <input className={"rounded-login"}
                        type='number'
                        min="0"
                        value={roomPrice}
                        onChange={(e) => { setRoomPrice(e.target.value); }
                        } />
                    <span className={"move-middle-span"}></span>

                </div>
                <div>
                    <span className={"move-middle-span"}></span>
                    <label>Amount of Beds</label>
                    <span className={"move-middle-span"}></span>
                </div>
                <div>
                    <span className={"move-middle-span"}></span>

                    <input className={"rounded-login"}
                        type='number'
                        min="1"
                        max="5"
                        value={amountOfBeds}
                        onChange={(e) => { setAmountOfBeds(e.target.value); }
                        } />
                    <span className={"move-middle-span"}></span>
                    
                </div>
                
                
                <div>
                    <span className={"move-middle-span"}></span>
                    <label>Tags (seperate by commas)</label>
                    <span className={"move-middle-span"}></span>
                </div>
                <div className={"checkbox"}>

                    <FormControlLabel control={<Checkbox
                        name="smoking permitted"
                        checked={suite}
                        onChange={handleSuite}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />} label="suite" labelPlacement="end" />

                </div>

                <div className={"checkbox"}>

                    <FormControlLabel control={<Checkbox
                        name="smoking permitted"
                        checked={smoking}
                        onChange={handleSmoker}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />} label="smoking permitted" labelPlacement="end" />


                </div>
                <div className={"checkbox"}>

                    <FormControlLabel control={<Checkbox
                        name="smoking permitted"
                        checked={handicap}
                        onChange={handleHandicap}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />} label="handicap accessable" labelPlacement="end" />


                </div>
                <div>

                    <span className={"move-middle-span"}></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setCreateRoom(true); }}> Create Room </button>
                    <span className={"move-middle-span"}></span>

                </div>
                <br></br>

            </form>
            
        </div>
    )
}

export default CreateRoom