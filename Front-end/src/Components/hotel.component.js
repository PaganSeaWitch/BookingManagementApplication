import { useState, useEffect} from "react";
import RoomListing from "./room-listing.component";
import SimpleMap from "./google-map.component"
import ListRooms from "./list-rooms.component"
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect'; 
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import SendMessageDialogue from "./send-message-dialogue.component";
import { MdEmail } from 'react-icons/md'
import axios from "axios";
require('dotenv').config()
const backURI = process.env.REACT_APP_BACK_END_SERVER_URI

// JavaScript source code
const Hotel = ({ user, manager, getHotel, onRoomClick, props}) => {
    const [hotelName, setHotelName] = useState("");
    const [hotelLocation, setHotelLocation] = useState({
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        stateOrProvince: "",
        country: "",
        postalCode: "",
    });
    const [filter, setFilter] = useState("")
    const [filterOn, setFilterOn] = useState(false)
    const [rooms, setHotelRooms] = useState([])
    const [filteredRooms, setFilteredRooms] = useState([])
    const [search, setSearch] = useState("")
    const [sendMessage, setSendMessage] = useState(false)
    const [userNames, setUsernames] = useState("")
    useEffect(() => {

        const page = window.location.href;
        const uri = process.env.REACT_APP_FRONT_END_SERVER_URI

        const currentPageType1 = "/hotel/"
        let id = ""
        if (page != uri + currentPageType1 && hotelName == "") {
            id = page.substring(uri.length + currentPageType1.length)
            getHotel(id, setHotelLocation, setHotelName, setHotelRooms, props);
            axios.get(backURI + "/manager/getUsernameByHotel/" + id)
                .then(response => {
                    setUsernames(response.data)
                })
                .catch(err => { console.log(err) })
        }
        
        console.log(user)

    },[]);
    useEffect(() => {

        if (search.length == 0) {
            setFilterOn(false)
        }


    }, [search]);
    const filterList = (event) => {

        setFilter(event.target.value)
        setFilterOn(true)
        if (event.target.value == "handicap") {
            setFilteredRooms([...rooms.filter(function (room) {
                return room.tags.handicap == true
            })])
        }
        if (event.target.value == "suite") {
            setFilteredRooms([...rooms.filter(function (room) {
                return room.tags.suite == true
            })])
        }
        if (event.target.value == "smoking") {
            setFilteredRooms([...rooms.filter(function (room) {
                return room.tags.smoking == true
            })])
        }
        if (event.target.value == "") {
            setFilterOn(false);

        }
    }
    const BootstrapInput = withStyles((theme) => ({
        root: {
            margin: "0px 0px -200px 0px"
        },
        input: {
            borderRadius: 4,
            
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            
            
        },
    }))(InputBase);

    const startSearch = () => {
        if (filterOn == true) {
            setFilteredRooms([...filteredRooms.filter(function (room) {
                let roomName = room.roomNumber.toString();
                return roomName.includes(search);
            })])
        }
        else {
            setFilterOn(true)
            setFilteredRooms([...rooms.filter(function (room) {
                let roomName = room.roomNumber.toString();
                return roomName.includes(search);
            })])

        }
    }
        
    

    return (
		<div className = 'login-background'>
            <div className={"margin-50"}>
                <h1 className='bold-center'>{hotelName}</h1>
            </div>
            <form className = 'hotel-page'>

                <h1><MdEmail className={"message-icon"} style={{ color: 'black', }} onClick={() => { setSendMessage(true) }} /></h1>

                <div>

                    <h3>Address </h3>
                    <div>
                        <label> {hotelLocation.streetAddress1}{", "}{hotelLocation.streetAddress2.length == 0 ? "" : hotelLocation.streetAddress2 + ", "}{hotelLocation.city}{", "}{hotelLocation.stateOrProvince}{", "}{hotelLocation.country}{", "}{hotelLocation.postalCode} </label>

                    </div>
                    <SimpleMap location={hotelLocation} name={hotelName}/>



                </div>
                <h3> Available Rooms </h3>

            </form>
            <header className={"room-search"}>
                <NativeSelect
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={filter}
                    onChange={filterList}
                    input={<BootstrapInput />}
                >
                    <option value={""}>filter for</option>
                    <option value={"smoking"}>smoking permitted</option>
                    <option value={"handicap"}>handicap accessible</option>
                    <option value={"suite"}>is a suite</option>
                </NativeSelect>
                <input className={"search-bar"}
                    type='text'
                    value={search}
                    placeholder="search by room number"
                    onChange={(e) => { setSearch(e.target.value); }
                    } />
                
                <Button size="large" variant="contained" color="primary" onClick={(e) => { e.preventDefault(); startSearch(); }}>Search </Button>
                
            </header>
            {filterOn ? <ListRooms rooms={filteredRooms} onRoomClick={onRoomClick} props={props} /> : <ListRooms rooms={rooms} onRoomClick={onRoomClick} props={props} />}
            <SendMessageDialogue
                open={sendMessage}
                setOpen={setSendMessage}
                listOfUsernames={[userNames]}
                title="send a message"
                recipient={userNames}
                senderID={user._id + manager._id}
                sender={user.username + manager.username}>
            </SendMessageDialogue>
		</div>
    )
}

export default Hotel