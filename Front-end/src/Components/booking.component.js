import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import SimpleMap from "./google-map.component"

require('dotenv').config()


const Booking = ({ user, getRoom, getHotel}) => {
    const [hotelName, setHotelName] = useState("")
    const [roomNumber, setRoomNumber] = useState(0)
    const [roomPrice, setRoomPrice] = useState(0)
    const [roomBedAmount, setRoomBedAmount] = useState(0)
    const [smoking, setSmoking] = useState(false);
    const [handicap, setHandicap] = useState(false);
    const [suite, setSuite] = useState(false);
    const [hotelLocation, setHotelLocation] = useState({
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        stateOrProvince: "",
        country: "",
        postalCode: "",
    });
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
            const tempDateList = [];

            user.bookings.filter((booking) => {

                if (booking._id == id) {
                    console.log("Booking :" +booking);
                    roomID = booking.room_ID;
                    hotelID = booking.hotel_ID;
                    dates = booking.dates_booked;
                    dates.forEach(booked => {
                        let tempDate = new Date(booked);
                        console.log(tempDate)
                        tempDateList.push(tempDate);
                    })
                    setUserBookedDates([...tempDateList])
                }
            })
            getHotel(hotelID).then(response => {
                setHotelName(response.name)
                setHotelLocation({
                    ...hotelLocation,
                    streetAddress1: response.location.streetAddress1,
                    streetAddress2: response.location.streetAddress2,
                    city: response.location.city,
                    stateOrProvince: response.location.stateOrProvince,
                    country: response.location.country,
                    postalCode: response.location.postalCode
                })
            })
                .catch(err => console.log(err))
            getRoom(roomID).then(response => {
                setRoomNumber(response.roomNumber);
                setRoomPrice(response.price);
                setRoomBedAmount(response.beds);
                setHandicap(response.tags.handicap);
                setSmoking(response.tags.smoking);
                setSuite(response.tags.suite);
            })

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
                <br></br>
                <label>smoking permitted : {smoking ? "yes" : "no"} </label>
                <br></br>
                <label>handicap accessible : {handicap ? "yes" : "no"} </label>
                <br></br>
                <label>suite : {suite ? "yes" : "no"} </label>
                <div>
                    <label>Booked Dates</label>
                    <DatePicker selected={userBookDates[0]} startDate={userBookDates[0]} endDate={userBookDates[userBookDates.length - 1]} minDate={userBookDates[0] } maxDate={userBookDates[userBookDates.length - 1]} selectsRange inline />


                </div>
                <SimpleMap location={hotelLocation} name={hotelName}/>
                <label> Total Price : {userBookDates.length == 0 ? roomPrice : roomPrice * userBookDates.length} </label>
                

            </form>

        </div>
    )
}

export default Booking// JavaScript source code
