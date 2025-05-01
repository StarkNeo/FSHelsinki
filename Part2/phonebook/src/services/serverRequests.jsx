import axios from "axios";
let url = "http://localhost:3001/persons";


const getAll = () => {
    let request = axios.get(url)
    return request.then(response => response.data)
}

const getPerson=(id)=>{
    let request = axios.get(`${url}/${id}`)
    return request
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

const remove =(id)=>{
    let request = axios.delete(`${url}/${id}`)
    return request.then(response=>console.log(response.data))
}

export default { getAll, create, update, remove, getPerson }