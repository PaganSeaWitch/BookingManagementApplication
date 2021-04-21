import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, LineChart, Line, Pie, PieChart, Cell } from 'recharts';
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

    const [tagsData, setTagsData] = useState([
        { name: "no tags", value: 1, color: '#91501d' },
        { name: "smoking only", value: 1, color: '#c4926b' },
        { name: "suite only", value: 1, color: '#5c367c' },
        { name: "handicap accessible only", value: 1, color: '#0A75AD' },
        { name: "smoking & suite only", value: 1, color: '#869112' },
        { name: "smoking & handicap accessible only", value: 1, color: '#0A75AD' },
        { name: "suite & handicap accessible only", value: 1, color: '#8c349c' },
        { name: "suite, handicap accessible & smoking", value: 1, color: '#2ab94c' }])
    const fetchRooms = async (roomIDs) => {
        const roomsTemp = [];
        let datesTemp = [];
        let noTags = 0;
        let smokingOnly = 0;
        let suiteOnly = 0;
        let handicapOnly = 0;
        let smokingNSuite = 0;
        let smokingNHand = 0;
        let suiteNhand = 0;
        let all = 0;
        for await (let id of roomIDs) {
            await axios.get(backURI + "/room/getRoomByID/" + id)
                .then(response => {
                    if (response != null) {
                        const tags = response.data.tags;
                        if (tags.smoking) {
                            if (tags.handicap) {
                                if (tags.suite) {
                                    all = all + 1;
                                }
                                else {
                                    smokingNHand = smokingNHand + 1;
                                }
                            }
                            else if (tags.suite) {
                                smokingNSuite = smokingNSuite + 1;
                            }
                            else {
                                smokingOnly = smokingOnly + 1;
                            }
                        }
                        else if (tags.suite) {
                            if (tags.handicap) {
                                suiteNhand = suiteNhand + 1;
                            }
                            else {
                                suiteOnly = suiteOnly + 1;
                            }
                        }
                        else if (tags.handicap) {
                            handicapOnly = handicapOnly + 1;
                        }
                        else {
                            noTags = noTags + 1;
                        }

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
        const tagOptions = { noTags, smokingOnly, suiteOnly, handicapOnly, smokingNSuite, smokingNHand, suiteNhand, all}
        addTags(tagOptions);
        computeDates(roomsTemp);

    }

    const addTags = (tagAmounts) => {
        setTagsData([
            { name: "no tags", value: tagAmounts.noTags, color: '#91501d' },
            { name: "smoking only", value: tagAmounts.smokingOnly, color: '#c4926b' },
            { name: "suite only", value: tagAmounts.suiteOnly, color: '#5c367c' },
            { name: "handicap accessible only", value: tagAmounts.handicapOnly, color: '#0A75AD' },
            { name: "smoking & suite only", value: tagAmounts.smokingNSuite, color: '#869112' },
            { name: "smoking & handicap accessible only", value: tagAmounts.smokingNHand, color: '#0A75AD' },
            { name: "suite & handicap accessible only", value: tagAmounts.suiteNhand, color: '#8c349c' },
            { name: "suite, handicap accessible & smoking", value: tagAmounts.all, color: '#2ab94c' }
            ])
    }
    const computeDates = () => {
        const tempDatesData = []
        dates.forEach(date => {
            let tempDate = new Date(date)
            let tempDateString = tempDate.getDate() + "/" + tempDate.getMonth()
            let found = tempDatesData.findIndex(function (dateObject, index) {
                if (dateObject.date === tempDateString) {
                    return true
                }
                else {
                    return false
                }
            })
            if (found != -1) {
                tempDatesData[found]["times booked"] = tempDatesData[found]["times booked"]+ 1;

            }
            else {
                tempDatesData.push({ date: tempDateString, "times booked": 1 })
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
        if (tempDatesData.length != 0) {
            let tempStart = tempDatesData[0]['date']
            let end = tempDatesData[tempDatesData.length - 1]['date']

            const nextDay = (date) => {
                let day = Number(date.substring(0, date.indexOf('/')))
                let month = Number(date.substring(date.indexOf('/') + 1))
                if (month == 2 && day == 28) {
                    month = month + 1;
                    day = 1;
                    return day + "/" + month
                }
                if (month % 2 == 0 && day == 30) {
                    month = month + 1;
                    day = 1;
                    return day + "/" + month
                }
                if (month % 2 != 0 && day == 31) {
                    month = month + 1;
                    day = 1;
                    return day + "/" + month

                }
                day = day + 1;
                return day + "/"+month

            }
            while (tempStart !== end) {
                let found = tempDatesData.findIndex(function (dateObject, index) {
                    if (dateObject.date === tempStart) {
                        return true
                    }
                    else {
                        return false
                    }
                })
                if (found == -1) {
                    tempDatesData.push({ date: tempStart, "times booked": 0 })
                }

                tempStart = nextDay(tempStart);
            }

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
        }
        
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
            <header>Statistics for the {hotel.name}</header>
            <div>
                <label className='manager-graph-left'>Total Earnings Per Room</label>
                <label className='manager-graph-right'>Total Bookings Per Date</label>
            </div>
            <div>
                <BarChart className='chart' width={730} height={350} data={earningsData} margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                    <Legend verticalAlign='top' height={34} align='right' />                
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" type='category' interval={0} >
                        <Label value="Rooms" offset={-7} position="bottom" />
                    </XAxis>
                    <YAxis scale='linear' domain={[0, 'dataMax + 40']} >
                        <Label value="$" offset={-18} position="left" interval="preserveEnd" minTickGap={50} />
                    </YAxis>
                    <Bar dataKey="Total earnings from room" fill="#8884d8" />
                    <Tooltip />
                </BarChart>
                <LineChart className='chart' width={730} height={350} data={datesData} margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" type='category' >
                        <Label value="Dates" offset={-7} position="bottom" />
                    </XAxis>
                    <YAxis scale='linear' domain={[0, 'dataMax + 2']}/>
                    <Legend verticalAlign='top' height={35} align ='right'/>
                    <Line type="monotone" dataKey="times booked" fill="#8884d8" />
                </LineChart>
            </div>
            <div>
                <label className='manager-graph-left'>Tags per Room</label>
                <label className='manager-graph-right'>Total Bookings Per Date</label>
            </div>
            <div>
                <PieChart width={730} height={500} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                    <Pie data={tagsData} cx="50%" cy="50%" outerRadius={200} legendType="circle" label>
                    {
                        tagsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                    }
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign='bottom' height={20} align='center' />
                </PieChart>
                
            </div>
            
        </div>

    );
}

export default ManagerStats