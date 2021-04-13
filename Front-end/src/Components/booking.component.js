import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import SimpleMap from "./google-map.component"
import { MdLocalHotel } from 'react-icons/md'
import { FaWheelchair } from 'react-icons/fa'
import { FaSmoking } from 'react-icons/fa'
import { MdRoomService } from 'react-icons/md'
import Tooltip from '@material-ui/core/Tooltip';
import { MdEmail } from 'react-icons/md'
import SendMessageDialogue from "./send-message-dialogue.component";

import axios from "axios";
require('dotenv').config()
const backURI = process.env.REACT_APP_BACK_END_SERVER_URI



const Booking = ({ user, getRoom, getHotel}) => {
    const [hotelName, setHotelName] = useState("")
    const [roomNumber, setRoomNumber] = useState(0)
    const [roomPrice, setRoomPrice] = useState(0)
    const [roomBedAmount, setRoomBedAmount] = useState(0)
    const [smoking, setSmoking] = useState(false);
    const [handicap, setHandicap] = useState(false);
    const [suite, setSuite] = useState(false);
    const [sendMessage, setSendMessage] = useState(false)
    const [userNames, setUsernames] = useState("")

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
                console.log("gottend id:" + id)
                console.log("booking iD:"+ booking._id)
                if (booking._id.normalize() === id.normalize()) {
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
                axios.get(backURI + "/manager/getUsernameByHotel/" + hotelID)
                    .then(response => {
                        setUsernames(response.data)
                    })
                    .catch(err => { console.log(err) })
            })
                .catch(err => console.log(err))
            getRoom(roomID).then(response => {
                console.log(response)
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
        <div className='login-background'>

                <div className={"margin-50"}>
                <header className={"bold-center"}>{hotelName} {"Room: "}{roomNumber} </header>


                </div>
            

            <div className='room-page'>


                <div className={"label-center"}>
                    <label className={"important-label"}>Price : {roomPrice}$ </label>{"   "}
                    <label className={"important-label"}>Beds : {roomBedAmount} </label>
                    <h1><MdEmail className={"booking-message-icon"} style={{ color: 'black', }} onClick={() => { setSendMessage(true) }} /></h1>

                </div>
                
                <div className={"label-center"}>

                    <label className={"underlined"}>Booked Dates</label>
                    <DatePicker selected={userBookDates[0]} startDate={userBookDates[0]} endDate={userBookDates[userBookDates.length - 1]} minDate={userBookDates[0] } maxDate={userBookDates[userBookDates.length - 1]} selectsRange inline />


                </div>
                <SimpleMap location={hotelLocation} name={hotelName} />
                <Tooltip title={suite ? "is a suite" : "is not a suite"} placement="right" arrow>
                    <label className={"room-page-icon"}>suite : {suite ? <MdRoomService style={{ color: 'green' }} /> : <MdRoomService style={{ color: 'red' }} />} </label>
                </Tooltip>
                <br></br>
                <Tooltip title={suite ? "smoking is permitted" : "smoking is not permitted"} placement="right" arrow>
                    <label className={"room-page-icon"}>smoking permitted : {smoking ? <FaSmoking className={"icon"} style={{ color: 'green', hover: "no" }} /> : <FaSmoking className={"icon"} style={{ color: 'red' }} />} </label>
                </Tooltip>

                <br></br>
                <Tooltip title={handicap ? "is handicap accessible" : "is not handicap accessible"} placement="right" arrow>
                    <label className={"room-page-icon"}>handicap accessible : {handicap ? <FaWheelchair className={"icon"} style={{ color: 'green' }} /> : <FaWheelchair className={"icon"} style={{ color: 'red' }} />} </label>
                </Tooltip>
                <div className={"label-center"}>
                    <label className={"price"}> Total Price : {userBookDates.length == 0 ? roomPrice : roomPrice * userBookDates.length} </label>
                    <br></br>

                </div>
                

            </div>
            <SendMessageDialogue
                open={sendMessage}
                setOpen={setSendMessage}
                listOfUsernames={[userNames]}
                title="send a message"
                recipient={userNames}
                senderID={user._id}
                sender={user.username}>
            </SendMessageDialogue>
        </div>
    )
}

export default Booking// JavaScript source code
