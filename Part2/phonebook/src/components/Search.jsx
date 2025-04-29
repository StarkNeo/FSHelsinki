import InputField from "./InputField"

const Search=({value, filter})=>{
    return(
        <div>
            filter shown with <InputField value={value} event={filter} /> 
        </div>     
      
    )
}

export default Search