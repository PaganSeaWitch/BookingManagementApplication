import { useState, useEffect } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI
const frontURI = process.env.REACT_APP_FRONT_END_SERVER_URI



const checkRoomNumber = async (hotelID, roomNumber, props) => {
    return axios.get(uri + "/hotel/getHotelByID/" + hotelID)
        .then(response => {
            if (response != null) {
                const roomIDs = response.data.room_IDs;
                if (roomIDs != 0) {
                    roomIDs.forEach(roomID => {
                        axios.get(uri + "/room/getRoomByID/" + roomID)
                            .then(roomResponse => {

                                if (roomResponse.data.roomNumber == roomNumber) {
                                    return false
                                }
                            })
                            .catch(err => { return false })
                    })
                    return true;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        })
        .catch(err => { return true })
}


const EditRoom = ({ manager, onRoomUpdate, getRoom, props }) => {
    const [hotelID, setHotelID] = useState("")
    const [hotelName, setHotelName] = useState("")
    const [roomPrice, setRoomPrice] = useState(0);
    const [amountOfBeds, setAmountOfBeds] = useState(1);
    const [tags, setTags] = useState([])
    const [editRoom, setEditRoom] = useState(false)
    const [roomNumber, setRoomNumber] = useState(100);
    const [roomID, setRoomID] = useState("")
    const [smoking, setSmoking] = useState(false);
    const [handicap, setHandicap] = useState(false);
    const [suite, setSuite] = useState(false);
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

        if (manager._id == "") {
            props.history.push("/");
        }
        const currentPageType1 = "/editRoom/"
        let id = ""
        const page = window.location.href;

        if (page != frontURI + currentPageType1 && hotelName == "") {
            id = page.substring(frontURI.length + currentPageType1.length)
            console.log(page)
            setRoomID(id)
            getRoom(id, setRoomNumber, setRoomPrice, setAmountOfBeds, setSuite, setHandicap, setSmoking, props);
        }
        axios.get(uri + "/hotel/getHotelByID/" + manager.hotel_ID)
            .then(response => {
                if (response != null) {
                    console.log(response.data)
                    setHotelID(response.data._id)
                    setHotelName(response.data.name)
                    if (response.data.roomroom_IDs.includes(id) == false) {
                        props.push("/editRooms")
                    }
                }
                else {
                    props.push("/")
                }
            })
            .catch(err => { return "" })

    }, [])


    useEffect(async() => {

        if (editRoom == true) {
            setEditRoom(false)
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
            
            const checksum = await checkRoomNumber(hotelID, roomNumber, props)
            if (checksum) {
                const tags = ({ smoking, handicap, suite })
                onRoomUpdate(hotelID, roomNumber, amountOfBeds, roomPrice, tags, props)

            }
            else {
                alert("Room number already exists!")

            }
        }

    }, [editRoom])

    return (
        <div className = 'login-background'>

            <div className={"margin-50"}>
                <header className = 'bold-center'>Edit existing room for {hotelName} </header>
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
                <br></br>

                <div>

                    <span className={"move-middle-span"}></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setEditRoom(true); }}> Update Room </button>
                    <span className={"move-middle-span"}></span>

                </div>
                <br></br>

            </form>

        </div>
    )
}

export default EditRoom