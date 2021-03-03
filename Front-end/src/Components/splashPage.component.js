import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "react-router-dom";


	
const SplashPage = () => {
	
	return(
			 //if not logged in, adjust display
			 <div style = {{marginTop: '0',backgroundSize: 'cover',  height: '1600px', backgroundImage: 'url(/hotelStockPhoto.jpg) ' }}>
				<center>	
				<p>
						<li className="splashPage-item">
                                <Link to={"/Dashboard"} >See our bookings!</Link>
                        </li>
				</p> 
				</center>
			</div>
			
	
	
	
	
	);
	
	
};

export default SplashPage