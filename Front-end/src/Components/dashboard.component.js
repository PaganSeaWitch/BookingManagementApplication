import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useEffect } from "react";


const Dashboard = ({user, manager  }) => {
	
	
	return(
			(user._id == "" && manager._id == "") //if not logged in, adjust display
			? <div>
					<div>	
						Here's some text!
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