import React from 'react';
import Booking from "./booking.component";
const Dashboard = ({user, manager  }) => {
	const sample = [Booking, Booking, Booking];
	
	
	return(
			(user._id == "" && manager._id == "") //if not logged in, adjust display
			? <div>
					<div>	
						You're not logged in!
						
							<ul style = {{align: "left", listStyleType: "none"}} className = "booking-group">
								{sample.map(listItem => <li> <Booking>listItem </Booking> </li>)}
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