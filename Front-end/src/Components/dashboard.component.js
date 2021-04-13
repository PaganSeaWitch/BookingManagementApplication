import React from 'react';
import HotelListing from "./hotel-listing.component";
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import axios from "axios";
require('dotenv').config()
const backURI = process.env.REACT_APP_BACK_END_SERVER_URI

const Dashboard = ({ user, manager, onHotelClick, props, filter }) => {
	const [hotels, setHotels] = useState([])
	const [category, setCategory] = useState("name")
	const [filterOn, setFilterOn] = useState(false)
	const [filteredHotels, setFilteredHotels] = useState([])
	const [search, setSearch] = useState("")
	const [searchOn, setSearchOn] = useState(false)
	const [updated, setUpdated] = useState(true)
	const [categoryFilterOn, setCategoryFilterOn] = useState(true)

	useEffect(() => {
		
			
		axios.get(backURI + "/hotel/allHotels")
			.then(response => {
				setHotels(response.data);
				setFilteredHotels(response.data);
				if (filter != null) {
					console.log("Filtering from city click");
					setCategory("city");
					setSearch(filter);
					console.log("Search finished: category: " + category + " filterOn: " + filterOn + " search: " + search);
					filter = null;

					setUpdated(false);

				}
			})
			.catch(err => console.log(err))
		
	}, [])

	useEffect(() => {

		if (categoryFilterOn) {
			setFilterOn(true)
			
		}
		else {
			setFilterOn(false)
		}


	}, [categoryFilterOn]);

	useEffect(() => {
		console.log("updating")
		if (filterOn) {
			let tempHotels = hotels;
			
			if (searchOn) {
				tempHotels = searchByCategory(tempHotels);
            }
			setFilteredHotels([...tempHotels])
			setUpdated(true)
		}

	}, [updated])

	const searchByCategory = (tempHotels) => {
		if (category === "name") {
			return tempHotels.filter(function (hotel) {
				return hotel.name.includes(search) || hotel.name === search;
			})
		}
		if (category === "city") {
			return tempHotels.filter(function (hotel) {
				return hotel.location.city.includes(search) || hotel.location.city === search;
			})
		}
		if (category === "state") {
			return tempHotels.filter(function (hotel) {
				return hotel.location.stateOrProvince.includes(search) || hotel.location.stateOrProvince === search;
			})
		}
		return tempHotels;
	}

	const changeCategory = (event) => {
		setCategory(event.target.value)
		if (event.target.value == "") {
			setCategoryFilterOn(false);

		}
		else {
			if (categoryFilterOn) {
				setUpdated(false)
				setSearchOn(false)
			}
			else {
				setCategoryFilterOn(true)

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

	return(
			(user._id == "" && manager._id == "") //if not logged in, adjust display
			? <div className='dashboard'>
					<header className={"hotel-search"}>
						<NativeSelect
						labelid="demo-customized-select-label"
						id="demo-customized-select"
						value={category}
						onChange={changeCategory}
						input={<BootstrapInput />}
						>
							<option value={"name"}>Search by name</option>
							<option value={"city"}>Search by city</option>
							<option value={"state"}>Search by state</option>
						</NativeSelect>
						<input className={"search-bar"}
							type='text'
							value={search}
							placeholder={filter}
							onChange={(e) => { setSearch(e.target.value);}
						} />

					<Button size="large" variant="contained" color="primary" onClick={(e) => { e.preventDefault(); setSearchOn(true);setUpdated(false); }}>Search </Button>

				</header>
					<div>							
					<ul style={{ listStyleType: "none" }}>
						{filterOn ? filteredHotels.map((hotel, index) => <HotelListing hotel={hotel} key={index} onClick={onHotelClick} props={props} />) : hotels.map((hotel, index) => <HotelListing hotel={hotel} key={index} onClick={onHotelClick} props={props} />)}
							</ul>
					</div>

			</div>
			: <div className = 'dashboard'>{(manager._id != "") 
				? <div> 
					<div>							
						{/* TODO, make manager dashboard*/}
					</div> 
				</div>
				: <div className='dashboard'>
					<header className={"hotel-search"}>
						<NativeSelect
							labelid="demo-customized-select-label"
							id="demo-customized-select"
							value={category}
							onChange={changeCategory}
							input={<BootstrapInput />}
						>
							<option value={"name"}>Search by name</option>
							<option value={"city"}>Search by city</option>
							<option value={"state"}>Search by state</option>
						</NativeSelect>
						<input className={"search-bar"}
							type='text'
							value={search}
							placeholder={filter}
							onChange={(e) => { setSearch(e.target.value); }
							} />

						<Button size="large" variant="contained" color="primary" onClick={(e) => { e.preventDefault(); setSearchOn(true);setUpdated(false); }}>Search </Button>

					</header>
					<div>
						<ul style={{ listStyleType: "none" }}>
							{filterOn ? filteredHotels.map((hotel, index) => <HotelListing hotel={hotel} key={index} onClick={onHotelClick} props={props} />) : hotels.map((hotel, index) => <HotelListing hotel={hotel} key={index} onClick={onHotelClick} props={props} />)}
						</ul>
					</div>

				</div>}
			</div>
	
	
	
	
	);
	
	
};

export default Dashboard