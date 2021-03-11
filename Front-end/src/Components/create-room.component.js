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
            createRoom()
        }

    },[createRoom])

    return (
        <div>

            <h1>
                {hotelName}{' '}

            </h1>

            <form>

                <h3>Room : </h3>

                <label>Price :  </label>
                <br></br>
                <label>Beds : </label>

                <label>Tags : </label>

                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); setCreateRoom(true) }}> Create Room </button>

            </form>

        </div>
    )
}

export default CreateRoom