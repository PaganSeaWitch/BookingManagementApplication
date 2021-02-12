import { FaTimes } from 'react-icons/fa'

//Creates a generic component, used for listing it
const Generic = ({ generic, onDelete, moveToEdit}) => {
    return (
        <div
            className={`generic`}
        >
            <h3>
                {generic.username}{' '}
                {/* creates a x icon */}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(generic._id)}
                />
                
            </h3>
            <p>{generic.password}</p>
        </div>
    )
}

export default Generic
