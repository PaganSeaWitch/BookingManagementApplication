const Generic = ({ generic, onDelete }) => {
    return (
        <div
            className={`generic`}
        >
            <h3>
                {generic.username}{' '}
            </h3>
            <p>{generic.password}</p>
        </div>
    )
}

export default Generic
