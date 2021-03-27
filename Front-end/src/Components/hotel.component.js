import { useState, useEffect} from "react";
import RoomListing from "./room-listing.component";
import SimpleMap from "./google-map.component"
import ListRooms from "./list-rooms.component"
import { SearchBar } from 'react-native-elements';
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
            getHotel(id, setHotelLocation, setHotelName, setHotelRooms, props);
        }
        
        

    },[]);
   
    
    return (
		<div className = 'login-background'>
            <div className={"margin-50"}>
                <h1 className='bold-center'>{hotelName}</h1>
            </div>
            <form className = 'hotel-page'>
            
                

                <div>

                    <h3>Address </h3>
                    <div>
                        <label> {hotelLocation.streetAddress1}{", "}{hotelLocation.streetAddress2.length == 0 ? "" : hotelLocation.streetAddress2 + ", "}{hotelLocation.city}{", "}{hotelLocation.stateOrProvince}{", "}{hotelLocation.country}{", "}{hotelLocation.postalCode} </label>

                    </div>
                    <SimpleMap location={hotelLocation} name={hotelName}/>



                </div>
                <h3> Available Rooms </h3>

            </form>
            <div className={"room-search"}>
                <header>
                    <input className={"search-bar"}
                        type='text'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); }
                        } />

                </header>
                {<ListRooms rooms={rooms} onRoomClick={onRoomClick} props={props} />}
            </div>
		</div>
    )
}

export default Hotel