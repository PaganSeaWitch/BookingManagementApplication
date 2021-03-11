import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const Room = ({getRoom, props}) => {
	const [hotelID, setHotelID] = useState("")
	const [hotelName, setHotelName] = useState("")
	const [roomNumber, setRoomNumber] = useState("")
	const [roomPrice, setRoomPrice] = useState(0)
	const [roomBedAmount, setRoomBedAmount] = useState(0)
	const [roomTags, setRoomTags] = useState([])
	const [roomBookedDates, setRoomBookedDates] = useState([])
    const page = window.location.href;
    const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
    console.log(page)
    const [startDate, setStartDate] = useState(new Date());

    const currentPageType1 = "/room/"
    let id = ""
    if (page != uri + currentPageType1 && hotelName == "") {
        id = page.substring(uri.length + currentPageType1.length)
        getRoom(id, setRoomNumber, setRoomPrice, setRoomBedAmount, setRoomTags, setRoomBookedDates, setHotelID, setHotelName, props);
    }

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
                    <label>Book from</label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                   

                </div>
                <div>
                    <label>Book to</label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

                </div>
                <label> Total Price : {roomPrice} </label>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault();}}> Book Room </button>

            </form>
            
        </div>
    )
}

export default Room