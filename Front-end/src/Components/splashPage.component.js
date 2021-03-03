import React from 'react';
import { Link } from "react-router-dom";

	
const SplashPage = () => {
	
	return(
			 <div style = {{marginTop: '0',backgroundSize: 'cover',  height: '1600px', backgroundImage: 'url(/hotelStockPhoto.jpg) ' }}>
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