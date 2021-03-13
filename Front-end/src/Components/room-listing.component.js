import { BiArrowBack } from 'react-icons/bi'

const RoomListing = ({room, onClick,  props}) => {
	
	console.log(room)
	return(
			<div style= {{marginBottom: '50px'}} >
			<h1> Room: {room.roomNumber} 
				   <BiArrowBack
						style={{ color: 'green', cursor: 'pointer' }}
						onClick={() => onClick(room._id, props)}

				/>
				</h1>
				 <form>

					<h3>Information </h3>

					<label>Price : {room.price} </label>
					<br></br>
					<label>Beds : {room.beds} </label>
					<br></br>
					<label>Available? : {room.booked} </label>
					<br></br>
					
				</form>
            </div>
			
		
)};

export default RoomListing