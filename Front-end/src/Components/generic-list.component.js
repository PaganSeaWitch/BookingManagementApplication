import Generic from "./generic.component"

const GenericList = ({ generics, onDelete }) => {

    return (
        <div>
            <h3>Logged Generics</h3>
            {generics.map((generic, index) => (
                <Generic key={index} generic={generic} onDelete={onDelete}/>
            ))}
        </div>
    )
};

export default GenericList;