import React from 'react';
import Hotel from "./hotel-listing.component";

const Dashboard = ({user, manager, hotels }) => {
	
	console.log(hotels)
	return(
			(user._id == "" && manager._id == "") //if not logged in, adjust display
			? <div>
					<div>	
					You're not logged in!
						
							<ul>
						{hotels.map(hotel => <li> <Hotel hotel={hotel} /></li>)}
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