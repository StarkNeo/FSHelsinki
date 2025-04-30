import axios from "axios";
let url = "http://localhost:3001/persons";


const getAll = () => {
    let request = axios.get(url)
    return request.then(response => response.data)
}

const create = (newObject) => {
    console.log(newObject)
    if (newObject) {
        let request = axios.post(url, newObject)
        return request.then(response => response.data)
    } else {
        alert("No object provided")
    }

}

const update = (id, newObject) => {
    let request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }