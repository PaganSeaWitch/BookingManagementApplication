import Generic from "./generic.component"
//creates a list of generics
const GenericList = ({ generics, onDelete }) => {

    return (
        <div>
            <h3>Logged Generics</h3>
            {/* this maps out the array given and creates a new generic component per generic in array*/}
            {generics.map((generic, index) => (
                <Generic key={index} generic={generic} onDelete={onDelete}/>
            ))}
        </div>
    )
};

export default GenericList;