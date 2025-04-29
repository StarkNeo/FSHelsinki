import InputField from "./InputField"
const AddPerson = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>name: <InputField event={props.changeName} value={props.name} /> </div>
            <div>number:<InputField event={props.changeNumber} value={props.number} /> </div>
            <div><button type='submit'>add</button></div>
        </form>

    )
}


export default AddPerson