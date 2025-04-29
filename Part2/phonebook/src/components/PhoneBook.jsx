import AddPerson from "./AddPerson";
import Filter from "./Filter";
import Search from "./Search";

const PhoneBook =({book})=>{
    console.log(book)
    return(
        <div>
            <h2>Phonebook</h2>
            <Search value={book.value} filter={book.changeFilter} />
            <AddPerson 
                addPerson={book.add} 
                name={book.name} 
                number={book.number} 
                changeName={book.changeName} 
                changeNumber={book.changeNumber}
            />
            <h2>Numbers</h2>
            <Filter persons={book.persons} personsFilter={book.personsFiltered} />
        </div>
    )
}

export default PhoneBook