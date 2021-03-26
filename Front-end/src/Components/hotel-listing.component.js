import { FaHotel } from 'react-icons/fa'

const HotelListing = ({ hotel, onClick, props }) => {
    return (
        <div className={'hotel-listing'} onClick={() => onClick(hotel._id, props)} >
			
            <heading >
                <h2 className={"hotel-header"}><FaHotel
                    style={{ color: 'black'}}
                    onClick={() => onClick(hotel._id, props)}
                />{" "}{hotel.name}{' '}
                {/* creates a x icon */}
                    
                        
                        <div>
                            <label className={"hotel-left-label"}> State : {hotel.location.stateOrProvince}      </label>
                            <label className={"hotel-right-label"}>  City : {hotel.location.city} </label>
                        </div>
                </h2>
                
            </heading>
            <img className={'hotel-image'} src = {'https://cache.marriott.com/marriottassets/marriott/RDURN/rdurn-exterior-0048-hor-feat.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1180px:*'}/> 
            
        </div>
    )
}

export default HotelListing