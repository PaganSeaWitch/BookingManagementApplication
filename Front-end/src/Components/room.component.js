import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MdLocalHotel } from 'react-icons/md'
import { FaWheelchair } from 'react-icons/fa'
import { FaSmoking } from 'react-icons/fa'
import { MdRoomService } from 'react-icons/md'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Tooltip from '@material-ui/core/Tooltip';
import { FUNDING } from '@paypal/react-paypal-js'
import { PayPalButton } from "react-paypal-button-v2";

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
    components: 'marks,messages,buttons'
		};
		
		
	 
    useEffect(() => {

        
        let id = ""

        const page = window.location.href;
        const uri = process.env.REACT_APP_FRONT_END_SERVER_URI
        console.log(page)
        const currentPageType1 = "/room/"
        if (page != uri + currentPageType1) {
            id = page.substring(uri.length + currentPageType1.length)
            getRoom(id, setRoomNumber, setRoomPrice, setRoomBedAmount, setSuite, setHandicap, setSmoking, setRoomBookedDates, setHotelID, setHotelName, props);
            setRoomID(id);
        }
        else {
            props.history.push("/Dashboard")
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
			console.log("Tag.suite: " + suite + " Tag.handicap: " + handicap + " Tag.smoking: " + smoking);
			var tags = [];
			tags.push(suite); tags.push(handicap); tags.push(smoking);
            const response = updateRoom(roomID, roomNumber, roomPrice, roomBedAmount, tags, roomBookedDates, userBookDates)
                .then(() => {
					console.log("Room Updated, now updating the users booking");
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
		if(userBookDates.length > 0 && roomPrice > 0){ 
			console.log("Price Set: " + roomPrice* userBookDates.length);
			setAmount(roomPrice * userBookDates.length);
			setOrderID(false);
		}
	};
	

	
	const createOrder = function(data, actions) {
		
        return actions.order
            .create({
				intent: "CAPTURE",
                purchase_units: [
                    {
						description: "Room Booking Checkout",
                        amount: {
							currency_code: "USD",
                            value: amount
                        },
                    },
                ],
            })
            .then((orderID) => {
				console.log("order created: Total:$" + amount);
                setOrderID(orderID);
				console.log("Order ID: " + orderID);
                return orderID;
            });
    };
	
   const onApprove = async(data, actions) => {
	   const order = await actions.order.capture();
	   console.log("Successful order");
	  // e.preventDefault(); 
	   setBook(true); 
	   //actions.order.capture();
	
  }
	
	
   
	
	

    

   

    return (
        <div className='login-background'>
        <div className={"margin-50"}>
                <header className={"bold-center"}>{hotelName} {"Room: "}{roomNumber} </header>
        </div>
        <div className = 'room-page'>

                
           

            <form>

                
                    <div className={"label-center"}>
                        <label className={"important-label"}>Price : {roomPrice}$ </label>{"   "}
                        <label className={"important-label"}>Beds : {roomBedAmount} </label>
                    </div>
                    
                    <div className={"label-center"}>
                        <label className={"underlined"}>Book Range</label>
                    <DatePicker  onChange={onChange} startDate={startDate} endDate={endDate} minDate={new Date()} excludeDates={[...roomBookedDates]} selectsRange inline />
                   

                    </div>
                    <Tooltip title={suite ? "is a suite" : "is not a suite"} placement="right" arrow>
                        <label className={"room-page-icon"}>suite : {suite ? <MdRoomService style={{ color: 'green' }} /> : <MdRoomService style={{ color: 'red' }} />} </label>
                    </Tooltip>
                    <br></br>
                    <Tooltip title={suite ? "smoking is permitted" : "smoking is not permitted"} placement="right" arrow>
                        <label className={"room-page-icon"}>smoking permitted : {smoking ? <FaSmoking className={"icon"} style={{ color: 'green', hover: "no" }} /> : <FaSmoking className={"icon"} style={{ color: 'red' }} />} </label>
                    </Tooltip>
  
                    <br></br>
                    <Tooltip title={handicap ? "is handicap accessible" : "is not handicap accessible"} placement="right" arrow>
                        <label className={"room-page-icon"}>handicap accessible : {handicap ? <FaWheelchair className={"icon"} style={{ color: 'green' }} /> :  <FaWheelchair className={"icon"} style={{ color: 'red' }} />} </label>
                    </Tooltip>
                    <br></br>
                    <div className={"label-center"}>
                        <label className={"price"}> Total Price : {userBookDates.length == 0 ? roomPrice : roomPrice * userBookDates.length} </label>
                        <br></br>

                        
						<PayPalScriptProvider options={initialOptions}>
							<PayPalButton   onError={err => {console.log(err)}} style={{ layout: "horizontal"}} createOrder ={createOrder} forceReRender={[amount]} onApprove={onApprove}  />
						</PayPalScriptProvider>
				    </div>
                
                    <br></br>



            </form>
           
			
        </div>
		
		</div>
    )
}

export default Room