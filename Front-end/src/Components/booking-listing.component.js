import { BiArrowBack } from 'react-icons/bi'
import { useState, useEffect } from "react";

const BookingListing = ({ bookingID, hotel, room, onClick, props }) => {
	const [hotelName, setHotelName] = useState("");
	const [hotelNumber, setHotelNumber] = useState(0);
	const [hotelPrice, setHotelPrice] = useState(0);
	const [hotelBeds, setHotelBeds] = useState(0);
	
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
		})
			.catch(err => console.log(err))
	},[]);
	return (
		<div className = 'hotel-page'>

			<h1> Hotel:{hotelName} Room: {hotelNumber}
				<BiArrowBack
					style={{ color: 'green', cursor: 'pointer' }}
					onClick={() => onClick(bookingID, props)}

				/>
			</h1>
			<form>

				<h3>Information </h3>
				<div>
					<label>Price : {hotelPrice}$ </label>
					<label>Beds : {hotelBeds} </label>
				</div>


			</form>
		</div>
		)
}

export default BookingListing