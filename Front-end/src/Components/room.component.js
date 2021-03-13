import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

let id = ""

const Room = ({user, getRoom, updateRoom, updateUser, props}) => {
	const [hotelID, setHotelID] = useState("")
	const [hotelName, setHotelName] = useState("")
	const [roomNumber, setRoomNumber] = useState("")
	const [roomPrice, setRoomPrice] = useState(0)
	const [roomBedAmount, setRoomBedAmount] = useState(0)
	const [roomTags, setRoomTags] = useState([])
	const [roomBookedDates, setRoomBookedDates] = useState([])
	
	const [userBookDates, setUserBookedDates] = useState([])
	const [book, setBook] = useState(false)
	const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {

        

        const page = window.location.href;
        const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
        console.log(page)
        const currentPageType1 = "/room/"
        if (page != uri + currentPageType1 && hotelName == "") {
            id = page.substring(uri.length + currentPageType1.length)
            getRoom(id, setRoomNumber, setRoomPrice, setRoomBedAmount, setRoomTags, setRoomBookedDates, setHotelID, setHotelName, props);
        }


    }, []);
    useEffect(() => {

        if (book == true) {
            setBook(false)
            if (user.id == "") {
                props.history.push("/login")
                return;
            }
            setRoomBookedDates([...roomBookedDates, userBookDates])
            const response = updateRoom(id, roomNumber, roomPrice, roomBedAmount, roomTags, roomBookedDates, userBookDates);

            if (response == true) {
                const newBooking = ({ room_ID: id, hotel_ID: hotelID, date_booked: userBookDates })
                updateUser(user, newBooking, props)
            }
                
            
        }




    }, [book]);
	const onChange = dates => {
        const [start, end] = dates;
		setStartDate(start);
        setEndDate(end);
        const datesList = [];
        let tempStart = start;

        const addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
        while (tempStart <= end) {
            datesList.push(tempStart);
            tempStart = addDays.call(tempStart, 1);
        }

        setUserBookedDates([...datesList]);
	};
	
    

   

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
                    <label>Book range</label>
                    <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate = {endDate} minDate = {new Date()} excludeDates={[roomBookedDates]} selectsRange inline />
                   

                </div>

                <label> Total Price : {endDate == null ? roomPrice : roomPrice + roomPrice * (Math.floor((Math.abs(endDate - startDate) / 1000) / (60 * 60 * 24)))} </label>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setBook(true); }}> Book Room </button>

            </form>
            
        </div>
    )
}

export default Room