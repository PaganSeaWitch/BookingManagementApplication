// JavaScript source code
import { useState, useEffect } from "react";
import BookingListing from "./booking-listing.component"

const Bookings = ({ user, getHotel, getRoom, onBookingClick, props }) => {





    return (
        <div className = 'hotel-page'>

            <header>
                Current Bookings for {user.username} {user.bookings.length}
            </header>


            <ul style={{ listStyleType: "none" }}>
                {user.bookings.map((booking, index) => <BookingListing key={index}bookingID={booking._id} hotel={getHotel(booking.hotel_ID)} room={getRoom(booking.room_ID)} onClick={onBookingClick} props={props} /> )}
            </ul>
        </div>
    )
}

export default Bookings