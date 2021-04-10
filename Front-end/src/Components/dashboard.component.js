import React from 'react';
import HotelListing from "./hotel-listing.component";
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';


const Dashboard = ({user, manager, hotels, onHotelClick, props, filter}) => {
	const [category, setCategory] = useState("")
	const [filterOn, setFilterOn] = useState(false)
	const [filteredHotels, setFilteredHotels] = useState([])
	const [search, setSearch] = useState("")
	useEffect(() => {
		if(filter != null){
			console.log("Filtering from city click");
			setCategory("city");
			setSearch(filter);
			startSearch();
			setFilterOn(true);
			console.log("Search finished: category: " + category + " filterOn: " + filterOn + " search: " + search); 
			filter = null;
		}
		/*if (search.length == 0) {
			setFilterOn(false)
		}*/


	}, [search]);
	const startSearch = () => {
		console.log("Start search happened");
		setFilterOn(true)
		if (category == "name") {
			setFilteredHotels([...hotels.filter(function (hotel) {
				return hotel.name.includes(search)
			})])
		}
		if (category == "city") {
			setFilteredHotels([...hotels.filter(function (hotel) {
				return hotel.location.city.includes(search)
			})])
		}
		if (category == "state") {
			setFilteredHotels([...hotels.filter(function (hotel) {
				console.log(hotel.location.stateOrProvince)
				return hotel.location.stateOrProvince.includes(search)
			})])
        }
	}
	const changeCategory = (event) => {
		setCategory(event.target.value)
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
						labelId="demo-customized-select-label"
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

					<Button size="large" variant="contained" color="primary" onClick={(e) => { e.preventDefault(); startSearch(); }}>Search </Button>

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
				: <div className = 'dashboard'> 
					<header className={"hotel-search"}>
						<NativeSelect
							labelId="demo-customized-select-label"
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
							placeholder="type something"
							onChange={(e) => { setSearch(e.target.value); }
							} />

						<Button size="large" variant="contained" color="primary" onClick={(e) => { e.preventDefault(); startSearch(); }}>Search </Button>					
						<ul>
						{hotels.map((hotel, index) => <HotelListing hotel={hotel} key={index}onClick={onHotelClick} props={props} />)}
						</ul>
					 </header>
				 </div>}
			</div>
	
	
	
	
	);
	
	
};

export default Dashboard