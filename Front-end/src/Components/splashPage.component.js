import React from 'react';
import { Link } from "react-router-dom";

	
const SplashPage = () => {
	
	return(
			 <div class = 'splash-page'>
				<center>	
				<span class = 'splash'>
						Welcome to RendezView! 
                </span> 
				<br/><br/>
				<span class = 'splash'> 
					  <Link to={"/Dashboard"} >See our bookings!</Link>
				</span>
				</center>
			</div>
	);
	
	
};

export default SplashPage