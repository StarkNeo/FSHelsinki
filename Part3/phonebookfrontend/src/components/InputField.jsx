const InputField=(props)=>{
    return(
        <input type="text" value={props.value} onChange={props.event} />
    )
}

export default InputField