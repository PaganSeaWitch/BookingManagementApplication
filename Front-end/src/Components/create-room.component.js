// JavaScript source code
import { useState, useEffect } from "react";
import axios from "axios";
import { create } from "../../../Back-end/Models/account-recovery.model";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI


const CreateRoom = ({ manager, createRoom, props }) => {
    const [hotelID, setHotelID] = useState("")
    const [hotelName, setHotelName] = useState("")
    const [price, setPrice] = useState(0);
    const [amountOfBeds, setAmountOfBeds] = useState(1);
    const [tags, setTags] = useState([])
    const [createRoom, setCreateRoom] = useState(false)
    const [roomNumber, setRoomNumber] = useState(100);
    const [tagString, setTagString] = useState("")
    useEffect(() => {

        if (manager._id == "") {
            props.history.push("/");
        }
        axios.get(uri + "/hotel/getHotelByID/" + manager.hotel_id)
            .then(response => {
                if (response != null) {
                    setHotelID(response.data.id)
                    setHotelName(response.data.name)
                }
                else {
                    props.push("/")
                }
            })
            .catch(err => { return "" })

    }, [])


    useEffect(() => {

        if (createRoom == true) {
            setCreateRoom(false)
            if (isNaN(price)) {
                alert("Please enter a number for price")
                return;
            }
            if (isNaN(amountOfBeds)) {
                alert("Please enter a number for amount of beds")
                return;

            }
            if (isNaN(roomNumber)) {
                alert("Please enter a number for hotel room")
                return;

            }
            let tempString = ""
            for (let i = 0; i < tagString.length; i++) {
                if (tagString.charAt(i) == ',') {
                    setTags([...tags, tempString])
                    tempString = ""
                }
                else {
                    tempString = tempString + tagString.charAt(i)
                }
            }
            createRoom(hotelID, roomNumber, amountOfBeds, price, tags)
        }

    },[createRoom])

    return (
        <div>

            <div className={"login-header"}>
                <header> New Room </header>
            </div>

            <form className={"login-form"}>

                <div>
                    <span></span>
                    <label>Room Number</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='number'
                        value={roomNumber}
                        onChange={(e) => { setRoomNumber(e.target.value); }
                        } />
                    <span></span>

                </div>
                <div>
                    <span></span>
                    <label>Price per Night</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='number'
                        value={roomPrice}
                        onChange={(e) => { setRoomNumber(e.target.value); }
                        } />
                    <span></span>

                </div>
                <div>
                    <span></span>
                    <label>Amount of Beds</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='number'
                        value={amountOfBeds}
                        onChange={(e) => { setAmountOfBeds(e.target.value); }
                        } />
                    <span></span>

                </div>

                <div>
                    <span></span>
                    <label>Tags (seperate by commas)</label>
                    <span></span>
                </div>
                <div>
                    <span></span>

                    <input className={"rounded-login"}
                        type='number'
                        value={tagString}
                        onChange={(e) => { setTagString(e.target.value); }
                        } />
                    <span></span>

                </div>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setCreateRoom(true) }}> Create Room </button>

            </form>

        </div>
    )
}

export default CreateRoom