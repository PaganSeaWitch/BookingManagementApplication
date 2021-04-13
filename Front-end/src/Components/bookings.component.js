// JavaScript source code
import { useState, useEffect } from "react";
import BookingListing from "./booking-listing.component"

const Bookings = ({ user, getHotel, getRoom, onBookingClick, props }) => {





    return (
        <div className={"login-background"}>

        <div className={"margin-50-booking"}>
                <header className={"bold-center"}>
                Current Bookings for {user.username}
                </header>
        </div>
            <div className= 'room-listing-container'>

            


                <ul style={{ listStyleType: "none" }}>
                    {user.bookings.map((booking, index) => <BookingListing key={index}bookingID={booking._id} hotel={getHotel(booking.hotel_ID)} room={getRoom(booking.room_ID)} onClick={onBookingClick} props={props} /> )}
                </ul>
            </div>
        </div>
    )
}

export default Bookings