import { MdLocalHotel } from 'react-icons/md'
import { FaWheelchair } from 'react-icons/fa'
import { FaSmoking } from 'react-icons/fa'
import { MdRoomService} from 'react-icons/md'
const RoomListing = ({room, onClick,  props}) => {
	
	return (
		<form className={"room-listing"} onClick={() => onClick(room._id, props)} >
			<h1><MdLocalHotel className={"icon"} style={{ color: 'black',}}/> {" "}
				Room: {room.roomNumber} 
				
			</h1>
			<div>

				<h3>Information </h3>
				<div>
					<label>Price : {room.price}$</label>{" "}
					<label>Beds : {room.beds} </label>
				</div>

				<label>suite : {room.tags.suite ? <MdRoomService  style={{ color: 'green' }} /> : <MdRoomService  style={{ color: 'red' }} />} </label>
				<br></br>
				<label>smoking permitted : {room.tags.smoking ? <FaSmoking className={"icon"} style={{ color: 'green' }} /> : <FaSmoking className={"icon"}style={{ color: 'red' }} /> } </label>
				<br></br>
				<label>handicap accessible : {room.tags.handicap ? <FaWheelchair className={"icon"} style={{ color: 'green' }} /> : <FaWheelchair className={"icon"}style={{ color: 'red' }} />} </label>
				
			</div>
		</form>
			
		
)};

export default RoomListing