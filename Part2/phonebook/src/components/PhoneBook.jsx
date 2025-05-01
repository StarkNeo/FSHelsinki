import AddPerson from "./AddPerson";
import Filter from "./Filter";
import Search from "./Search";
import Notification from './Notification';

const PhoneBook =({book})=>{
    console.log(book)
    return(
        <div>
            <h2>Phonebook</h2>
            <Notification message={book.message} />
            <Search value={book.value} filter={book.changeFilter} />
            <h2>add a new</h2>
            <AddPerson 
                addPerson={book.add} 
                name={book.name} 
                number={book.number} 
                changeName={book.changeName} 
                changeNumber={book.changeNumber}
            />
            <h2>Numbers</h2>
            <Filter persons={book.persons} personsFilter={book.personsFiltered} removePerson={book.handleRemove} />
        </div>
    )
}

export default PhoneBook