import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';
import { useEffect, useMemo, useState } from 'react'
import axios from "axios";
import { setDate } from 'date-fns';
require('dotenv').config()

const ManagerStats = ({ manager }) => {
    const backURI = process.env.REACT_APP_BACK_END_SERVER_URI

    const [hotel, setHotel] = useState({})
    const [hotelRooms, setHotelRooms] = useState([])
    const [dates, setDates] = useState([])

    const earningsData = useMemo(
        () => hotelRooms.map(room => ({ name: room.roomNumber, "Total earnings from room": room.price * room.booked_dates.length }))
        ,
        [hotelRooms]
    )

    const [datesData, setDatesData] = useState([])

    const fetchRooms = async (roomIDs) => {
        const roomsTemp = [];
        let datesTemp = [];
        for await (let id of roomIDs) {
            axios.get(backURI + "/room/getRoomByID/" + id)
                .then(response => {
                    if (response != null) {
                        roomsTemp.push(response.data);
                        if (response.data.booked_dates.length != 0) {
                            datesTemp = datesTemp.concat(response.data.booked_dates)
                        }
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
                        setDates([...datesTemp])
                    }
                })

        }
        computeDates(roomsTemp);

    }
    const computeDates = () => {
        const tempDatesData = []

        dates.forEach(date => {
            let tempDate = new Date(date)
            let tempDateString = tempDate.getDate() + "/" + tempDate.getMonth()
            console.log(tempDateString)
            let found = tempDatesData.findIndex(function (dateObject, index) {
                if (dateObject.date === tempDateString) {
                    return true
                }
                else {
                    return false
                }
            })
            if (found != -1) {
                tempDatesData[found].amount = tempDatesData[found].amount + 1;

            }
            else {
                tempDatesData.push({ date: tempDateString, amount: 1 })
            }
        })
        tempDatesData.sort((dateObj1, dateObj2) => {
            if (dateObj1.date < dateObj2.date) {
                return -1;
            }
            if (dateObj1.date > dateObj2.date) {
                return 1;
            }
            // a must be equal to b
            return 0;
        })
        setDatesData([...tempDatesData])
        console.log(datesData)
        console.log(earningsData)
    }

    useEffect(() => {
        computeDates()
    }, [dates])


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

    return (

        <div className='manager-stats'>
			<p>This is the manager dashboard</p>
            <p> {hotel == null ? "nothing" : hotel.name} </p>
            <BarChart width={730} height={250} data={earningsData}>
                <Legend verticalAlign='top' height={100} align='right' />                
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" type='category' >
                    <Label value="Rooms" offset={-7} position="bottom" />
                </XAxis>
                <YAxis scale='linear' >
                    <Label value="$" offset={-18} position="left" interval="preserveEnd" minTickGap={50} />
                </YAxis>
                <Bar dataKey="Total earnings from room" fill="#8884d8" />
                <Tooltip />
            </BarChart>
            <BarChart width={730} height={250} data={datesData}>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" type='category' >
                    <Label value="Dates" offset={-7} position="bottom" />
                </XAxis>
                <YAxis scale='linear'>
                    <Label value="Booked Rooms" offset={-18} position="left" interval="preserveEnd" minTickGap={50} />
                </YAxis>
                <Legend verticalAlign='top' height={100} align ='right'/>
                <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>

        </div>

    );
}

export default ManagerStats