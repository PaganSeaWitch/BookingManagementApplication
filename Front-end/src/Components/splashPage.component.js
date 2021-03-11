import React from 'react';
import { Link } from "react-router-dom";

	
const SplashPage = () => {
	
	return(
			 <div class = 'splash-page'>
				<center>	
				<p>
						Welcome to RendezView! 
                               
                </p> 
				
				<div> 
					 <Link to={"/Dashboard"} >See our bookings!</Link>
				</div>
				</center>
			</div>
	);
	
	
};

export default SplashPage