import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout  = ({props}) => {
	const initialOptions = {
    "client-id": "Ab5MP34Strn8xQq7h-Fgt0mLAbacBJVtiYhIGtIEbf738lE2LnKvJ7QLKYnCaCSaDj1f_LsNpmyrcNw_",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
		};
	
	
	<div className = "login-background">
		<label> Room Price </label>
		
		 <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
	
	
	</div>
}

export default Checkout;
