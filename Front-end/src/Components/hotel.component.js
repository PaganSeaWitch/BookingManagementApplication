import { useState, useEffect} from "react";
import RoomListing from "./room-listing.component";
import SimpleMap from "./google-map.component"

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

    useEffect(() => {

        const page = window.location.href;
        const uri = process.env.REACT_APP_FRONT_END_SERVER_URI

        const currentPageType1 = "/hotel/"
        let id = ""
        if (page != uri + currentPageType1 && hotelName == "") {
            id = page.substring(uri.length + currentPageType1.length)
            getHotel(id, setHotelLocation, setHotelName, setHotelRooms,rooms, props);
        }


    },[]);

    
    return (
		<div className = 'login-background'>
            <div className={"margin-50"}>
                <h1 className='bold-center'>{hotelName}</h1>
            </div>
            <form className = 'hotel-page'>
            
                

                <form>

                    <h3>Address </h3>
                    <div>
                        <label> {hotelLocation.streetAddress1}{", "} {hotelLocation.streetAddress2.length == 0 ? "" : hotelLocation.streetAddress2 + ", "} {hotelLocation.city} {", "}{hotelLocation.stateOrProvince} {", "}{hotelLocation.country}{", "}{hotelLocation.postalCode} </label>

                    </div>
                    <SimpleMap location={hotelLocation} name={hotelName}/>



                </form>
                <h3> Available Rooms </h3>

            </form>

			<div>
                {rooms.map((room, index) => <RoomListing key={index} room={room} onClick={onRoomClick} props={props} />)}
			</div>
   
		</div>
    )
}

export default Hotel