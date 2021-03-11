import React from 'react';
import HotelListing from "./hotel-listing.component";

const Dashboard = ({user, manager, hotels, onHotelClick, props }) => {
	
	
	console.log(hotels)
	return(
			(user._id == "" && manager._id == "") //if not logged in, adjust display
			? <div class = 'dashboard'>
					<div>							
							<ul style = {{listStyleType: "none"}}>
						{hotels.map(hotel => <li> <HotelListing hotel={hotel} onClick={onHotelClick} props={props} /></li>)}
							</ul>
					</div> 
			</div>
			: <div class = 'dashboard'>{(manager._id != "") 
				? <div> 
					<div>							
							<ul style = {{listStyleType: "none"}}>
						{hotels.map(hotel => <li> <HotelListing hotel={hotel} onClick={onHotelClick} props={props} /></li>)}
							</ul>
					</div> 
				</div>
				:<div class = 'dashboard'> 
					<div>							
							<ul style = {{listStyleType: "none"}}>
						{hotels.map(hotel => <li> <HotelListing hotel={hotel} onClick={onHotelClick} props={props} /></li>)}
							</ul>
					</div> 
				 </div>}
			</div>
	
	
	
	
	);
	
	
};

export default Dashboard