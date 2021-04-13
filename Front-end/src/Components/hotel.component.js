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
    const [updated, setUpdated] = useState(true)
    const [refilter, setRefilter] = useState(false)
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
        if (searchFilterOn) {
            console.log(filteredRooms)
            setFilteredRooms([...filteredRooms.filter(function (room) {
                console.log(room)
                let roomName = room.roomNumber.toString();
                return roomName.includes(search);
            })])
        }
    }, [searchFilterOn])
    useEffect(() => {

        if (floorFilterOn == true || tagFilterOn == true || searchFilterOn == true) {
            setFilterOn(true)
            setUpdated(false)
        }
        else {
            setFilterOn(false)
        }


    }, [floorFilterOn, tagFilterOn, searchFilterOn]);

    useEffect(() => {
        console.log("updating")
        if (filterOn) {
            let tempRooms = rooms;
            if (floorFilterOn) {
                tempRooms = filterListByFloor(tempRooms);
            }
            if (tagFilterOn) {
                tempRooms = filterListByTags(tempRooms);
            }
            console.log(tempRooms)
            setFilteredRooms([...tempRooms])
            setUpdated(true)
        }
    }, [updated])
    
    const onTagFilter = (event) => {
        setTagFilter(event.target.value)
        
        if (event.target.value == "") {
            setTagFilterOn(false);

        }
        else {
            if (tagFilterOn) {
                setUpdated(false)
            }
            else {
                setTagFilterOn(true)

            }
            

        }
      
    }
    const filterListByTags = (tempRooms) => {

        if (tagFilter == "handicap") {
            return tempRooms.filter(function (room) {
                console.log(room)
                return room.tags.handicap == true
            })
        }
        if (tagFilter == "suite") {
            return tempRooms.filter(function (room) {
                return room.tags.suite == true
            })
        }
        if (tagFilter == "smoking") {
            return tempRooms.filter(function (room) {
                return room.tags.smoking == true
            })

        }
           
        return tempRooms;

    }

    const filterListByFloor = (tempRooms) => {

        console.log("filtering by floor")
        return tempRooms.filter(function (room) {
                let number = floor
                number = Number(number)
                console.log(number + 100)
                return room.roomNumber >= number && room.roomNumber < number + 100
            })
        
   
    }

    const handleFloorChange = (event) => {
        setFloor(event.target.value)
        
        console.log(event.target.value)
        if (event.target.value >= 0) {
            if (floorFilterOn) {
                setUpdated(false)
            }
            else {
                setFloorFilterOn(true)
            }
        }
        else {
            
            
            setFloorFilterOn(false)
            
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
                    onChange={onTagFilter}
                    input={<BootstrapInput />}
                >
                    <option value={""}>filter for</option>
                    <option value={"smoking"}>smoking permitted</option>
                    <option value={"handicap"}>handicap accessible</option>
                    <option value={"suite"}>is a suite</option>
                </NativeSelect>
                
                
                
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