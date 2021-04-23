import React from 'react';
import HotelListing from "./hotel-listing.component";
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import ManagerStats from "./manager-statistics.component"
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
	const [sortAlphabeticallyOn, setSortAlphabeticallyOn] = useState(false)
	const [sortPriceOn, setSortPriceOn] = useState(false)
	const [alphabetSort, setAlphabetSort] = useState("");
	const [priceSort, setPriceSort] = useState("")
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

		if (categoryFilterOn || sortAlphabeticallyOn || sortPriceOn) {
			setFilterOn(true)
			
		}
		else {
			setFilterOn(false)
		}


	}, [categoryFilterOn, sortAlphabeticallyOn, sortPriceOn]);

	useEffect(() => {
		console.log("updating")
		if (filterOn) {
			let tempHotels = hotels;


			if (sortPriceOn || sortAlphabeticallyOn) {
				tempHotels = sortList(tempHotels);
            }

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


	const sortList = (tempHotels) => {
		return tempHotels.sort((hotel1, hotel2) => {
			let hotel1Price = Number(hotel1.avgRoomPrice);
			let hotel2Price = Number(hotel2.avgRoomPrice);
			let hotel1Letter = hotel1.name.charAt(0)
			let hotel2Letter = hotel2.name.charAt(0)
			if (alphabetSort === 'NA') {
				if (priceSort != "") {
					if (hotel1Letter < hotel2Letter) {
						return -1;
					}
					else if (hotel1Letter > hotel2Letter) {
						return 1;
					}
				}
				else {
					if (hotel1.name < hotel2.name) {
						return -1;
					}
					else if (hotel1.name > hotel2.name) {
						return 1;
					}
					return 0;
                }
			}

			if (alphabetSort === 'ND') {
				if (priceSort != "") {
					if (hotel2Letter < hotel1Letter) {
						return -1;
					}
					if (hotel2Letter > hotel1Letter) {
						return 1;
					}
				}
				else {
					if (hotel2.name < hotel1.name) {
						return -1;
					}
					if (hotel2.name > hotel1.name) {
						return 1;
					}
					return 0;
				}

			}
			if (priceSort === 'PA') {
				if (hotel1Price < hotel2Price) {
					return -1;
				}
				if (hotel1Price > hotel2Price) {
					return 1;
				}
				// a must be equal to b
				return 0;
			}
			if (priceSort === 'PD') {
				if (hotel1Price > hotel2Price) {
					return -1;
				}
				if (hotel1Price < hotel2Price) {
					return 1;
				}
				// a must be equal to b
				return 0;
			}

		})
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
	const onPriceSort = (event) => {
		setPriceSort(event.target.value)

		if (event.target.value == "") {
			setSortPriceOn(false);

		}
		else {
			if (sortPriceOn) {
				setUpdated(false)
			}
			else {
				setSortPriceOn(true)
				setUpdated(false)

			}


		}

	}
	const onAlphabetSort = (event) => {
		setAlphabetSort(event.target.value)
		console.log(event.target.value)
		if (event.target.value === "") {
			setSortAlphabeticallyOn(false);

		}
		else {
			if (sortAlphabeticallyOn) {
				setUpdated(false)
			}
			else {
				setSortAlphabeticallyOn(true)
				setUpdated(false)
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
			(manager._id == "") //if not logged in, adjust display
			? <div className='splash-page'>
				<header className={"hotel-search"}>
						<NativeSelect
						labelid="demo-customized-select-label"
						id="demo-customized-select"
						value={alphabetSort}
						onChange={onAlphabetSort}
						input={<BootstrapInput />}
						>
						<option value={""}>Sort by Name</option>
						<option value={"NA"}>Name Ascending</option>
						<option value={"ND"}>Name Descending</option>
					</NativeSelect>
						<NativeSelect
						labelid="demo-customized-select-label"
						id="demo-customized-select"
						value={priceSort}
						onChange={onPriceSort}
						input={<BootstrapInput />}
						>
						<option value={""}>Sort by Price</option>
						<option value={"PA"}>Price Ascending</option>
						<option value={"PD"}>Price Descending</option>
						</NativeSelect>
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
			: <ManagerStats manager={manager}/>
			
				
			
	
	
	
	
	);
	
	
};

export default Dashboard