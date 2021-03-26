import { BiArrowBack } from 'react-icons/bi'

const HotelListing = ({ hotel, onClick, props }) => {
    return (
        <div className = 'hotel-listing'>
			
            <h3>
                {hotel.name}{' '}
                {/* creates a x icon */}
                <BiArrowBack
                    style={{ color: 'green', cursor: 'pointer' }}
                    onClick={() => onClick(hotel._id, props)}
                />

            </h3>
            <img className = 'hotel-image' src = {'https://cache.marriott.com/marriottassets/marriott/RDURN/rdurn-exterior-0048-hor-feat.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1180px:*'}/> 
            <div>
                <label className={"hotel-left-label"}>City : {hotel.location.city}       </label>
                <label className={"hotel-right-label"}> State : {hotel.location.stateOrProvince} </label>
			</div>
        </div>
    )
}

export default HotelListing