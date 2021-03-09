import { BiArrowBack } from 'react-icons/bi'

const Hotel = ({ hotel, onClick }) => {
    return (
        <div>
            <h3>
                {hotel.name}{' '}
                {/* creates a x icon */}
                <BiArrowBack
                    style={{ color: 'green', cursor: 'pointer' }}
                    onClick={() => onClick(hotel._id)}
                />

            </h3>
            

            <label>City : {hotel.location.city} </label>
            <br></br>
            <label>State : {hotel.location.stateOrProvince} </label>




            
        </div>
    )
}

export default Hotel