import React from 'react';

const RoomListing = ({room, props}) => {
	
	
	return(
			<div style= {{marginBottom: '50px'}} >
                   <h1> room.roomNumber </h1>
				   
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