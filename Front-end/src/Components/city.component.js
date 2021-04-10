import React from 'react';
import { Link } from "react-router-dom";

	
const City = ({city, onClick, props}) => {
	
	return(
			 <div className={'hotel-listing'} onClick={() => onClick(city, props)} >
			
            <header>
                
                        
                        <div>
                            <label className={"hotel-left-label"}> City : {city.name}  Locations : {city.numLocations}  Average Price : {city.avgPrice}  </label>
                        </div>
              
                
            </header>

        </div>
	);
	
	
};

export default City