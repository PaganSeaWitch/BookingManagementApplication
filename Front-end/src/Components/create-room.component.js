// JavaScript source code
import { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI

const checkRoomNumber = (hotelID, roomNumber,props) => {
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

const CreateRoom = ({ manager, onCreateRoom, props }) => {
    const [hotelID, setHotelID] = useState("")
    const [hotelName, setHotelName] = useState("")
    const [roomPrice, setRoomPrice] = useState(0);
    const [amountOfBeds, setAmountOfBeds] = useState(1);
    const [tags, setTags] = useState([])
    const [createRoom, setCreateRoom] = useState(false)
    const [roomNumber, setRoomNumber] = useState(100);
    const [tagString, setTagString] = useState("")
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
                onCreateRoom(hotelID, roomNumber, amountOfBeds, roomPrice, tags, props)

            }
            else {
                alert("Room number already exists!")
                
            }
        }

    },[createRoom])

    return (
        <div>

            <div className={"login-header"}>
                <header>Create New Room for {hotelName} </header>
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
                    <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setCreateRoom(true); }}> Create Room </button>
                    <span></span>

                </div>
                <br></br>

            </form>

        </div>
    )
}

export default CreateRoom