// JavaScript source code
import { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI


const CreateRoom = ({ manager, createRoom, props }) => {
    const [hotelID, setHotelID] = useState("")
    const [hotelName, setHotelName] = useState("")
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

                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); }}> Create Room </button>

            </form>

        </div>
    )
}

export default CreateRoom