import { MdLocalHotel } from 'react-icons/md'
import { FaWheelchair } from 'react-icons/fa'
import { FaSmoking } from 'react-icons/fa'
import { MdRoomService } from 'react-icons/md'
import Tooltip from '@material-ui/core/Tooltip';

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
				<Tooltip title={room.tags.suite ? "is a suite" : "is not a suite"} placement="right" arrow>

					<label>suite : {room.tags.suite ? <MdRoomService style={{ color: 'green' }} /> : <MdRoomService style={{ color: 'red' }} />} </label>
				</Tooltip>
				<br></br>
				<Tooltip title={room.tags.smoking ? "smoking is permitted" : "smoking is not permitted"} placement="right" arrow>

					<label>smoking permitted : {room.tags.smoking ? <FaSmoking className={"icon"} style={{ color: 'green' }} /> : <FaSmoking className={"icon"} style={{ color: 'red' }} />} </label>
				</Tooltip>
				<br></br>
				<Tooltip title={room.tags.handicap ? "is handicap accessible" : "is not handicap accessible"} placement="right" arrow>

					<label>handicap accessible : {room.tags.handicap ? <FaWheelchair className={"icon"} style={{ color: 'green' }} /> : <FaWheelchair className={"icon"} style={{ color: 'red' }} />} </label>
				</Tooltip>
			</div>
		</form>
			
		
)};

export default RoomListing