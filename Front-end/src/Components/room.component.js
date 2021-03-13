import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


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
    const [roomID, setRoomID] = useState("")
    useEffect(() => {

        
        let id = ""

        const page = window.location.href;
        const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
        console.log(page)
        const currentPageType1 = "/room/"
        if (page != uri + currentPageType1 && hotelName == "") {
            id = page.substring(uri.length + currentPageType1.length)
            getRoom(id, setRoomNumber, setRoomPrice, setRoomBedAmount, setRoomTags, setRoomBookedDates, setHotelID, setHotelName, props);
            setRoomID(id);
        }


    }, []);
    useEffect(() => {

        if (book == true) {
            
            console.log("beggining booking")
            setBook(false)
            if (user.id == "") {
                props.history.push("/login")
                return;
            }
            setRoomBookedDates([...roomBookedDates, ...userBookDates])
            const response = updateRoom(roomID, roomNumber, roomPrice, roomBedAmount, roomTags, roomBookedDates, userBookDates)
                .then(() => {
                    const newBooking = ({ room_ID: roomID, hotel_ID: hotelID, date_booked: userBookDates })
                    console.log(newBooking)
                    updateUser(user, newBooking, props)
                })
                
                
            
                
            
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
        const sameDay = function (d1, d2) {
            return d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();
        }
        while (tempStart <= end) {
            let isInRoomDates = false;
            roomBookedDates.forEach(date => {
                if (sameDay(tempStart, date)) {
                    isInRoomDates = true;
                    return;
                }
            })
            if (isInRoomDates == false) {
                datesList.push(tempStart)
            }
            
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
                    <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} minDate={new Date()} excludeDates={[...roomBookedDates]} selectsRange inline />
                   

                </div>

                <label> Total Price : {roomPrice * userBookDates.length} </label>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setBook(true); }}> Book Room </button>

            </form>
            
        </div>
    )
}

export default Room