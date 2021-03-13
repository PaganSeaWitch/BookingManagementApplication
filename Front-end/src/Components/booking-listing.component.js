import { BiArrowBack } from 'react-icons/bi'

const BookingListing = ({booking, hotel, room, onClick, props }) => {
    
	return (
		<div style={{ marginBottom: '50px' }} >

			<h1> Hotel:{hotel.name} Room: {room.roomNumber}
				<BiArrowBack
					style={{ color: 'green', cursor: 'pointer' }}
					onClick={() => onClick(booking._id, props)}

				/>
			</h1>
			<form>

				<h3>Information </h3>

				<label>Price : {room.price} </label>
				<br></br>
				<label>Beds : {room.beds} </label>
				<br></br>


			</form>
		</div>
		)
}

export default BookingListing