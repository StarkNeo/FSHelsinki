const Search = (props) => {
    return (
        <div>
            <label htmlFor="search">find countries</label>
            <input type="search" name="search" id="search" value={props.value} onChange={props.search} />
            <br/> {props.message} <br/>  
        </div>
    )
}

export default Search