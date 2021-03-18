import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import { useState, useEffect } from 'react'
require('dotenv').config()


const AnyReactComponent = ({ text }) => <div>{text}</div>;
const geocodeAPIBegining = "https://maps.googleapis.com/maps/api/geocode/json?address="
const geocodeAPIEnding = "&key=" + process.env.REACT_APP_GOOOGLE_API_KEY

const SimpleMap = ({ location, name }) => {
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)

    useEffect(() => {
        console.log("simple map simpings")
        let addressString = ""
        if (location.streetAddress1 != "" && location.streetAddress1 != undefined && location.streetAddress1 != null) {
            for (let i = 0; i < location.streetAddress1.length; i++) {
                let character = location.streetAddress1.charAt(i);
                if (character == " ") {
                    addressString = addressString + "+"
                }
                else {
                    addressString = addressString + character
                }
            }
        }
        if (location.streetAddress2 != "" && location.streetAddress2 != undefined && location.streetAddress2 != null) {
            for (let i = 0; i < location.streetAddress2.length; i++) {
                let character = location.streetAddress2.charAt(i);
                if (character == " ") {
                    addressString = addressString + "+"
                }
                else {
                    addressString = addressString + character
                }
            }
        }
        if (location.city != "") {
            addressString = addressString + "+" + location.city

        }
        if (location.stateOrProvince != "" ) {
            addressString = addressString + "+" + location.stateOrProvince

        }
        if (location.country != "") {
            addressString = addressString + "+" + location.country

        }
        if (location.postalCode != "") {
            addressString = addressString + "+" + location.postalCode

        }
        if (addressString.length > 5) {
            axios.get(geocodeAPIBegining + addressString + geocodeAPIEnding)
                .then(response => {
                    if (response.data != null) {
                        console.log(response)
                        console.log(response.data.results[0].geometry.location.lat)
                        setLat(response.data.results[0].geometry.location.lat)
                        setLng(response.data.results[0].geometry.location.lng)
                    }
                })
                .catch(err => { alert("map error: cant display location!"); console.log(err) })
        }
        
    }, [location])

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '300px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOOGLE_API_KEY }}
                defaultCenter={{ lat: 32.978479, lng: -97.429889 }}
                center={{ lat, lng }}
                defaultZoom={11}
            >
                <AnyReactComponent
                    lat={lat}
                    lng={lng}
                    text={name}
                />
            </GoogleMapReact>
        </div>
    );
    
}

export default SimpleMap;
