import { useState, useEffect} from "react";
import RoomListing from "./room-listing.component";


// JavaScript source code
const Hotel = ({ getHotel, onRoomClick, props}) => {
    const [hotelName, setHotelName] = useState("");
    const [hotelLocation, setHotelLocation] = useState({
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        stateOrProvince: "",
        country: "",
        postalCode: "",
    });
    const [rooms, setHotelRooms] = useState([])


    const page = window.location.href;
    const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
    console.log(page)

    const currentPageType1 = "/hotel/"
    let id = ""
    if (page != uri + currentPageType1 && hotelName == "") {
        id = page.substring(uri.length + currentPageType1.length)
        getHotel(id, setHotelLocation, setHotelName, setHotelRooms, props);
    }
    
    return (
        <div class = 'hotel-page'>
            
            <h1>
                {hotelName}{' '}
                
            </h1>

            <form>

                <h3>Address </h3>

                <label>City : {hotelLocation.city} </label>
                <br></br>
                <label>State : {hotelLocation.stateOrProvince} </label>




            </form>
            <h3> Available Rooms </h3>
            
			<ul style = {{listStyleType: "none"}}>
                {rooms.map(room => <li> <RoomListing room={room} onClick={onRoomClick} props={props} /></li>)}
			</ul>
        </div>
    )
}

export default Hotel