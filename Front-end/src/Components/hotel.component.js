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
    const [floor, setFloor] = useState(-1);
    const [updated, setUpdated] = useState(true)
    const [nameSort, setNameSort] = useState("");
    const [priceSort, setPriceSort] = useState("");

    const [nameSortOn, setNameSortOn] = useState(false)
    const [priceSortOn, setPriceSortOn] = useState(false)

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
                i = i + 1;
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
                let tempList = listOfFloors;
                tempList.push([floor, number])
                tempList.sort((floor1, floor2) => {
                    console.log(floor1)
                    if (floor1[1] > floor2[1]) {
                        return 1
                    }
                    if (floor[1] < floor2[2]) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                })
                setListOfFloors([...tempList])
            }
            
        })
        
    }, [rooms])


    


    useEffect(() => {

        if (floorFilterOn || tagFilterOn || searchFilterOn || priceSortOn || nameSortOn) {
            setFilterOn(true)
            setUpdated(false)
        }
        else {
            setFilterOn(false)
        }


    }, [floorFilterOn, tagFilterOn, searchFilterOn, priceSortOn, nameSortOn]);

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
            if (priceSortOn || nameSortOn) {
                tempRooms = sortList(tempRooms);
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
    

    const sortList = (tempRooms) => {
        return tempRooms.sort((room1, room2) => {
            let room1Number = Number(room1.roomNumber);
            let room2Number = Number(room2.roomNumber);
            let room1Price = Number(room1.price);
            let room2Price = Number(room2.price);
            let room1Floor = Math.floor(Number(room1.roomNumber) /100);
            let room2Floor = Math.floor(Number(room2.roomNumber)/100);
            if (nameSort === 'RMA') {
                if (priceSort != "") {
                    if (room1Floor > room2Floor) {
                        return -1;
                    }
                    if (room1Floor < room2Floor) {
                        return 1;
                    }
                }
                else {
                    if (room1Number > room2Number) {
                        return -1;
                    }
                    if (room1Number < room2Number) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                }
            }
            if (nameSort === 'RMD') {
                if (priceSort != "") {
                    if (room2Floor > room1Floor) {
                        return -1;
                    }
                    if (room2Floor < room1Floor) {
                        return 1;
                    }
                }
                else {
                    if (room2Number > room1Number) {
                        return -1;
                    }
                    if (room2Number < room1Number) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                }
            }
            if (priceSort === 'PA') {
               
                if (room1Price < room2Price) {
                     return -1;
                }
                if (room1Price > room2Price) {
                    return 1;
                 }
                    // a must be equal to b
                return 0;
               
            }
            if (priceSort === 'PD') {
                
                if (room1Price > room2Price) {
                    return -1;
                }
                if (room1Price < room2Price) {
                    return 1;
                }
                // a must be equal to b
                return 0;
                
            }
        })
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
    const onPriceSort = (event) => {
        setPriceSort(event.target.value)

        if (event.target.value == "") {
            setPriceSortOn(false);

        }
        else {
            if (priceSortOn) {
                setUpdated(false)
            }
            else {
                setPriceSortOn(true)

            }
        }
    }
    const onNameSort = (event) => {
        setNameSort(event.target.value)

        if (event.target.value == "") {
            setNameSortOn(false);

        }
        else {
            if (nameSortOn) {
                setUpdated(false)
            }
            else {
                setNameSortOn(true)

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
                    value={nameSort}
                    onChange={onNameSort}
                    input={<BootstrapInput />}
                >
                    <option value={""}>Stort by Room Floor</option>
                    <option value={"RMA"}>Room Floor Ascending</option>
                    <option value={"RMD"}>Room Floor Decending</option>
                </NativeSelect>
                <NativeSelect
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={priceSort}
                    onChange={onPriceSort}
                    input={<BootstrapInput />}
                >
                    <option value={""}>Stort by Price</option>
                    <option value={"PA"}>Price Ascending</option>
                    <option value={"PD"}>Price Decending</option>
                </NativeSelect>
                
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