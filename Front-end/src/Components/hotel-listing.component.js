import { FaHotel } from 'react-icons/fa'

const HotelListing = ({ hotel, onClick, props }) => {
    return (
        <div className={'hotel-listing'} onClick={() => onClick(hotel._id, props)} >
			
            <header>
                <h2 className={"hotel-header"}><FaHotel className={"icon"}style={{ color: 'black'}}/>{" "}{hotel.name}
                        <label className={"hotel-right-label"}> Avg. Room Price : {hotel.avgRoomPrice}$      </label>
                        <div>
                            <label className={"hotel-right-label"}> State : {hotel.location.stateOrProvince}      </label>
                            <label className={"hotel-left-label"}>  City : {hotel.location.city} </label>
                        </div>
                </h2>
                
            </header>
            <img className={'hotel-image'} src = {'https://cache.marriott.com/marriottassets/marriott/RDURN/rdurn-exterior-0048-hor-feat.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1180px:*'}/> 
            
        </div>
    )
}

export default HotelListing