import React from 'react';
import { Link } from "react-router-dom";

	
const SplashPage = () => {
	
	return(
			 <div className = 'splash-page'>
				<center>	
				<span className = 'splash'> 
					  <Link to={"/Dashboard"} >See our bookings!</Link>
				</span>
				</center>
			</div>
	);
	
	
};

export default SplashPage