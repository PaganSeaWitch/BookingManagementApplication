import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';
import { useEffect, useMemo, useState } from 'react'
import axios from "axios";
require('dotenv').config()

const ManagerStats = ({ manager }) => {
	const backURI = process.env.REACT_APP_BACK_END_SERVER_URI

    const [hotel, setHotel] = useState({})
    const [hotelRooms, setHotelRooms] = useState([])
    
    
    const data = useMemo(
        () => hotelRooms.map(room => ({ name:room.roomNumber, "Total earnings from room" : room.price * room.booked_dates.length }))
        ,
            [hotelRooms]
    )
    

    const fetchRooms = async (roomIDs) => {
        const roomsTemp = [];
        for await (let id of roomIDs) {
            axios.get(backURI + "/room/getRoomByID/" + id)
                .then(response => {
                    if (response != null) {
                        roomsTemp.push(response.data);
                        roomsTemp.sort((room1, room2) => {
                            let room1Number = Number(room1.roomNumber);
                            let room2Number = Number(room2.roomNumber);
                            if (room1Number < room2Number) {
                                return -1;
                            }
                            if (room1Number > room2Number) {
                                return 1;
                            }
                            // a must be equal to b
                            return 0;
                        })
                        setHotelRooms([...roomsTemp])
                    }
                })

        }
        console.log(roomsTemp)
        setHotelRooms(roomsTemp);
        setHotelRooms([...roomsTemp])

    }

	useEffect(() => {
		if (manager.hotel_ID == "") {
			return;
        }
		axios.get(backURI + "/hotel/getHotelByID/" + manager.hotel_ID)
			.then(response => {
				if (response != null) {
                    setHotel(response.data)
                    fetchRooms(response.data.room_IDs)
				}
            })

    }, [manager])

    useEffect(() => {
        console.log(data)
    },[data])
    return (

        <div>
			<p>This is the manager dashboard</p>
            <p> {hotel == null ? "nothing" : hotel.name} </p>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" type='category' >
                    <Label value="Rooms" offset={-7} position="bottom" />
                </XAxis>
                <YAxis scale='linear' >
                    <Label value="$" offset={-18} position="left" interval="preserveEnd" minTickGap={50} />
                </YAxis>
                <Legend verticalAlign="top" height={35} />                
                <Bar dataKey="Total earnings from room" fill="#8884d8" />
                <Tooltip />
            </BarChart>
        </div>

    );
}

export default ManagerStats