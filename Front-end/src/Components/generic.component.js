import { FaTimes } from 'react-icons/fa'

const Generic = ({ generic, onDelete, moveToEdit}) => {
    return (
        <div
            className={`generic`}
        >
            <h3>
                {generic.username}{' '}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(generic._id)}
                />
                <FaTimes
                    style={{ color: 'Green', cursor: 'pointer' }}
                    onClick={() => moveToEdit(generic._id)}
                />
            </h3>
            <p>{generic.password}</p>
        </div>
    )
}

export default Generic
