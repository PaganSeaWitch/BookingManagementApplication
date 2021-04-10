import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import NavBar from "./Components/navbar.component";
import axios from "axios";
import User from "./Components/user.component";
import Login from "./Components/login.component";
import CreateUser from "./Components/create-user.component";
import Manager from "./Components/manager.component";
import Dashboard from "./Components/dashboard.component";
import SplashPage from "./Components/splashPage.component";
import ForgotPassword from "./Components/forgot-password.component";
import ResetPassword from "./Components/reset-password.component";
import Hotel from "./Components/hotel.component";
import Room from "./Components/room.component";
import CreateRoom from "./Components/create-room.component";
import EditRooms from "./Components/edit-rooms.component";
import EditRoom from "./Components/edit-room.component";
import Bookings from "./Components/bookings.component";
import Booking from "./Components/booking.component";
import Messages from "./Components/messages.component";
const rug = require('random-username-generator');
require('dotenv').config()


const App = () => {

    const [user, setUser] = useState({
        _id: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        bookings: []
    })
    const [manager, setManager] = useState({
        _id: "",
        username: "",
        password: "",
        email: "",
        hotel_ID: ""

    })
	
	
    const [hotels, setHotels] = useState([])
	const [cities, setCities] = useState([])
	const [filter, setFilter] = useState("")
	//const [roomPrices, setRoomPrices] = useState([])
    const uri = process.env.REACT_APP_BACK_END_SERVER_URI
    console.log(uri)
    const logOut = () => {
        resetManager();
        resetUser();

    }

    //this happpens at the start of the apps life cycle
    useEffect(() => {
        console.log("LOGGING IN ACCIYNT")
        const loggedInUser = localStorage.getItem('LoggedInUser');
        if (loggedInUser && user.username == "") {
            const userJSON = JSON.parse(loggedInUser);
            setUserStateWithoutPassword(userJSON);
            console.log(userJSON);
        }

        const loggedInManager = localStorage.getItem('LoggedInManager');
        if (loggedInManager && manager.username == "") {
            const managerJSON = JSON.parse(loggedInManager);
            setManagerStateWithoutPassword(managerJSON);
            console.log(managerJSON);
        }
        if (hotels.length == 0) {
            getHotels();
        }
		

    }, [])


	
	
	const calculateCities = (hotelList) => {
		var inArray = false;
		var numLocations = 1;
		var cityName = "";
		var totalPrice = 0;
		var numRooms = 0;
		var tempCities = [];
		var avgPrice = 0;
			
			hotelList.forEach(hotel =>{
				//console.log("Entered hotel loop");
	
				tempCities.forEach(city => {
					if(city.localeCompare(hotel.location.city) == 0){
					//	console.log("City already added: " + hotel.location.city);
						inArray=true;
					}
				})
				
				/*hotel.room_IDs.forEach(roomID => {
					getRoomsData(roomID).then( response => {
						if (response.data != null) {
							totalPrice += response.data.price;
							numRooms++;
						}
					})
				})
				*/
				/* for(const roomID of hotel.room_IDs){
					 roomData(roomID).then( response => {
						if (response.data != null) {
							totalPrice += response.data.price;
							numRooms++;
						}
					})
				}
				*/
				console.log("New Total Price: " + totalPrice + " New numRooms: " + numRooms);
				
				if(inArray){
						updateCity(hotel.location.city, numLocations, avgPrice, numRooms, totalPrice);
						console.log("Updating: " + hotel.location.city + " 1 " + "0 " + numRooms + " " + totalPrice);
						
				}
				else{
						addCity(hotel.location.city, numLocations, avgPrice, numRooms, totalPrice);
						tempCities.push(hotel.location.city);
						console.log("City added: " + hotel.location.city);
				}
				
				numLocations = 0;
				totalPrice = 0; 
				numRooms = 0;
				inArray = false;
				
			})
			
		getCities();
	}
	
	async function roomData(roomID){
		var price = await getRoomsData(roomID)
	}
	
	const getRoomsData = (roomID) => {
			return axios.get(uri + "/room/getRoomByID/" + roomID)
					.then(response => {
						return response;
					})
	}
	
	const addCity = (cityName, numLocations, avgPrice, numRooms, totalPrice) => {
		 const city = ({ name: cityName, numLocations: numLocations, avgPrice:avgPrice, numRooms:numRooms, totalPrice:totalPrice})
                                axios.post(uri + "/city/addCity", city)
                                    .then(response => {
                                        //setCities([...cities, cityResponse.data])
                                        console.log("City Name: " + city.name + " " + city.avgPrice + " " + city.numRooms + " " + city.totalPrice);
                                    
                                    })
                                    .catch(err => console.log("Error adding city client: " + err));
	}
	const updateCity = (cityName, numLocs, avgPrice, numRoom, totalPri) => {
        const updatedCity = ({ name: cityName, numLocations: numLocs, avgPrice:(totalPri/numRoom), numRooms:numRoom, totalPrice:totalPri})
        axios.post(uri + "/city/updateCity", updatedCity)
            .then(response => { console.log("City updated"); })
            .catch(err => { console.log("Error at update city client: " + err);  });
    }
	
	
	
	
    const getHotels = () => {
        //console.log(uri)
        axios.get(uri + "/hotel/allHotels")
            .then(response => {
                setHotels(response.data);
				calculateCities(response.data);
				
            })
            .catch(err => console.log(err))
        }
	
	const getCities = () => {
        axios.get(uri + "/city/allCities")
            .then(response => {
                setCities(response.data)
				console.log("Cities length: " + response.data.length);
            })
            .catch(err => console.log("Error at getting list of cities"))
	
	}

    const getRooms = (roomIDList, setRooms) => {
        let roomTemp = []
         roomIDList.forEach(roomID => {
            console.log(roomID)
            axios.get(uri + "/room/getRoomByID/" + roomID)
                .then(response => {
                    if (response.data != null) {
                        roomTemp.push(response.data)
                        setRooms([...roomTemp])
                    }
                })
                .catch(err => console.log(err))
        })
        console.log(roomTemp)
        setRooms(roomTemp);
        setRooms([...roomTemp])

    }


    const onRoomClick = (id, props) => {
        props.history.push("/room/" + id)

    }
    const onEditRoomClick = (id, props) => {
        props.history.push("/editRoom/" + id)
    }

    const onBookingClick = (id, props) => {
        console.log(id)
        props.history.push("/booking/" + id)
    }
	
	const onCityClick = (city, props) => {
		//console.log(id) 
		setFilter(city.name);
		props.history.push("/dashboard/filtered");
	
	}
	
	
    const addRoom = (hotel_id, roomNumber, roomPrice, roomBedAmount, roomTags, props) => {
        const newRoom = ({ roomNumber, price: roomPrice, beds: roomBedAmount, tags:roomTags, bookedDates:[] })
        axios.post(uri + "/room/addRoom", newRoom)
            .then(response => {
                const hotelUpdate = ({id:hotel_id, roomId: response.data._id })
                axios.post(uri + "/hotel/updateRoomsForHotel", hotelUpdate)
                    .then(()=>{ alert("Room has been created!"); props.history.push("/editRooms")})
                    .catch(err => { console.log(err); return })
                
            })
            
    }

    const getHotelForRoom =(room_id, setHotelId, setHotelName, props) => {
        axios.get(uri + "/hotel/getHotelByRoomID/" + room_id)
            .then(response => {
                if (response == null) {
                    alert("Hotel for rooom does not exist!")
                    //axios.delete(uri + "/room/deleteByRoomID/" + room_id)
                    props.history.push("/")
                }
                else {
                    setHotelId(response.data._id);
                    setHotelName(response.data.name);
                }
            })
            .catch(err => console.log(err))
    }

    const getRoom = (room_id, setRoomNumber, setRoomPrice, setRoomBedAmount, setSuite, setHandicap, setSmoking, setRoomBookedDates, setHotelId, setHotelName, props) => {
        console.log("Getting Room!")
        axios.get(uri + "/room/getRoomByID/" + room_id)
            .then(response => {
                if (response == null) {
                    props.history.push("/")
                }
                else {
                    setRoomNumber(response.data.roomNumber);
                    setRoomPrice(response.data.price);
                    setRoomBedAmount(response.data.beds);
                    setSuite(response.data.tags.suite);
                    setHandicap(response.data.tags.handicap);
                    setSmoking(response.data.tags.smoking);
                    const tempDateList = []
                    response.data.booked_dates.forEach(booked => {
                        let tempDate = new Date(booked);
                        console.log(tempDate)
                        tempDateList.push(tempDate);
                    })
                    setRoomBookedDates([...tempDateList]);

                    getHotelForRoom(room_id, setHotelId, setHotelName, props)
                }
            })
            .catch(err => { console.log(err); props.history.push("/") })
    }

    const getRoomForManger = (room_id, setRoomNumber, setRoomPrice, setRoomBedAmount, setSuite, setHandicap, setSmoking, props) => {
        axios.get(uri + "/room/getRoomByID/" + room_id)
            .then(response => {
                if (response == null) {
                    props.history.push("/")
                }
                else {
                    setRoomNumber(response.data.roomNumber);
                    setRoomPrice(response.data.price);
                    setRoomBedAmount(response.data.beds);
                    setSuite(response.data.tags.suite);
                    setHandicap(response.data.tags.handicap);
                    setSmoking(response.data.tags.smoking);
                }
            })
            .catch(err => { console.log(err); props.history.push("/") })
    }


    const getHotel =  (hotel_id, setHotelLocation, setHotelName, setHotelRooms, props) => {
        console.log("Getting hotel!")
        axios.get(uri + "/hotel/getHotelByID/" + hotel_id)
            .then(response => {
                if (response == null) {
                    props.history.push("/dashboard")
                }
                else {
                    setHotelName(response.data.name);
                    setHotelLocation({
                        streetAddress1: response.data.location.streetAddress1,
                        streetAddress2: response.data.location.streetAddress2,
                        city: response.data.location.city,
                        stateOrProvince: response.data.location.stateOrProvince,
                        country: response.data.location.country,
                        postalCode: response.data.location.postalCode
                    });
                    getRooms(response.data.room_IDs, setHotelRooms)
                        
                }
            })
            .catch(err => { console.log(err);props.history.push("/") })
    }

    const getHotelForBookings = async (hotel_id) => {
        let hotel = ({})
       await axios.get(uri + "/hotel/getHotelByID/" + hotel_id)
           .then(response => {
                if (response == null) {
                    const defaultHotel= ({ name: "Default"})
                    hotel = defaultHotel;                }
                else {
                     hotel = response.data;
                }
            })
           .catch(err => { console.log(err); hotel = ({ name: "Default" }); ; })

        return hotel

    }

    const getRoomForBookings = async (room_id) => {
        let room = ({})

        await axios.get(uri + "/room/getRoomByID/" + room_id)
            .then(response => {
                console.log(response.data)
                if (response == null) {
                    const defaultRoom = ({ roomNumber: 0, beds: 0, price: 0 })
                    room =  defaultRoom;
                }
                else {
                    room =  response.data;
                }
            })
            .catch(err => { console.log(err); room = ({ roomNumber: 0, beds: 0, price: 0 });})
        return room;
    }

    const getHotelForManager = (hotel_id, setHoteLocation, setHotelName, hotelLocation) => {
        console.log("using the getHotel fuctnion")
        axios.get(uri + "/hotel/getHotelByID/" + hotel_id)
            .then(response => {
                if (response != null) {
                    setHotelName(response.data.name);
                    setHoteLocation({
                        ...hotelLocation,
                        streetAddress1: response.data.location.streetAddress1,
                        streetAddress2: response.data.location.streetAddress2,
                        city: response.data.location.city,
                        stateOrProvince: response.data.location.stateOrProvince,
                        country: response.data.location.country,
                        postalCode:response.data.location.postalCode
                    });
                    console.log(response.data.location)
                }
            })
            .catch(err => {return ""})
    }
	
    const resetManager = () => {
        setManager({
            ...manager,
            _id: "",
            username: "",
            password: "",
            email: "",
            hotel_ID: ""
        })
    }

    const resetUser = () => {
        setUser({
            ...user,
            _id: "",
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            bookings: []
        });
        localStorage.clear();
    }

    const setManagerStateWithoutPassword = (response) => {
        setManager({
            ...manager,
            _id: response._id,
            username: response.username,
            password: response.password,
            email: response.email,
            hotel_ID : response.hotel_ID
        });

        console.log(response);
    }

    const setUserStateWithoutPassword = (response) => {
        if (response.password != undefined) {
            setUser({
                ...user,
                _id: response._id,
                username: response.username,
                password: response.password,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                bookings: response.bookings
            });
        }
        else {
            setUser({
                ...user,
                _id: response._id,
                username: response.username,
                password: "",
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                bookings: response.bookings
            });
        }
        
        
        console.log(response);
    }

    const updateManager = async (manager, username, password, email, hotelName, hotelLocation, setWarning) => {
        const hotel = { id: manager.hotel_ID, name: hotelName, location: hotelLocation, rooms: [] }

        const updatedManager = { id: manager._id, username: username, password: password, email: email, hotel_ID: manager.hotel_ID };

        if (manager.email != email) {
            axios.get(uri + "/email/checkEmail/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen is not valid, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/user/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/manager/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
        }
        if (manager.username == username) {

            axios.post(uri + "/manager/update/", updatedManager)
                .then(response => { setManagerState(response, password); setWarning(""); })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.post(uri + "/hotel/updateHotel/", hotel)
        }
        else{
            axios.get(uri + "/manager/checkIfUsernameExists/" + username)
                .then(response => {
                    if (response.data.length == 2){
                        axios.post(uri + "/manager/update/", updatedManager)
                            .then(response => { setManagerState(response, password); setWarning(""); })
                            .catch(err => { console.log(err); alert("changes were not saved!") });
                        axios.post(uri + "/hotel/updateHotel/", hotel)

                    }
                    else
                    {
                        alert("The username you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });

        };
    };

    const updateUser = async (user, username, password, email, firstName, lastName, setWarning) =>
    {
        const updatedUser = { id:user._id, username, password, email, firstName, lastName };
        if (user.email != email) {
            axios.get(uri + "/email/checkEmail/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen is not valid, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/user/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
            axios.get(uri + "/manager/checkIfEmailExists/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken, changes were not saved!");
                        return;
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
        }
        
        if (user.username == username) {
            
            axios.post(uri + "/user/update/", updatedUser)
                .then(response => {setUserState(response, password); setWarning(""); })
                .catch(err => { console.log(err); alert("changes were not saved!") });

        }
        else {
           
            axios.get(uri + "/user/checkIfUsernameExists/" + username)
                .then(response => {
                    console.log(response);
                    if (response.data.length == 2) {
                        axios.post(uri + "/user/update/", updatedUser)
                            .then(response => {setUserState(response, password);setWarning("");})
                            .catch(err => { console.log(err); alert("changes were not saved!") });
                    }
                    else {
                        alert("The username you have chosen has already been taken, changes were not saved!");
                    }
                })
                .catch(err => { console.log(err); alert("changes were not saved!") });
        };
        console.log(updatedUser.username);
    };

    const updateUserBookings = (user, newBooking, props) =>{
        const updateBooking = ({ id: user._id, booking: newBooking })
        console.log(user.password)
        console.log("begining user update")
        axios.post(uri + "/user/updateBookings/", updateBooking)
            .then(response => { setUserState(response, user.password); props.history.push("/bookings"); })
            .catch(err => { console.log(err); alert("booking was not saved!"); return; });
        console.log("end user update")

    }

    const updateRoomBookings = async (id, roomNumber, roomPrice, roomBedAmount ,roomTags, bookedDates, newDates) => {
        
        let response = false;
        console.log(id);
        const updatedRoom = ({ roomID: id, roomNumber, roomPrice, roomAmountBeds : roomBedAmount, roomTags, dates: newDates })
        await axios.post(uri + "/room/updateRoom", updatedRoom)
            .then(() => { return true; })
            .catch(err => { console.log(err); alert("booking not done were not saved!"); response = false; });
       
    }

    const updatePassword = (password, id, props) => {
        console.log(id)
        axios.get(uri + "/email/AccountRecovery/getById/" + id)
            .then(accountTypeResponse => {
                if (accountTypeResponse.data.accountType == "user") {
                    const newPassword = ({ account_id: accountTypeResponse.data.account_id, password})
                    axios.post(uri + "/user/updatePassword/", newPassword)
                        .then(updatePasswordResponse => {
                            console.log(updatePasswordResponse.data)
                            props.history.push("/login")
                            axios.delete(uri + "/email/AccountRecovery/DeleteAllByEmail/" + accountTypeResponse.data.email)
                                .then(console.log("deleted all"))
                                .catch(err => { console.log(err); alert("recovery deletes failed!"); })
                        })
                        .catch(err => { console.log(err); alert("password reset failed!"); })
                }
                if (accountTypeResponse.data.accountType == "manager") {
                    const newPassword = ({ account_id: accountTypeResponse.data.account_id, password })
                    axios.post(uri + "/manager/updatePassword/", newPassword)
                        .then(updatePasswordResponse => {
                            console.log(updatePasswordResponse.data)
                            props.history.push("/login")
                            axios.delete(uri + "/email/AccountRecovery/DeleteAllByEmail/" + accountTypeResponse.data.email)
                                .then(console.log("deleted all"))
                                .catch(err => { console.log(err); alert("recovery deletes failed!"); })
                        })
                        .catch(err => { console.log(err); alert("password reset failed!"); })
                }
            })
            .catch(err => { console.log(err); alert("password reset failed!");})
    }

    const updateRoom = (roomID, roomNumber, roomPrice, roomAmountBeds, roomTags, props) => {
        const updatedRoom = ({ roomID, roomNumber, roomPrice, roomAmountBeds, roomTags })
        axios.post(uri + "/room/updateRoom", updatedRoom)
            .then(response => { alert("changes were saved!"); props.history.push("/editRooms")  })
            .catch(err => { console.log(err); alert("changes were not saved!") });
    }

    const checkUser = (givenUsername, givenPassword, props) => {
        axios.get(uri + "/user/getByUsername/", {
            params: {
                username: givenUsername,
                password: givenPassword
            }
        })
            .then(response =>
            {
                setUserState(response, givenPassword);
                props.history.push('/user');
            })
            .catch(err => alert("Login error!"));
    };

    const createUser = async (username, password, email, firstName, lastName, props) =>
    {
        
            
        axios.get(uri + "/user/checkIfEmailExits/" + email)
            .then(response => {
                if (response.data.length == 3) {
                    alert("The email you have chosen has already been taken");
                    return
                }
        })
            .catch(err => { console.log(err); alert("user email check error!") });

        axios.get(uri + "/manager/checkIfEmailExits/" + email)
            .then(response => {
                if (response.data.length == 3) {
                    alert("The email you have chosen has already been taken");
                    return
                }
        })
                .catch(err => { console.log(err); alert("manager email check error!") });
        
        axios.get(uri + "/email/checkEmail/" + email)
            .then(response => {
                console.log(response.data);
                if (response.data == "yes") {
                    axios.get(uri + "/user/checkIfUsernameExists/" + username)
                        .then(response => {
                            console.log(response.data)
                            if (response.data == "yes") {
                                alert("This username already exists! Please choose another one");
                                return;
                            }
                            else {
                                const newUser = { username, password, email, firstName, lastName };
                                axios.post(uri + "/user/add", newUser)
                                    .then(response => { setUserState(response, password); alert("user created!"); props.history.push("/user"); })
                                    .catch(err => console.log("failed Add: " + err));

                            }
                        })
                        .catch(err => { console.log("failed check: " + err); });
                }
                else {
                    alert("This email doesn't exist! Please choose another one")
                    return;
                }

            })
            .catch(err => console.log("failed emailCheck: " + err));
    }

    const googleLogin = async (google_id, firstName, lastName, email, props) => {
        let exists = true;

        await axios.get(uri + "/user/checkIfIdExists/" + google_id)
            .then(response => {
                if (response.data.length == 3) {
                    axios.get(uri + "/user/getById/" + google_id)
                        .then(response => {
                            setUserStateWithoutPassword(response.data);
                            props.history.push("/user")
                        })
                        .catch(err => { console.log(err); alert("google Login error!") });

                }
                else {
                    exists = false;

                }
            })
            .catch(err => {
                exists = false;
            });
        console.log(exists)
        if (exists == false) {
            let randomUsername = rug.generate();
            console.log(randomUsername)
            let isUnique = false
            while (isUnique == false) {
                await axios.get(uri + "/user/checkIfUsernameExists/" + randomUsername)
                    .then(response => {
                        if (response.data.length == 2) {
                            isUnique = true;
                        }
                        console.log(randomUsername)
                    })
                    .catch(err => { console.log(err); alert("Google login error!") });
                randomUsername = rug.generate();
            }
           await axios.get(uri + "/user/checkIfEmailExits/" + email)
                .then(response => {
                    if (response.data.length == 3) {
                        alert("The email you have chosen has already been taken");
                        return
                    }
                })
                .catch(err => { console.log(err); alert("An accout already has this email!") });
            const newUser = ({ _id: google_id, username: randomUsername, password: "default", firstName, lastName, email })
            axios.post(uri + "/user/addGoogle", newUser)
                .then(response => { console.log("LETS GO"); setUserState(response, "default"); alert("user created!"); props.history.push("/user"); })
               .catch(err => console.log("failed Add: " + err));
        }
        

                
    }

    const setUserState = (response, givenPassword) =>
    {
        console.log("SETTING STATE");
        setUser(user => ({
            ...user,
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            bookings: response.data.bookings
        }));
        const jsonOjb = {
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            bookings: response.data.bookings
        }
        const json = JSON.stringify(jsonOjb);
        console.log(user);
        console.log("JSON OF STRINGS: " + json);
        localStorage.setItem('LoggedInUser', json);
        
    }

    const setManagerState = (response, givenPassword) => {
        console.log("SETTING STATE");

        setManager({
            ...manager,
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            email: response.data.email,
            hotel_ID: response.data.hotel_ID,
        });
        const jsonManagerOjb = {
            _id: response.data._id,
            username: response.data.username,
            password: givenPassword,
            email : response.data.email,
            hotel_ID: response.data.hotel_ID,
        }
        const jsonManager = JSON.stringify(jsonManagerOjb);
        console.log("JSON OF STRINGS: " + jsonManager);
        localStorage.setItem('LoggedInManager', jsonManager);
    }

    const createManager = (username, password, email, hotelName, hotelLocation, imageURL, props) =>
    {
        axios.get(uri + "/email/checkEmail/" + email)
            .then(response => {
                console.log(response.data);
                if (response.data == "yes") {
                    axios.get(uri + "/manager/checkIfUsernameExists/" + username)
                        .then(response => {
                            console.log(response.data)
                            if (response.data == "yes") {
                                alert("This username already exists! Please choose another one");
                                return;
                            }
                            else
                            {
                                const hotel = { name: hotelName, location: hotelLocation, rooms: [] }
                                axios.post(uri + "/hotel/addHotel", hotel)
                                    .then(hotelResponse => {
                                        setHotels([...hotels, hotelResponse.data])
                                        console.log(hotelResponse.data)
                                        const newManager = {  username, password, email, hotel_ID: hotelResponse.data._id, imageURL }
                                        axios.post(uri + "/manager/add", newManager)
                                            .then(response => { setManagerState(response, password); alert("manager created!"); props.history.push("/manager"); })
                                            .catch(err => alert("Coudln't create account!"));
                                    })
                                    .catch(err => alert("Coudln't create account!"));

                            }
                        }) 
                        .catch(err => alert("Coudln't create account!"));

                }
                else {
                    alert("This email doesn't exist! Please choose another one")
                    return;
                }
                
            })
            .catch(err => console.log("failed Add: " + err));
        
    }

    const checkManager = (givenUsername, givenPassword, props) => {
        axios.get(uri + "/manager/getByUsername/", {
            params: {
                username: givenUsername,
                password: givenPassword
            }
        })
            .then(response => {
                setManagerState(response, givenPassword);
                props.history.push('/manager');
            })
            .catch(err => alert("Login error!"));
    };

    const onHotelClick = (id, props) => {
        props.history.push("/hotel/" +id)

    }

    const checkResetId = (id, props) => {
        console.log("checking reset ID!")
        axios.get(uri + "/email/AccountRecovery/getById/" + id)
            .then(accountResponse => {
                if (accountResponse == null) {
                    props.history.push("/")
                }
            })
            .catch(err => {props.history.push("/")})
    }

    const deleteManager = (id) => {
        //delete generic from backend
        //no implementation for server errors
        axios.delete(uri + "/manager/deleteById/" + id)
        resetManager();
        console.log("Deleted user!");
    }

    // Delete Generic
    const deleteUser = (id) => {
        //delete generic from backend
        //no implementation for server errors
        axios.delete(uri + "/user/deleteById/" + id)
        resetUser();

        console.log("Deleted user!");
    }

    const recoverAccount = (email, props) => {
        axios.get(uri + "/user/getByEmail/" + email)
            .then(userResponse => {
                if (userResponse.data == null) {
                    axios.get(uri + "/manager/getByEmail/" + email)
                        .then(managerResponse => {
                            if (managerResponse.data == null) {
                                alert("please enter an email that is tied to an account!")
                            }
                            else {
                                const managerAccountRecovery = ({ email: email, account_id: managerResponse.data._id, accountType: "manager" })
                                axios.post(uri + "/email/AccountRecovery/Add", managerAccountRecovery)
                                    .then(acountRecoveryResponse => {
                                        axios.post(uri + "/email/AccountRecovery/SendEmailRecoveryRequest/" + acountRecoveryResponse.data._id)
                                            .then(emailSentResponse => {
                                                console.log(emailSentResponse.data)
                                                props.history.push("/resetPassword")

                                            })
                                            .catch(err => { alert("email sent error!"); console.log(err) });
                                    })
                                    .catch(err => { alert("adding acount Recovery error!"); console.log(err) });

                            }
                        })
                        .catch(err => alert("getting manager Acount error!"));

                }
                else {
                    const userAccountRecovery = ({ email: email, account_id: userResponse.data._id, accountType: "user" })
                    console.log(userAccountRecovery)
                    axios.post(uri + "/email/AccountRecovery/Add", userAccountRecovery)
                        .then(acountRecoveryResponse => {
                            axios.post(uri + "/email/AccountRecovery/SendEmailRecoveryRequest/" + acountRecoveryResponse.data._id)
                                .then(emailSentResponse => {
                                    console.log(emailSentResponse.data)
                                    props.history.push("/resetPassword")
                                })
                                .catch(err => { alert("email sent error!"); console.log(err) });
                        })
                        .catch(err => { alert("adding acount Recovery error!"); console.log(err)});
                }
            })
            .catch(err => {alert("getting user Acount error!"); console.log(err);});

    }

    //where render happens
    return (

        <Router>  
           
            <NavBar user={user} manager={manager} />
			
            {/* Here instead of using the component, we use the render and then the component
                * we do this because the component cannot take in anything without using render
                * if you just want to route to a componet without passing anyting to it
                * <Route path="/" exact component={<component>} /> works*/}
			
			
           <Route path="/" exact render={(props) => (
                <>
                    {<SplashPage user ={user} manager = {manager} props = {props} cities={cities} onCityClick={onCityClick} props={props}/>}
                </>
            )}
            />
			
            <Route path="/hotel/:id" render={(props) => (
                <>
                    {<Hotel getHotel={getHotel} onRoomClick={onRoomClick} props={props}/>}
                </>
            )}
            />
            <Route path="/booking/:id" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<Booking user={user} props={props} getHotel={getHotelForBookings} getRoom={getRoomForBookings} />}
                </>
            )}
            />
			<Route path="/dashboard" render={(props) => (
                <>
                    {<Dashboard user={user} manager={manager} props={props} hotels={hotels} onHotelClick={onHotelClick} />}
                </>
            )}
            />
            <Route path="/messages" render={(props) => (
                <>
                    {<Messages user={user} manager={manager} props={props}  />}
                </>
            )}
            />
			<Route path="/dashboard/filtered" render={(props) => (
                <>
                    {<Dashboard user={user} manager={manager} props={props} hotels={hotels} onHotelClick={onHotelClick}  props={props} filter={filter}/>}
                </>
            )}
            />
			
            <Route path="/manager" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<Manager manager={manager} onDelete={deleteManager} logOut={logOut} props={props} getHotel={getHotelForManager} onUpdate={updateManager} />}
                </>
            )}
            />    
            <Route path="/bookings" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<Bookings user={user} props={props} getHotel={getHotelForBookings} getRoom={getRoomForBookings} onBookingClick={onBookingClick}/>}
                </>
            )}
            />
            <Route path="/createRoom" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<CreateRoom manager={manager} onCreateRoom={addRoom} props={props} />}
                </>
            )}
            />

            <Route path="/editRooms" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<EditRooms manager={manager} onRoomClick={onEditRoomClick} props={props} />}
                </>
            )}
            />

            <Route path="/editRoom/:id" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<EditRoom manager={manager} getRoom={getRoomForManger} onRoomUpdate={updateRoom} props={props} />}
                </>
            )}
            />

            <Route path="/room/:id" render={(props) => (
                <>
                    {<Room user={user} getRoom={getRoom} updateUser={updateUserBookings} updateRoom={updateRoomBookings} props={props} />}

                </>
            )}
            />
			
           
            <Route path="/user" render={(props) => (
                <>
                    {/* we pass a function*/}
                    {<User user={user} onDelete={deleteUser} logOut={logOut} props={props} onUpdate={updateUser} />}
                </>
            )}
            />
            <Route path="/login" render={(props) => (
                <>
                    {<Login onUserLogin={checkUser} onGoogleLogin={googleLogin} onManagerLogin={checkManager} props={props} />}

                </>
            )}
            />
            <Route path="/create" render={(props) => (
                <>
                    {<CreateUser onCreateUser={createUser} onGoogleLogin={googleLogin} onCreateManager={createManager} props={props} />}
                </>
            )}
            />
            <Route path="/forgotPassword" exact render={(props) => (
                <>
                    {<ForgotPassword props={props} onEmailSubmit={recoverAccount} />}
                </>
            )}

            />
            <Route path="/resetPassword/:id" exact render={(props) => (
                <>
                    {<ResetPassword checkResetID={checkResetId} onResetPassword={updatePassword} props={props} />}
                </>
            )}
            />
            <Route path="/resetPassword/" exact render={(props) => (
                <>
                    {<ResetPassword checkResetID={checkResetId} onResetPassword={updatePassword} props={props} />}
                </>
            )}
            />
    </Router>);


};

export default App;
