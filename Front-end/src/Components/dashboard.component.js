import React from 'react';
import HotelListing from "./hotel-listing.component";

const Dashboard = ({user, manager, hotels, onHotelClick, props }) => {
	
	console.log(hotels)
	return(
			(user._id == "" && manager._id == "") //if not logged in, adjust display
			? <div>
					<div>							
							<ul>
						{hotels.map(hotel => <li> <HotelListing hotel={hotel} onClick={onHotelClick} props={props} /></li>)}
							</ul>
					</div> 
			</div>
			: <div>{(manager._id != "") 
				? <div> //If manager, move to manager view
					<label> manager login view </label>
				</div>
				:<div> //if User, move to user view
					<label> user login view </label>
				 </div>}
			</div>
	
	
	
	
	);
	
	
};

export default Dashboard