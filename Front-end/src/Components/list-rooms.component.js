import RoomListing from "./room-listing.component";

const ListRooms = ({ rooms, onRoomClick, props }) => {

    let roomListings = rooms.slice()

    console.log(rooms)

    return (
        <div className={"room-listing-container"}>
            {roomListings.map((room, index) => <RoomListing key={index} room={room} onClick={onRoomClick} props={props} />)}
        </div>
    )
}

export default ListRooms
