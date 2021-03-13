import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker/dist/react-datepicker';
require('dotenv').config()


const Booking = ({ user, getRoom, getHotel}) => {
    const [hotelName, setHotelName] = useState("")
    const [roomNumber, setRoomNumber] = useState(0)
    const [roomPrice, setRoomPrice] = useState(0)
    const [roomBedAmount, setRoomBedAmount] = useState(0)

    const [userBookDates, setUserBookedDates] = useState([])

    useEffect(() => {


        let id = ""

        const page = window.location.href;
        const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
        console.log(page)
        const currentPageType1 = "/booking/"
        if (page != uri + currentPageType1 && hotelName == "") {
            id = page.substring(uri.length + currentPageType1.length)
            console.log(id);
            let roomID = "0"
            let hotelID = "0"
            let dates = []
            user.bookings.filter((booking) => {

                if (booking._id == id) {
                    console.log("Booking :" +booking);
                    roomID = booking.room_ID;
                    hotelID = booking.hotel_ID;
                    dates = booking.dates_booked;
                }
            })
            getHotel(hotelID).then(response => {
                setHotelName(response.name)
            })
                .catch(err => console.log(err))
            getRoom(roomID).then(response => {
                setRoomNumber(response.roomNumber);
                setRoomPrice(response.price);
                setRoomBedAmount(response.beds);
            })
            setUserBookedDates([...dates])
            console.log(dates)
        }


    }, [user]);







    return (
        <div>

            <h1>
                {hotelName}{' '}

            </h1>

            <form>

                <h3>Room : {roomNumber} </h3>

                <label>Price : {roomPrice} </label>
                <br></br>
                <label>Beds : {roomBedAmount} </label>

                <div>
                    <label>Booked Dates</label>
                    <DatePicker selected={userBookDates[0]}  selectsRange inline />


                </div>

                <label> Total Price : {userBookDates.length == 0 ? roomPrice : roomPrice * userBookDates.length} </label>
                

            </form>

        </div>
    )
}

export default Booking// JavaScript source code
