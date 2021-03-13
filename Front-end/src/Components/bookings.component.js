// JavaScript source code
import { useState, useEffect } from "react";
import BookingListing from "./booking-listing.component"

const Bookings = ({ user, getHotel, getRoom, onRoomClick, props }) => {
    const [hotelName, setHotelName] = useState("");
    const [hotelCity, setHotelCity] = useState("");
    const [hotelCountry, setHotelCountry] = useState("");


    useEffect(() => {

        
        


    }, []);


    return (
        <div>

            <header>
                Current Bookings for {user.username}
            </header>


            <ul style={{ listStyleType: "none" }}>
                {user.bookings.map((booking, index) => { <BookingListing key={index} booking={booking} hotel={getHotel(booking.hotel_ID)} room={getRoom(booking.room_ID)} onClick={onRoomClick} props={props} /> })}
            </ul>
        </div>
    )
}

export default Bookings