import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials)=>{
    console.log(credentials)
    const result = await axios.post(baseUrl,credentials)
    console.log("react:",result)
    return result.data
}

export default {login}