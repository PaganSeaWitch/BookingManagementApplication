import React from 'react';
import { Link } from "react-router-dom";

	
const City = (city, props) => {
	
	return(
			 <div className={'hotel-listing'} >
			
            <header>
                
                        
                        <div>
                            <label className={"hotel-left-label"}> State : {city.cityName}      </label>
                 
                        </div>
              
                
            </header>

        </div>
	);
	
	
};

export default City