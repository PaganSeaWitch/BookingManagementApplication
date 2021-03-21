import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Room = ({user, getRoom, updateRoom, updateUser, props}) => {
	const [hotelID, setHotelID] = useState("")
	const [hotelName, setHotelName] = useState("")
	const [roomNumber, setRoomNumber] = useState("")
	const [roomPrice, setRoomPrice] = useState(0)
	const [roomBedAmount, setRoomBedAmount] = useState(0)
    const [smoking, setSmoking] = useState(false);
    const [handicap, setHandicap] = useState(false);
    const [suite, setSuite] = useState(false);
    const [roomBookedDates, setRoomBookedDates] = useState([])
	
	const [userBookDates, setUserBookedDates] = useState([])
	const [book, setBook] = useState(false)
	const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomID, setRoomID] = useState("")
	
	const [amount, setAmount] = useState(2);
	const [orderID, setOrderID] = useState(false);
	const initialOptions = {
    "client-id": "Ab5MP34Strn8xQq7h-Fgt0mLAbacBJVtiYhIGtIEbf738lE2LnKvJ7QLKYnCaCSaDj1f_LsNpmyrcNw_",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
		};
		
		
	 
  useEffect(() => {

        
        let id = ""

        const page = window.location.href;
        const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
        console.log(page)
        const currentPageType1 = "/room/"
        if (page != uri + currentPageType1 && hotelName == "") {
            id = page.substring(uri.length + currentPageType1.length)
            getRoom(id, setRoomNumber, setRoomPrice, setRoomBedAmount, setSuite, setHandicap, setSmoking, setRoomBookedDates, setHotelID, setHotelName, props);
            setRoomID(id);
        }


    }, []);
		useEffect(() => {
		console.log("This is being used");
        if (book == true) {
            
            console.log("beggining booking")
            setBook(false)
            if (user.id == "") {
                props.history.push("/login")
                return;
            }
            setRoomBookedDates([...roomBookedDates, ...userBookDates])
            const response = updateRoom(roomID, roomNumber, roomPrice, roomBedAmount, suite, handicap, smoking, roomBookedDates, userBookDates)
                .then(() => {
                    const newBooking = ({ room_ID: roomID, hotel_ID: hotelID, dates_booked: userBookDates })
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
		setAmount(roomPrice * userBookDates.length);
		setOrderID(false);
	};
	
	const createOrder = function(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: amount,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };
	
	
	
	

    

   

    return (
		<div className = 'login-background'>
        <div className = 'hotel-listing'>

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
                <br></br>
                <div>
                    <label>Book range</label>
                    <DatePicker  onChange={onChange} startDate={startDate} endDate={endDate} minDate={new Date()} excludeDates={[...roomBookedDates]} selectsRange inline />
                   

                </div>


                <label> Total Price : {userBookDates.length == 0 ? roomPrice : roomPrice * userBookDates.length} </label>
				
				<br></br>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setBook(true); }}> Book Room </button>
				<br></br>
			


            </form>
           <PayPalScriptProvider options={initialOptions}>
				<PayPalButtons style={{ layout: "horizontal"}} createOrder ={createOrder}  onApprove={(e) => {e.preventDefault(); setBook(true); forceReRender={amount} }}   />
			</PayPalScriptProvider>
			
        </div>
		
		</div>
    )
}

export default Room