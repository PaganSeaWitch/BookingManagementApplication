import React from 'react';
import HotelListing from "./hotel-listing.component";

const Dashboard = ({user, manager, hotels, onHotelClick, props }) => {
	
	
	console.log(hotels)
	return(
			(user._id == "" && manager._id == "") //if not logged in, adjust display
			? <div className = 'dashboard'>
					<div>							
							<ul style = {{listStyleType: "none"}}>
							{hotels.map((hotel, index) => <HotelListing hotel={hotel} key={index} onClick={onHotelClick} props={props} />)}
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
					<div>							
							<ul style = {{listStyleType: "none"}}>
							{hotels.map((hotel, index) => <HotelListing hotel={hotel} key={index}onClick={onHotelClick} props={props} />)}
							</ul>
					</div> 
				 </div>}
			</div>
	
	
	
	
	);
	
	
};

export default Dashboard