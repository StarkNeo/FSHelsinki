import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken)=>{
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNote = async newObject=>{
  const config ={
    headers:{authorization:token}
  }
  console.log("object on front",newObject)
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}
export default { getAll, createNote, setToken }