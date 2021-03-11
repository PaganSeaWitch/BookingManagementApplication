import { BiArrowBack } from 'react-icons/bi'

const HotelListing = ({ hotel, onClick, props }) => {

    return (
        <div class = 'hotel-listing'>
            <h3>
                {hotel.name}{' '}
                {/* creates a x icon */}
                <BiArrowBack
                    style={{ color: 'green', cursor: 'pointer' }}
                    onClick={() => onClick(hotel._id, props)}
                />

            </h3>
            

            <label>City : {hotel.location.city} </label>
            <br></br>
            <label>State : {hotel.location.stateOrProvince} </label>




            
        </div>
    )
}

export default HotelListing