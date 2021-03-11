// JavaScript source code
import { useState, useEffect } from "react";
import axios from "axios";
import RoomListing from "./room-listing.component";

require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI

const EditRooms = ({ manager, onRoomClick, props }) => {
    const [rooms, setHotelRooms] = useState([])
    const [hotelName, setHotelName] = useState("")
    const [hotelID, setHotelID] = useState("")

    useEffect(() => {

        if (manager._id == "") {
            props.history.push("/");
        }
        axios.get(uri + "/hotel/getHotelByID/" + manager.hotel_ID)
            .then(hotelResponse => {
                if (hotelResponse != null) {
                    console.log(hotelResponse.data)
                    setHotelID(hotelResponse.data._id)
                    setHotelName(hotelResponse.data.name)
                    const roomIDs = hotelResponse.data.room_IDs;
                    roomIDs.forEach(roomID => {
                        console.log(roomID)
                        axios.get(uri + "/room/getRoomByID/" + roomID)
                            .then(roomResponse => {
                                if (roomResponse != null) {
                                    console.log(roomResponse.data)
                                    setHotelRooms([...rooms, roomResponse.data])
                                }
                            })
                    })
                }
                else {
                    props.push("/")
                }
            })
            .catch(err => { return "" })

    }, [])


    return (
        <div>

            <header>
                {hotelName}{' '}

            </header>

            
            <h3> Edit Existing Rooms </h3>

            <ul style={{ listStyleType: "none" }}>
                {rooms.map((room, index) => <RoomListing key={index} room={room} onClick={onRoomClick} props={props} />)}
            </ul>
        </div>
    )
}

export default EditRooms
