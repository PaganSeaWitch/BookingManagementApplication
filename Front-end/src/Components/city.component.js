import React from 'react';
import { Link } from "react-router-dom";

	
const City = ({city, onClick, props}) => {
	
	return(
			 <div className={'city'} onClick={() => onClick(city, props)} >
			
            <header>
                
                        
                        <div>
							
							<h3>Visit {city.name}!  </h3>
							<br></br>
							 <img className={'hotel-image'} src = {'https://www.pewtrusts.org/-/media/post-launch-images/2020/04/sotc-2020_main.jpg?mw=1290&hash=AE935C0DCC34630ED1A9236A80F71178'}/> 
							<label > Number of Hotels : {city.numLocations}  </label>
							<br></br>
							<label> Average Room Price : ${city.avgPrice} </label>
							
                        </div>
              
                
            </header>
			
            

        </div>
	);
	
	
};

export default City