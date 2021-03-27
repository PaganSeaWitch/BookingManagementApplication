import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import RoomListing from "./room-listing.component";

require('dotenv').config()
const useForceUpdate = () => useState()[1];

const uri = process.env.REACT_APP_BACK_END_SERVER_URI
const EditRooms = ({ manager, onRoomClick, props }) => {
    const [rooms, setHotelRooms] = useState([])
    const [hotelName, setHotelName] = useState("")
    const [hotelID, setHotelID] = useState("")
    const forceUpdate = useForceUpdate();
    const [roomsGot, setRoomsGot] = useState(false)

     useEffect( () => {

        if (manager._id == "") {
            props.history.push("/");
         }

         const fetchRooms = async (roomIDs) => {
             const roomsTemp = [];
             for await (let id of roomIDs) {
                 axios.get(uri + "/room/getRoomByID/" + id)
                     .then(response => {
                         if (response != null) {
                             roomsTemp.push(response.data);
                             setHotelRooms([...roomsTemp])
                         }
                     })

             }
             console.log(roomsTemp)
             setHotelRooms(roomsTemp);
             setHotelRooms([...roomsTemp])
         }

         axios.get(uri + "/hotel/getHotelByID/" + manager.hotel_ID)
            .then(hotelResponse => {
                if (hotelResponse != null) {
                    
                    console.log(hotelResponse.data)
                    setHotelID(hotelResponse.data._id)
                    setHotelName(hotelResponse.data.name)
                    const roomIDs = hotelResponse.data.room_IDs;
                    fetchRooms(roomIDs)
                   
                    
                }
                else {
                    props.push("/")
                }
            })
            .catch(err => { return "" })

     }, [])



    return (
        <div className='login-background'>
            <div className={"margin-50"}>
                <header className={"bold-center"}>{hotelName}: Edit Existing Rooms</header>
            </div>
            <div className={"room-listing-container"}>
                <ul>
                    {rooms.map((room, index) => <RoomListing key={index} room={room} onClick={onRoomClick} props={props} />)}
                </ul>
            </div>
		</div>
    )
}

export default EditRooms
