import React from 'react';
import { Link } from "react-router-dom";
import City from "./city.component";


const SplashPage = ({user, manager, cities, onCityClick, props }) => {
	
	return(
			 <div className = 'splash-page'>
				<center>	
				<span className = 'splash'> 
					  <Link to={"/Dashboard"} >See our bookings!</Link>
				</span>
				</center>
				<ul style={{ listStyleType: "none" }}>
					{cities.map((newCity) => <City city={newCity} onClick={onCityClick} props={props} />)}
				</ul> 
			</div>
	);
	
	
};

export default SplashPage