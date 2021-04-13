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
    const [tagFilter, setTagFilter] = useState("")
    const [filterOn, setFilterOn] = useState(false)
    const [rooms, setHotelRooms] = useState([])
    const [filteredRooms, setFilteredRooms] = useState([])
    const [search, setSearch] = useState("")
    const [tagFilterOn, setTagFilterOn] = useState(false)
    const [floorFilterOn, setFloorFilterOn] = useState(false)
    const [searchFilterOn, setSearchFilterOn] = useState(false)

    const [sendMessage, setSendMessage] = useState(false)
    const [userNames, setUsernames] = useState("")
    const [listOfFloors, setListOfFloors] = useState([["filter by floor", -1]])
    const [floor, setFloor] = useState(0);
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

    }, []);

    useEffect(() => {
        console.log(rooms)
        rooms.forEach(room => {
            let i = 0;
            console.log(room.roomNumber)
            while (room.roomNumber > i) {
                i = i + 10;
            }
            console.log(i);
            let number = Math.floor((i / 100));
            let floor = ""
            if (number == 0) {
                 floor = "ground floor"
            }
            if (number == 1) {
                floor = number + "st floor"
            }
            if (number == 2) {
                floor = number + "nd floor"
            }
            if (number == 3) {
                floor = number + "rd floor"
            }
            if (number > 3) {
                floor = number + "st floor"
            }
            number = number * 100;
            if (listOfFloors.find(floor => floor[1] == number) == undefined) {
                setListOfFloors([...listOfFloors, [floor, number]])
            }
        })
    }, [rooms])

    useEffect(() => {

        if (search.length == 0) {
            setSearchFilterOn(false)
        }


    }, [search]);
    useEffect(() => {

        if (floorFilterOn == true || tagFilterOn == true || searchFilterOn == true) {
            setFilterOn(true)
        }
        else {
            setFilterOn(false)
        }


    }, [floorFilterOn, tagFilterOn, searchFilterOn]);
    const onfilterList = (event) => {

        setTagFilter(event.target.value)
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
            setTagFilterOn(false);
            floorFilter()

        }
    }
    const filterList = () => {
        if (tagFilter == "handicap") {
            setFilteredRooms([...rooms.filter(function (room) {
                return room.tags.handicap == true
            })])
        }
        if (tagFilter == "suite") {
            setFilteredRooms([...rooms.filter(function (room) {
                return room.tags.suite == true
            })])
        }
        if (tagFilter == "smoking") {
            setFilteredRooms([...rooms.filter(function (room) {
                return room.tags.smoking == true
            })])
        }
        if (tagFilter == "") {
            setTagFilterOn(false);
                floorFilter()
        }
    }
    const floorFilter = () => {
        console.log("floor filtering")
        if (floor >= 0) {
            if (tagFilterOn || searchFilterOn) {
                setFloorFilterOn(true);
                setFilteredRooms([...filteredRooms.filter(function (room) {
                    let number = floor
                    number = Number(number)
                    console.log(number + 100)
                    return room.roomNumber >= number && room.roomNumber < number + 100
                })])
            }
            else {
                setFloorFilterOn(true);
                setFilteredRooms([...rooms.filter(function (room) {
                    let number = floor
                    number = Number(number)
                    console.log(number + 100)
                    return room.roomNumber >= number && room.roomNumber < number + 100
                })])
            }
        }
    }
    const handleFloorChange = (event) => {
        setFloor(event.target.value)
        console.log(event.target.value)
        if (event.target.value >= 0) {
            if (tagFilterOn || searchFilterOn) {
                setFilteredRooms([...filteredRooms.filter(function (room) {
                    
                    let number = event.target.value
                    number = Number(number)
                    console.log(number + 100)
                    return room.roomNumber >= number && room.roomNumber < number + 100

                })])
            }
            else {
                setFloorFilterOn(true);
                setFilteredRooms([...rooms.filter(function (room) {
                    let number = event.target.value
                    number = Number(number)
                    console.log(number + 100)
                    return room.roomNumber >= number && room.roomNumber < number + 100
                })])
            }
        }
        else {
            if (tagFilterOn) {
                filterList();
            }
            else {
                setFloorFilterOn(false)
                console.log("ended floor filter")
            }
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
            setSearchFilterOn(true)
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
                    labelId="usernames-label"
                    id="multiple-usernames"
                    value={floor}
                    onChange={handleFloorChange}
                    input={<BootstrapInput />}

                >
                    {listOfFloors.map((floor) => (
                        <option key={floor} value={floor[1]} >
                            {floor[0]}
                        </option>
                    ))}
                </NativeSelect>
                <NativeSelect
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={tagFilter}
                    onChange={onfilterList}
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