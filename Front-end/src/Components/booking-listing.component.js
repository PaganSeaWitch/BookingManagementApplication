import { FaHotel } from 'react-icons/fa'
import { useState, useEffect } from "react";
import { MdLocalHotel } from 'react-icons/md'
import { FaWheelchair } from 'react-icons/fa'
import { FaSmoking } from 'react-icons/fa'
import { MdRoomService } from 'react-icons/md'
import Tooltip from '@material-ui/core/Tooltip';

const BookingListing = ({ bookingID, hotel, room, onClick, props }) => {
	const [hotelName, setHotelName] = useState("");
	const [hotelNumber, setHotelNumber] = useState(0);
	const [hotelPrice, setHotelPrice] = useState(0);
	const [hotelBeds, setHotelBeds] = useState(0);
	const [smoking, setSmoking] = useState(false)
	const [handicap, setHandicap] = useState(false)
	const [suite, setSuite] = useState(false)
	useEffect(() => {
		
		hotel.then(response => {
			console.log(response)
			setHotelName(response.name)
		})
			.catch(err => console.log(err))

		room.then(response => {
			setHotelNumber(response.roomNumber);
			setHotelPrice(response.price);
			setHotelBeds(response.beds);
			setSmoking(response.tags.smoking)
			setHandicap(response.tags.handicap)
			setSuite(response.tags.suite)
		})
			.catch(err => console.log(err))
	},[]);
	return (
		<form className={"booking-listing"} onClick={() => onClick(bookingID, props)} >
			<h1><FaHotel className={"icon"} style={{ color: 'black', }} /> {" "}
				Hotel:{hotelName}
				<br></br>
				Room: {hotelNumber}

			</h1>
			<div>

				<h3>Information </h3>
				<div>
					<label>Price : {hotelPrice}$</label>{" "}
					<label>Beds : {hotelBeds} </label>
				</div>
				<Tooltip title={suite ? "is a suite" : "is not a suite"} placement="right" arrow>
					<label>suite : {suite ? <MdRoomService style={{ color: 'green' }} /> : <MdRoomService style={{ color: 'red' }} />} </label>
				</Tooltip>
				<br></br>
				<Tooltip title={suite ? "smoking is permitted" : "smoking is not permitted"} placement="right" arrow>
					<label>smoking permitted : {smoking ? <FaSmoking className={"icon"} style={{ color: 'green' }} /> : <FaSmoking className={"icon"} style={{ color: 'red' }} />} </label>
				</Tooltip>
				<br></br>
				<Tooltip title={handicap ? "is handicap accessible" : "is not handicap accessible"} placement="right" arrow>
					<label>handicap accessible : {handicap ? <FaWheelchair className={"icon"} style={{ color: 'green' }} /> : <FaWheelchair className={"icon"} style={{ color: 'red' }} />} </label>
				</Tooltip>
			</div>
		</form>
		)
}

export default BookingListing