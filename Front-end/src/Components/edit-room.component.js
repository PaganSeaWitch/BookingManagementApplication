// JavaScript source code
// JavaScript source code
import { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI
const frontURI = process.env.REACT_APP_FRONT_END_SERVER_URI

const checkRoomNumber = (hotelID, roomNumber, props) => {
    axios.get(uri + "/hotel/getHotelByID/" + hotelID)
        .then(response => {
            if (response != null) {
                const roomIDs = response.data.room_IDs;
                roomIDs.forEach(roomID => {
                    axios.get(uri + "/room/getRoomByID/" + roomID)
                        .then(response => {
                            console.log(response.data.roomNumber)
                            console.log(roomNumber)
                            if (response.data.roomNumber == roomNumber) {
                                return true
                            }
                        })
                })
            }
            else {
                props.push("/")
            }
        })
        .catch(err => { return "" })
    return false;
}

const EditRoom = ({ manager, onRoomUpdate, getRoom, props }) => {
    const [hotelID, setHotelID] = useState("")
    const [hotelName, setHotelName] = useState("")
    const [roomPrice, setRoomPrice] = useState(0);
    const [amountOfBeds, setAmountOfBeds] = useState(1);
    const [tags, setTags] = useState([])
    const [editRoom, setEditRoom] = useState(false)
    const [roomNumber, setRoomNumber] = useState(100);
    const [tagString, setTagString] = useState("")
    const [roomID, setRoomID] = useState("")
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
            getRoom(id, setRoomNumber, setRoomPrice, setAmountOfBeds, setTagString, props);
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


    useEffect(() => {

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
            let tempString = ""
            for (let i = 0; i < tagString.length; i++) {
                if (tagString.charAt(i) == ',') {
                    setTags([...tags, tempString])
                    tempString = ""
                }
                else {
                    tempString = tempString + tagString.charAt(i)
                }
            }
            if (tempString != "") {
                setTags([...tags, tempString])
            }
            if (checkRoomNumber(hotelID, roomNumber, props) == false) {
                onRoomUpdate(roomID, roomNumber, amountOfBeds, roomPrice, tags, props)

            }
            else {
                alert("Room number already exists!")

            }
        }

    }, [editRoom])

    return (
        <div className = 'login-background'>

            <div className={"login-header"}>
                <header className = 'bold'>Edit existing room for {hotelName} </header>
            </div>

            <form className={"login-form"}>

                <div>
                    <span></span>
                    <label>Room Number</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='number'
                        min="1"
                        value={roomNumber}
                        onChange={(e) => { setRoomNumber(e.target.value); }
                        } />
                    <span></span>

                </div>
                <div>
                    <span></span>
                    <label>Price per Night</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='number'
                        min="0"
                        value={roomPrice}
                        onChange={(e) => { setRoomPrice(e.target.value); }
                        } />
                    <span></span>

                </div>
                <div>
                    <span></span>
                    <label>Amount of Beds</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='number'
                        min="1"
                        max="5"
                        value={amountOfBeds}
                        onChange={(e) => { setAmountOfBeds(e.target.value); }
                        } />
                    <span></span>

                </div>

                <div>
                    <span></span>
                    <label>Tags (seperate by commas)</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='text'
                        value={tagString}
                        onChange={(e) => { setTagString(e.target.value); }
                        } />
                    <span></span>

                </div>
                <br></br>

                <div>

                    <span></span>
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setEditRoom(true); }}> Update Room </button>
                    <span></span>

                </div>
                <br></br>

            </form>

        </div>
    )
}

export default EditRoom